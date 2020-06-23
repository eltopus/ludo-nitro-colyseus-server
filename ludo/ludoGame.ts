import Player from './player'
import Piece from './piece'
import Die from './die'
import Ludo from './ludo'
import data from './ludo.json'
import {ArraySchema} from "@colyseus/schema";

export class LudoGame {
    
    static createPlayer(playerName: string, pieceIds: string[], sessionId: string): Player {
        let pieces = this.createPieces(pieceIds)
        let player = new Player(playerName, null, pieces, sessionId)
        return player
    }

    static createDice(): ArraySchema<Die> {
        let die1 = new Die(data.dice[0].dieId, data.dice[0].dieValue, data.dice[0].selected)
        let die2 = new Die(data.dice[1].dieId, data.dice[1].dieValue, data.dice[1].selected)
        let dice = new ArraySchema<Die>()
        dice.push(die1)
        dice.push(die2)
        return dice
    }
    
    static createPieces(pieceIds: string[]): ArraySchema<Piece> {
        let pieces = new ArraySchema<Piece>()
        for (let pieceId of pieceIds){
            switch(pieceId){
                case 'red': {
                    let red = data.red
                    for (let pieceConfig of red.pieces){
                        let piece = new Piece(pieceConfig.id, pieceConfig.index, red.homeEntranceIndex, red.homeStartIndex, red.startIndex, pieceConfig.state, "Red", pieceConfig.x, pieceConfig.y, pieceConfig.hx, pieceConfig.hy)
                        pieces.push(piece)
                    }
                    break;

                }
                case 'blue': {
                    let blue = data.blue
                    for (let pieceConfig of blue.pieces){
                        let piece = new Piece(pieceConfig.id, pieceConfig.index, blue.homeEntranceIndex, blue.homeStartIndex, blue.startIndex, pieceConfig.state, "Blue", pieceConfig.x, pieceConfig.y, pieceConfig.hx, pieceConfig.hy)
                        pieces.push(piece)
                    }
                    break
                    
                }
                case 'yellow': {
                    let yellow = data.yellow
                    for (let pieceConfig of yellow.pieces){
                        let piece = new Piece(pieceConfig.id, pieceConfig.index, yellow.homeEntranceIndex, yellow.homeStartIndex, yellow.startIndex, pieceConfig.state, "Yellow", pieceConfig.x, pieceConfig.y, pieceConfig.hx, pieceConfig.hy)
                        pieces.push(piece)
                    }
                    break
                   
                    
                }
                case 'green': {
                    let green = data.green
                    for (let pieceConfig of green.pieces){
                        let piece = new Piece(pieceConfig.id, pieceConfig.index, green.homeEntranceIndex, green.homeStartIndex, green.startIndex, pieceConfig.state, "Red", pieceConfig.x, pieceConfig.y, pieceConfig.hx, pieceConfig.hy)
                        pieces.push(piece)
                    }
                    break
                    
                }
                default:
                    break
            }
        }
        return pieces
    }
}