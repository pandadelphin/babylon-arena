import { Game } from "./game";
import * as BABYLON from 'babylonjs';

export class Player {

    private _fpsCamera: BABYLON.FreeCamera;
    private _followCamera: BABYLON.FollowCamera;
    private _playerCamera: BABYLON.TargetCamera;
    private _mesh: BABYLON.Mesh;
    private _spawnPoint: BABYLON.Vector3;


    constructor() {
    }

    init(spawnPoint: BABYLON.Vector3): void {
        this._spawnPoint = spawnPoint;
        this._mesh = BABYLON.Mesh.CreateSphere("box", 15, 2, Game.instance.scene);
        let material = new BABYLON.StandardMaterial("Mat", Game.instance.scene);
        material.diffuseColor = new BABYLON.Color3(0, 0, 0);
        this._mesh.material = material;
        this._mesh.position.copyFrom(this._spawnPoint);
    }

    reset(): void {
        this._mesh.position.copyFrom(this._spawnPoint);
    }

    start(): void {
    }

    initFPSCamera(): void {
        if (!this._fpsCamera) {
            this._fpsCamera = new BABYLON.FreeCamera(
                "FPSCamera", new BABYLON.Vector3(0, 10, 0), Game.instance.scene);
            this._fpsCamera.parent = this._mesh;
        }
        this._fpsCamera.attachControl(Game.instance.canvas, true);
        Game.instance.setActiveCamera(this._fpsCamera);
        this._playerCamera = this._fpsCamera;
    }

    initFollowCamera(): void {
        console.log("initFollowCamera()");
        if (!this._followCamera) {
            let camera: BABYLON.FollowCamera = new BABYLON.FollowCamera(
                "FollowCam", new BABYLON.Vector3(0, 15, -45), Game.instance.scene);
            camera.lockedTarget = this._mesh;
            camera.radius = 30; // how far from the object to follow
            camera.heightOffset = 8; // how high above the object to place the camera
            camera.rotationOffset = 270; // the viewing angle
            camera.cameraAcceleration = 0.1; // how fast to move
            camera.maxCameraSpeed = 20; // speed limit
            camera.lowerHeightOffsetLimit = 0;
            camera.upperHeightOffsetLimit = 20  ;
            this._followCamera = camera;
        }
        this._followCamera.attachControl(Game.instance.canvas, true);
        Game.instance.setActiveCamera(this._followCamera);
        this._playerCamera = this._followCamera;
    }

    update(deltaTime: number): void {

    }

    dispose(): void {
        this._fpsCamera.dispose();
    }

    get mesh(): BABYLON.Mesh {
        return this._mesh;
    }

    get playerCamera(): BABYLON.TargetCamera {
        return this._playerCamera;
    }

}
