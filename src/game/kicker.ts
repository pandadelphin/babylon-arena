import { Obstacle } from "./obstacle";
import { Game } from "./game";
import * as BABYLON from 'babylonjs';

export class Kicker extends Obstacle {

    init(): void {
        BABYLON.SceneLoader.ImportMesh(null, "./assets/", "kicker.obj", Game.instance.scene,
            (meshes: BABYLON.AbstractMesh[],
                particleSystems: BABYLON.ParticleSystem[],
                skeletons: BABYLON.Skeleton[]) => {
                this._mesh = <BABYLON.Mesh>meshes[0];
                this._mesh.renderOutline = true;
                this._mesh.layerMask = 1;
                this._mesh.position = this._position;
                this._mesh.rotation = this._rotation;
                this._mesh.scaling = this._scaling;
                this._mesh.showBoundingBox = true;
            }
        );
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
                Game.instance.scene);
    }

    dispose(): void {
        this._mesh.dispose();
    }

    update(deltaTime: number): void {

    }
}
