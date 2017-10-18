
import { Obstacle } from "./obstacle";
import { Game } from "./game";
import * as BABYLON from 'babylonjs';

export class CompoundKicker extends Obstacle {


    init(): void {
        this._mesh = BABYLON.Mesh.CreateBox("box", 2, this._game.scene, true);
        let material: BABYLON.StandardMaterial =
            new BABYLON.StandardMaterial("boxMat", this._game.scene);
        this._mesh.material = material;
        this._mesh.visibility = 0.01;
        this._mesh.showBoundingBox = true;

        let planeTop: BABYLON.Mesh = BABYLON.MeshBuilder.CreatePlane("kickerTop",
            { width: 2, height: 2.36 }, this._game.scene);
    }

    start(): void {
        this._mesh.checkCollisions = true;
        this._mesh.physicsImpostor =
            new BABYLON.PhysicsImpostor(
                this._mesh, BABYLON.PhysicsImpostor.MeshImpostor,
                {
                    mass: 0,
                    friction: 1,
                    restitution: 0
                },
                this._game.scene);
    }

    dispose(): void {
        this._mesh.dispose();
    }

    update(deltaTime: number): void {

    }


}
