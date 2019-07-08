import { User } from "./user";

export enum GameState {
    INIT,
    LOGIN,
    MENU,
    START
}

export class GameModel {
    private _gameState: GameState;

    public get gameState() : GameState {
        return this._gameState;
    }
    

    private _user: User;

    
    public get user() : User {
        return this._user;
    }
    
    public init() {
        this._gameState = GameState.INIT;
        this._user = {
            userName: ""
        }
    }

    public menu() {
        this._gameState = GameState.MENU
    }

    public start(userName: string) {
        this._gameState = GameState.START;
        this._user = {
            ...this._user,
            userName: userName
        }
    }
   


}

