import { Room, Client } from "colyseus";
import Player from './ludo/player'
import Die from './ludo/die'
import {LudoGame} from './ludo/ludoGame'

import { Schema, ArraySchema, MapSchema, type } from "@colyseus/schema";

class Game extends Schema {
  @type([Player])
  players = new ArraySchema<Player>() 
  @type([Die])
  dice: ArraySchema<Die>
  @type("string")
  playerTurnId: string 

  createNewGame(playerName: string, pieceIds: string[], sessionId: string): Game {
    let player = LudoGame.createPlayer(playerName, pieceIds, sessionId)
    this.players.push(player)
    player.playerTurn = this.getPlayerTurn(sessionId)
    this.dice = LudoGame.createDice()
    this.playerTurnId = playerName
    return this
  }

  joinExistingGame(playerName: string, pieceIds: string[], sessionId: string): void {
    let player = LudoGame.createPlayer(playerName, pieceIds, sessionId)
    player.playerTurn = this.getPlayerTurn(sessionId)
    this.players.push(player)
  }

  getPlayerTurn(sessionId: string): boolean {
    return (sessionId === this.players[0].sessionId)
  }
}


class State extends Schema {
  @type({ map: Game })
  games = new MapSchema<Game>();


  createNewGame(playerName: string, pieceIds: string[], uuid: string, sessonId: string): boolean {
    let game = new Game()
    
    this.games[uuid] = game.createNewGame(playerName, pieceIds, sessonId)
    if (this.games[uuid]){
      return true
    }else {
      return false
    }
  }

  joinExistingGame(playerName: string, pieceIds: string[], uuid: string, sessonId: string): boolean {
    let game = this.games[uuid]
    if (game){
      game.joinExistingGame(playerName, pieceIds, sessonId)
      return true
    }
    return false
  }

 
}



export class LudoRoom extends Room<State> {

  onCreate (options: any) {
    // Check if game exists
    this.setState(new State())

    console.log("On create: ", this.state.toJSON())

    this.onMessage("create", (client: Client, message) => {
      // handle "type" message
      console.log("new message from client:  " + client + " and message: " + message)
    });

    this.onMessage("select", (client: Client, message) => {
      console.log("Select:  ", client.sessionId, " and message: ", message)
      this.broadcast("select", message, { except: client });
    });

    this.onMessage("move", (client: Client, message) => {
      console.log("Move:  ", client.sessionId, " and message: ", message)
      this.broadcast("move", message, { except: client });
    });

    this.onMessage("roll", (client: Client, message) => {
      console.log("Roll:  ", client.sessionId, " and message: ", message)
      this.broadcast("roll", message, { except: client });
    });

  }

  onJoin (client: Client, options: any) {
    if (this.state.games[options.uuid]) {
      console.log("Game: " + options.uuid + " Exists. Join game instead")
      this.state.joinExistingGame(options.playerName, options.pieceIds, options.uuid, client.sessionId)
      console.log("On join existing: ", this.state.toJSON())
    }else {
      console.log("Game: " + options.uuid + " does not exist. Create new state")
      this.state.createNewGame(options.playerName, options.pieceIds, options.uuid, client.sessionId)
      console.log("On join new: ", this.state.toJSON())

    }
    
  }

  onLeave (client: Client, consented: boolean) {
    console.log("Leaving......")
  }

  onDispose() {
  }

}
