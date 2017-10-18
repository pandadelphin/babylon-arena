import { Game } from "./game";
import * as BABYLON from 'babylonjs';

export class Skybox {

    private _mesh: BABYLON.Mesh;
    private _game: Game;

    constructor(game: Game) {
        this._game = game
    }

    init(): void {
        this._mesh = BABYLON.Mesh.CreateBox("skyBox", 10000.0, this._game.scene);
        let skyboxMaterial: BABYLON.StandardMaterial =
            new BABYLON.StandardMaterial("skyBox", this._game.scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture =
            new BABYLON.CubeTexture("./assets/skybox/skybox", this._game.scene);
        skyboxMaterial.reflectionTexture.coordinatesMode =
            BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.disableLighting = true;
        this._mesh.material = skyboxMaterial;
    }
}
