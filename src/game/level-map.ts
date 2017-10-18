import { Game } from "./game";
import { Level } from "./level";
import { Obstacle } from "./obstacle";
import { Kicker } from "./kicker";
import * as BABYLON from 'babylonjs';

export class LevelMap {

    private _ground: BABYLON.Mesh;
    private _playerSpawnPoint: BABYLON.Vector3;
    private _obstacles: Array<Obstacle>;
    private _game: Game;

    constructor(game: Game) {
        this._obstacles = new Array<Obstacle>();
        this._game = game;
    }

    init(): void {
        this.initPlaneGround();
        this.initObstacles();
        this._playerSpawnPoint = new BABYLON.Vector3(0, 20, 0);
    }

    initObstacles(): void {
        let obstacle = new Kicker(
            this._game,
            new BABYLON.Vector3(100, 0, 0),
            new BABYLON.Vector3(0, 0, 0),
            new BABYLON.Vector3(10, 10, 10)
        );
        obstacle.init();
        this._obstacles.push(obstacle);

        obstacle = new Kicker(
            this._game,
            new BABYLON.Vector3(100, 0, -100),
            new BABYLON.Vector3(0, Math.PI / 4, 0),
            new BABYLON.Vector3(50, 50, 50)
        );
        obstacle.init();
        this._obstacles.push(obstacle);
    }

    initPlaneGround(): void {
        this._ground = BABYLON.Mesh.CreatePlane(
            "ground", 1000.0, this._game.scene);
        let groundMaterial: BABYLON.StandardMaterial =
            new BABYLON.StandardMaterial("groundMat", this._game.scene);
        groundMaterial.diffuseColor = new BABYLON.Color3(0.25, 0.45, 0.66);
        groundMaterial.backFaceCulling = false;
        this._ground.material = groundMaterial;
        this._ground.position = BABYLON.Vector3.Zero();
        this._ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
        this._ground.receiveShadows = true;
        this._ground.showBoundingBox = true;
    }

    addPlaneImpostor(): void {
        this._ground.physicsImpostor =
            new BABYLON.PhysicsImpostor(this._ground,
                BABYLON.PhysicsImpostor.BoxImpostor,
                { mass: 0, restitution: 0, friction: 0 },
                this._game.scene);
    }

    initHeightMapGround(): void {
        BABYLON.Mesh.CreateGroundFromHeightMap(
            "ground", "assets/park.png", 200, 200, 250, 0, 10,
            this._game.scene, false, (mesh: BABYLON.Mesh) => {
                this._ground = mesh;
                let groundMaterial: BABYLON.StandardMaterial =
                    new BABYLON.StandardMaterial("groundMat", this._game.scene);
                groundMaterial.diffuseColor = new BABYLON.Color3(0, 0, 1);
                groundMaterial.backFaceCulling = false;
                this._ground.material = groundMaterial;
                this._ground.position = BABYLON.Vector3.Zero();
            });
    }
    addHeightMapImpostor(): void {
        this._ground.physicsImpostor =
            new BABYLON.PhysicsImpostor(this._ground,
                BABYLON.PhysicsImpostor.HeightmapImpostor,
                { mass: 0, restitution: 0, friction: 0 },
                this._game.scene);
    }

    start(): void {
        this._ground.checkCollisions = true;
        this.addPlaneImpostor();
        for (let obstacle of this._obstacles) {
            obstacle.start();
        }
    }

    update(deltaTime: number): void {

    }

    dispose(): void {
        this._ground.dispose();
        for (let obstacle of this._obstacles) {
            obstacle.dispose();
        }
    }

    get playerSpawnPoint(): BABYLON.Vector3 {
        return this._playerSpawnPoint;
    }

    get ground(): BABYLON.Mesh {
        return this._ground;
    }

    get obstacles(): Array<Obstacle> {
        return this._obstacles;
    }

}
