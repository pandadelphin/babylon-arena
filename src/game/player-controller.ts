import { Player } from "./player";
import { Game } from "./game";
import * as BABYLON from 'babylonjs';
import { GameState } from "./game-model";

export class PlayerController {

    private _player: Player;
    private _movementSpeed: number;
    private _strafeDir: number;
    private _movementDir: number;
    private _gravity: BABYLON.Vector3;

    constructor(player: Player, gravity: BABYLON.Vector3) {
        this._player = player;
        this._movementSpeed = 1;
        this._strafeDir = 0;
        this._movementDir = 0;
        this._gravity = gravity;
    }

    update(deltaTime: number) {
        if (Game.instance.gameModel.gameState == GameState.START) {

            if (this._movementDir == 1) {
                let forwards = new BABYLON.Vector3(
                    Math.sin(this._player.playerCamera.rotation.y) * this._movementSpeed,
                    this._gravity.y,
                    Math.cos(this._player.playerCamera.rotation.y) * this._movementSpeed);
                forwards.scale(deltaTime);
                this._player.mesh.moveWithCollisions(forwards);
            }
            else if (this._movementDir == -1) {
                let backwards = new BABYLON.Vector3(
                    -Math.sin(this._player.playerCamera.rotation.y) * this._movementSpeed,
                    this._gravity.y,
                    -Math.cos(this._player.playerCamera.rotation.y) * this._movementSpeed);
                backwards.scale(deltaTime);
                this._player.mesh.moveWithCollisions(backwards);
            }

            if (this._strafeDir == -1) {
                let leftStrafe = new BABYLON.Vector3(
                    -Math.cos(this._player.playerCamera.rotation.y) * this._movementSpeed,
                    this._gravity.y,
                    Math.sin(this._player.playerCamera.rotation.y) * this._movementSpeed);
                leftStrafe.scale(deltaTime);
                this._player.mesh.moveWithCollisions(leftStrafe);
            }
            else if (this._strafeDir == 1) {
                let rightStrafe = new BABYLON.Vector3(
                    Math.cos(this._player.playerCamera.rotation.y) * this._movementSpeed,
                    this._gravity.y,
                    -Math.sin(this._player.playerCamera.rotation.y) * this._movementSpeed);
                rightStrafe.scale(deltaTime);
                this._player.mesh.moveWithCollisions(rightStrafe);
            }

            else {
                let forwards = new BABYLON.Vector3(
                    0, this._gravity.y, 0);
                forwards.scale(deltaTime);
                this._player.mesh.moveWithCollisions(forwards);
            }

        }
    }

    onKeyDown(event: BABYLON.ActionEvent) {
        switch (event.sourceEvent.key) { // W
            case "w":
                this._movementDir = 1;
                break;
            case "s":
                this._movementDir = -1;
                break;
            case "a":
                this._strafeDir = -1;
                break;
            case "d":
                this._strafeDir = 1;
                break;
        }
    }

    onKeyUp(event: BABYLON.ActionEvent) {
        switch (event.sourceEvent.key) { // W
            case "w":
            case "s":
                this._movementDir = 0;
                break;
            case "a":
            case "d":
                this._strafeDir = 0;
                break;
        }
    }
}
