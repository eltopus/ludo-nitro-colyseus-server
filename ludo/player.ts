import { Schema, ArraySchema, type } from "@colyseus/schema";
import Piece from './piece'

export default class Player extends Schema  {
    @type("string")
    playerName: string
    @type("string")
    selectedPieceId: string
    @type([Piece])
    pieces: ArraySchema<Piece>
    @type("string")
    sessionId: string
    @type("boolean")
    playerTurn: boolean
    constructor(playerName?: string, selectedPieceId?: string, pieces?: ArraySchema<Piece>, sessionId?: string){
        super()
        this.playerName = playerName
        this.pieces = pieces
        this.selectedPieceId = selectedPieceId
        this.sessionId = sessionId
        this.playerTurn = false
    }
}