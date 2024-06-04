import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class ThreeJSRenderer {
    private container: HTMLDivElement;
    private scene!: THREE.Scene;
    private camera!: THREE.PerspectiveCamera;
    private renderer!: THREE.WebGLRenderer;
    private points!: THREE.Points;
    private controls!: OrbitControls;
    private time: number;

    constructor(container: HTMLDivElement) {
        this.container = container;
        this.time = 0;
        this.init();
    }

    private init(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xeeeeee);
        this.scene.add(new THREE.GridHelper(400, 10));

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(0, 200, 300);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);

        const particles = 10000;

        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const colors = [];

        for (let i = 0; i < particles; i++) {
            const x = THREE.MathUtils.randFloatSpread(100);
            const y = THREE.MathUtils.randFloatSpread(100);
            const z = THREE.MathUtils.randFloatSpread(100);

            vertices.push(x, y, z);

            const color = new THREE.Color(Math.random(), Math.random(), Math.random());
            colors.push(color.r, color.g, color.b);
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({ size: 3, vertexColors: true });
        this.points = new THREE.Points(geometry, material);
        this.scene.add(this.points);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.minDistance = 100;
        this.controls.maxDistance = 700;

        this.animate();
    }

    private animate = (): void => {
        requestAnimationFrame(this.animate);

        this.time += 0.1;

        const positions = this.points.geometry.attributes.position.array;

        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i + 0];
            const y = positions[i + 1];
            const z = positions[i + 2];

            const distance = Math.sqrt(x * x + y * y + z * z);
            const offset = Math.sin(distance - this.time * 4);

            positions[i + 1] = Math.max(-200, Math.min(200, y + offset * 8));
        }

        this.points.geometry.attributes.position.needsUpdate = true;

        this.renderer.render(this.scene, this.camera);
    }
}
