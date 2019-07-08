import { StartMenu } from "./start-menu";
import { Level } from "./level";
import * as BABYLON from 'babylonjs';
import { GameState, GameModel } from './game-model';

export const DESIGN_WIDTH: number = 1920;
export const DESIGN_HEIGHT: number = 1080;

export class Game {

    private static _instance: Game;

    public static get instance(): Game {
        return Game._instance;
    }

    private _canvas: HTMLCanvasElement;
    private _guiRoot: HTMLDivElement;

    private _engine: BABYLON.Engine;
    private _gameModel: GameModel;
    private _scene: BABYLON.Scene;

    private clickListener: any;
    private level: Level;
    private startMenu: StartMenu;

    private gravity: BABYLON.Vector3;
    private lastUpdate: number;

    private _contentScaleFactor: number = 1.0;


    constructor(canvas: HTMLCanvasElement, guiRoot: HTMLDivElement) {
        if(Game.instance != null) {
            console.error("Game can only exist once");
            return;
        }
        Game._instance = this;
        this._canvas = canvas;
        this._guiRoot = guiRoot;
        this._engine = new BABYLON.Engine(this.canvas, true);
        this._gameModel = new GameModel();
    }

    public init(): void {
        // Gamestate auf INIT
        this._gameModel.init();
        // Scene
        this._scene = this.createScene(this.engine);
        //Level
        this.level = this.createLevel(this.scene);
        //GUI
        this._contentScaleFactor = this.engine.getRenderWidth() / DESIGN_WIDTH;

        this.startMenu = this.createStartMenu();
    }

    public reset(): void {
        if (this._gameModel.gameState === GameState.START) {
            this._gameModel.menu();
            this.level.reset();
            this.cancelPointerLock();
            this.startMenu = this.createStartMenu();
        }
    }


    public requestPointerLock(): void {
        this.clickListener = (evt) => {
            this._canvas.requestPointerLock = this._canvas.requestPointerLock
            || this._canvas.msRequestPointerLock
            || this._canvas.mozRequestPointerLock
            || this._canvas.webkitRequestPointerLock;
            if (this._canvas.requestPointerLock) {
                this._canvas.requestPointerLock();
            }
        }
        this._canvas.addEventListener("click", this.clickListener, false);
    }


    public cancelPointerLock():  void {
        console.log("Remove listener");
        this._canvas.removeEventListener("click", this.clickListener, false);
    }

    private createScene(engine: BABYLON.Engine): BABYLON.Scene {
        let scene = new BABYLON.Scene(engine);
        //BABYLON.OBJFileLoader.OPTIMIZE_WITH_UV = true;

        scene.actionManager = new BABYLON.ActionManager(scene);
        scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnKeyDownTrigger,
                (event) => {
                    switch (event.sourceEvent.key) {
                        case "Escape":
                        case "m":
                            this.reset();
                            break;
                    }
                    if (this.level)
                        this.level.onKeyDown(event);
                }));

        scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnKeyUpTrigger,
                (event) => {
                    this.level.onKeyUp(event);
                }));

        return scene;
    }

    private createStartMenu(): StartMenu {
        let startMenu = new StartMenu();
        startMenu.init();
        return startMenu;
    }

    private createLevel(scene: BABYLON.Scene): Level {
        let level = new Level();
        level.init();
        return level;
    }

    public startGame(userName: string): void {
        console.log("Start Game!");
        this.gameModel.start(userName);
        this.startMenu.dispose();
        this.startMenu = null;
        this.level.start();
        this.requestPointerLock();
    }

    public setActiveCamera(camera: BABYLON.Camera) {
        /*
        let cameras: BABYLON.Camera[] = [];
        if(Game.scene.activeCameras.length <= 0) {
          Game.scene.activeCamera = camera;
        }
        for (let i = 0; Game.scene.activeCameras; i++) {
          if(Game.scene.activeCameras[i] == Game._activeCamera) {
            Game.scene.activeCameras[i] = camera;
            break;
          }
        }
        */
        if (this.scene.activeCameras.length > 1) {
            let guiCam = this.scene.activeCameras.pop();
            this.scene.activeCameras.pop();
            this.scene.activeCameras.push(camera);
            this.scene.activeCameras.push(guiCam);
            this.scene.activeCamera = guiCam;
        }
        else {
            this.scene.activeCamera = camera;
        }
    }

    public animate(): void {

        this.scene.registerBeforeRender(() => {
            let now: number = new Date().getTime() * 0.001;
            let deltaTime: number = (1 / this.engine.getFps());
            
            this.level.update(deltaTime);
            if (this.startMenu)
                this.startMenu.update(deltaTime);
            this.lastUpdate = now;
        })

        // run the render loop
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });

        // the canvas/window resize event handler
        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }

    private onKeyUp(event: BABYLON.ActionEvent) {
        this.level.onKeyUp(event);
    }

    public get scene(): BABYLON.Scene {
        return this._scene;
    }

    public get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    public get guiRoot(): HTMLDivElement {
        return this._guiRoot;
    }

    public get gameModel(): GameModel {
        return this._gameModel;
    }   

    public get contentScaleFactor(): number {
        return this._contentScaleFactor;
    }

    public get width(): number {
        return this._engine.getRenderWidth();
    }

    public get height(): number {
        return this._engine.getRenderHeight();
    }

    public get engine(): BABYLON.Engine {
        return this._engine;
    }
}
