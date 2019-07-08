import { Skybox } from "./skybox";
import { Player } from "./player";
import { Game } from "./game";
import { LevelMap } from "./level-map";
import { PlayerController } from "./player-controller";
import * as BABYLON from 'babylonjs';
import { Manual } from './manual';
import { filter } from 'rxjs/operators';

export class Level {

    private _map: LevelMap;
    private _player: Player;
    private _playerController: PlayerController;
    private _skybox: Skybox;
    private _manual: Manual;

    private _globalCamera: BABYLON.Camera;

    private _gravity = new BABYLON.Vector3(0, -0.9, 0);


    constructor() {
        this._map = new LevelMap();
        this._player = new Player();
        this._playerController = new PlayerController(this._player, this._gravity);
        this._skybox = new Skybox();
        this._manual = new Manual();
    }

    public init(): void {
        // light
        let light: BABYLON.HemisphericLight =
            new BABYLON.HemisphericLight('light1',
                new BABYLON.Vector3(0, 1, 0), Game.instance.scene);
        //let shadowGenerator = new BABYLON.ShadowGenerator(1024, light);

        this._skybox.init();
        this._map.init();
        this._player.init(this._map.playerSpawnPoint);

        this._manual.init();
        this._manual.btnFPSCamClicked$.pipe(
            filter(value => value))
            .subscribe((value: boolean) => this._player.initFPSCamera());

        this._manual.btnThirdPersonClicked$.pipe(
            filter(value => value))
            .subscribe((value: boolean) => this._player.initFollowCamera());

        this._manual.btnBirdsEyeClicked$.pipe(
            filter(value => value))
            .subscribe((value: boolean) => this.initGlobalCamera());

        this.initGlobalCamera();
    }

    public reset(): void {
        this._player.reset();
        this.initGlobalCamera();
    }

    private initGlobalCamera(): void {
        //  Camera
        console.log("initGlobalCamera()");
        if (!this._globalCamera) {
            console.log("global created");
            let camera: BABYLON.ArcRotateCamera =
                new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100,
                    BABYLON.Vector3.Zero(), Game.instance.scene);
            camera.lowerBetaLimit = 0.1;
            camera.upperBetaLimit = (Math.PI / 2) * 0.9;
            camera.lowerRadiusLimit = 30;
            camera.upperRadiusLimit = 150;
            this._globalCamera = camera;
        }
        this._globalCamera.attachControl(Game.instance.canvas, true);
        Game.instance.setActiveCamera(this._globalCamera);
    }


    public start(): void {
        Game.instance.scene.enablePhysics(
            this._gravity, new BABYLON.CannonJSPlugin());
        this._map.start();
        this._player.start();
        this._player.initFPSCamera();
    }

    public dispose(): void {
        this._player.dispose();
        this._map.dispose();
        this._globalCamera.dispose();
    }

    public update(deltaTime: number): void {
        for (let obstacle of this._map.obstacles) {
            if (obstacle.mesh && this._player.mesh &&
                this._player.mesh.intersectsMesh(obstacle.mesh, false)) {
                // console.log("IntersectsMesh");
            }
            obstacle.update(deltaTime);
        }
        this._playerController.update(deltaTime);
        this._map.update(deltaTime);
    }

    public onKeyDown(event: BABYLON.ActionEvent) {
        switch (event.sourceEvent.key) {
            case "1": // 1
                this._player.initFPSCamera();
                break;
            case "2": // 2
                this._player.initFollowCamera();
                break;
            case "3": // 3
                this.initGlobalCamera();
                break;
        }
        this._playerController.onKeyDown(event);
    }

    public onKeyUp(event: BABYLON.ActionEvent) {
        this._playerController.onKeyUp(event);
    }

    public get map(): LevelMap {
        return this._map;
    }

}
