import { Game } from "./game";
import * as GUI from "babylonjs-gui";
import { BehaviorSubject } from 'rxjs';

export class Manual {

    private _guiTexture: GUI.AdvancedDynamicTexture;

    private _btnFPSCam: GUI.Button;
    private _btnThirdPerson: GUI.Button;
    private _btnBirdsEye: GUI.Button;

    private _btnFPSCamClicked$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _btnThirdPersonClicked$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _btnBirdsEyeClicked$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    
    private _btnWidth: number;
    private _btnHeight: number;
    private _margin: number;
    private _distance: number;
    private _fontSize: number;

    constructor() { 
        let contentScaleFactor = Game.instance.contentScaleFactor;
        this._margin = 10 * contentScaleFactor;
        this._distance = 10 * contentScaleFactor;
        this._btnWidth = 300 * contentScaleFactor;
        this._btnHeight = 50 * contentScaleFactor;
        this._fontSize = 30 * contentScaleFactor;
    }

    public init(): void {
        this._guiTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        this._btnFPSCam = this.createButton(this._btnWidth, this._btnHeight, 
            "btnFPSCam", "1 = FPS Cam", this._margin, this._margin);
        this._btnFPSCam.onPointerUpObservable.add(() => {
            this._btnFPSCamClicked$.next(true);
        });
        this._guiTexture.addControl(this._btnFPSCam);

        this._btnThirdPerson = this.createButton(this._btnWidth, this._btnHeight, 
            "btnThirdCam", "2 = Third Person", this._margin + this._distance + this._btnHeight, this._margin);
        this._btnThirdPerson.onPointerUpObservable.add(() => {
            this._btnThirdPersonClicked$.next(true);
        });
        this._guiTexture.addControl(this._btnThirdPerson);

        this._btnBirdsEye = this.createButton(this._btnWidth, this._btnHeight, 
            "btnBirdsEye", "3 = Birds Eye", this._margin + 2* this._distance + 2 * this._btnHeight, this._margin);
        this._btnBirdsEye.onPointerUpObservable.add(() => {
            this._btnBirdsEyeClicked$.next(true);
        });
        this._guiTexture.addControl(this._btnBirdsEye);

    }

    public get btnFPSCamClicked$() {
        return this._btnFPSCamClicked$;
    }

    
    public get btnThirdPersonClicked$() {
        return this._btnThirdPersonClicked$;
    }

    
    public get btnBirdsEyeClicked$() {
        return this._btnBirdsEyeClicked$;
    }

    public createButton(width: number, height: number, name: string, text: string, top: number, left: number) {
        let button = GUI.Button.CreateSimpleButton(name, text);
        button.top = top; 
        button.left = left; 
        button.width = width + "px";
        button.height = height + "px";
        button.color = "white";
        button.background = "rgba(64, 64, 255, 0.5)";
        button.fontSize = this._fontSize;
        button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        
        return button;
    }

    dispose(): void {
        this._guiTexture.dispose();
    }
}
