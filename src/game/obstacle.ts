import * as BABYLON from 'babylonjs';


export class Obstacle {

    protected _mesh: BABYLON.Mesh;
    protected _position: BABYLON.Vector3;
    protected _rotation: BABYLON.Vector3;
    protected _scaling: BABYLON.Vector3;
    protected _orientation: BABYLON.Matrix;

    constructor(position?: BABYLON.Vector3, rotation?: BABYLON.Vector3, scaling?: BABYLON.Vector3) {
        if (!position) {
            this._position = BABYLON.Vector3.Zero();
        }
        else {
            this._position = position;
        }
        if (!rotation) {
            this._rotation = BABYLON.Vector3.Zero();
        }
        else {
            this._rotation = rotation;
        }
        if (!scaling) {
            this._scaling = new BABYLON.Vector3(1, 1, 1);
        }
        else {
            this._scaling = scaling;
        }
        let matTranslat: BABYLON.Matrix =
            BABYLON.Matrix.Translation(
                this._position.x, this._position.y, this._position.z);
        let matRot: BABYLON.Matrix =
            BABYLON.Matrix.RotationYawPitchRoll(
                this._rotation.y, this._rotation.z, this._rotation.x);
        let matScal: BABYLON.Matrix =
            BABYLON.Matrix.Scaling(
                this._scaling.x, this._scaling.y, this._scaling.z);

        this._orientation =
            matScal.multiply(matRot)
                .multiply(matTranslat)
                .multiply(BABYLON.Matrix.Identity());
    }

    init(): void { }

    start(): void { }

    dispose(): void {
        this._mesh.dispose();
    }

    update(deltaTime: number): void { }


    get mesh(): BABYLON.Mesh {
        return this._mesh;
    }
}
