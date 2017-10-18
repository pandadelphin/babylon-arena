import { DESIGN_WIDTH, DESIGN_HEIGHT, Game, GameState } from "./game";
import * as BABYLON from 'babylonjs';
import * as GUI from "babylonjs-gui";

let btnStartGameText = "Click to Start!";

export class StartMenu {
    private _game: Game;

    private _designWidth = 1000;
    private _designHeight = 600;

    private _contentScaleFactor: number;

    private _width: number;
    private _height: number;

    private _btnWidth: number;
    private _btnHeight: number;

    private _marginTop: number;
    private _distance: number;
    private _fontSize: number;

    private _guiTexture: GUI.AdvancedDynamicTexture;
    private _btnStartGame: GUI.Button;
    private _txtUsername: GUI.InputText;

    constructor(game: Game) {
        this._game = game;

        this._contentScaleFactor = this._game.contentScaleFactor;
        this._width = this._designWidth * this._contentScaleFactor;
        this._height = this._designHeight * this._contentScaleFactor;
        this._marginTop = 300 * this._contentScaleFactor;
        this._distance = 50 * this._contentScaleFactor;
        this._btnWidth = 800 * this._contentScaleFactor;
        this._btnHeight = 100 * this._contentScaleFactor;
        this._fontSize = 40 * this._contentScaleFactor;
    }

    public init(): void {
        this._guiTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        this._txtUsername = new GUI.InputText();
        this._txtUsername.top = this._marginTop;
        this._txtUsername.width = this._btnWidth + "px";
        this._txtUsername.height = this._btnHeight + "px";
        this._txtUsername.color = "white";
        this._txtUsername.placeholderText = "Username";
        this._txtUsername.background = "rgba(64, 64, 255, 0.5)";
        this._txtUsername.focusedBackground = "rgba(127, 127, 255, 0.5)";
        this._txtUsername.autoStretchWidth = false;
        this._txtUsername.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this._txtUsername.fontSize = this._fontSize;
        this._guiTexture.addControl(this._txtUsername);


        this._btnStartGame = GUI.Button.CreateSimpleButton("but1", "Click to Begin");
        this._btnStartGame.top = this._marginTop + this._distance + this._btnHeight;
        this._btnStartGame.width = this._btnWidth + "px";
        this._btnStartGame.height = this._btnHeight + "px";
        this._btnStartGame.color = "white";
        this._btnStartGame.background = "rgba(64, 64, 255, 0.5)";
        this._btnStartGame.fontSize = this._fontSize;
        this._btnStartGame.onPointerUpObservable.add(() => {
            console.log("onClick");
            this._game.startGame();
        });
        this._btnStartGame.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this._guiTexture.addControl(this._btnStartGame);

    }

    dispose(): void {
        this._guiTexture.dispose();
    }

    update(deltaTime: number): void {
    }
}
