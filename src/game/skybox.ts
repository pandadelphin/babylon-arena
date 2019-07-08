import { Game } from "./game";
import * as BABYLON from 'babylonjs';

export class Skybox {

    private _mesh: BABYLON.Mesh;

    constructor() {
    }

    init(): void {
        this._mesh = BABYLON.Mesh.CreateBox("skyBox", 10000.0, Game.instance.scene);
        let skyboxMaterial: BABYLON.StandardMaterial =
            new BABYLON.StandardMaterial("skyBox", Game.instance.scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture =
            new BABYLON.CubeTexture("./assets/skybox/skybox", Game.instance.scene);
        skyboxMaterial.reflectionTexture.coordinatesMode =
            BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.disableLighting = true;
        this._mesh.material = skyboxMaterial;
    }
}
