import { Game } from './game/game';
import "babylonjs-loaders";
import "babylonjs-materials";
import CANNON = require( "cannon" );

window.addEventListener('DOMContentLoaded', () => {

    window.CANNON = CANNON;

    let canvas = <HTMLCanvasElement>document.getElementById('renderCanvas');
    let guiRoot = <HTMLDivElement>document.getElementById('guiRoot');
    let game = new Game(canvas, guiRoot);


    game.init();

    game.animate();
});
