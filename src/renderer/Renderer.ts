import { createElement, StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import * as THREE from 'three';

import { Root } from './renderer.root';

export class Renderer {
    private threeJSCanvasContainer: HTMLDivElement | null = null;

    public async startup(): Promise<void> {
        await this.createRendererRoot();
    }

    private async createRendererRoot(): Promise<void> {
        return new Promise<void>((resolve) => {
            const onMount = (ref: HTMLDivElement) => {
                if (!this.threeJSCanvasContainer) {
                    this.threeJSCanvasContainer = ref;
                    this.initThreeJS();
                    resolve();
                }
            };

            ReactDOM.createRoot(document.getElementById('root')!).render(
                createElement(
                    StrictMode,
                    {},
                    createElement(
                        Root,
                        { onMount }
                    )
                )
            );
        });
    }

    private async initThreeJS(): Promise<void> {
        if (!this.threeJSCanvasContainer) {
            console.error('Renderer container not available');
            return;
        }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setAnimationLoop(animate);

        this.threeJSCanvasContainer.appendChild(renderer.domElement);

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);

        scene.add(cube);

        camera.position.z = 5;

        function animate() {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
    }
}
