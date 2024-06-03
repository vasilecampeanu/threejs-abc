import { createElement, StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Root } from './renderer.root';
import { ThreeJSRenderer } from './ThreeJSRenderer';

export class Renderer {
    private threeJSCanvasContainer: HTMLDivElement | null = null;
    private threeJSRenderer: ThreeJSRenderer | null = null;

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

    private initThreeJS(): void {
        if (!this.threeJSCanvasContainer) {
            console.error('Renderer container not available...');
            return;
        }

        this.threeJSRenderer = new ThreeJSRenderer(this.threeJSCanvasContainer);
    }
}
