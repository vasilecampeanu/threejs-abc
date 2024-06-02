import { Renderer } from "./Renderer";

export class EntryPoint {
    public async main(): Promise<void> {
        try {
            await this.startup();
        } catch (error) {
            console.error(error);
        }
    }

    private async startup(): Promise<void> {
        await new Renderer().startup();
    }
}
