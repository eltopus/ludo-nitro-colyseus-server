import { Schema, ArraySchema, type } from "@colyseus/schema";

export default class Piece extends Schema {
    @type("string")
    pieceId: string
    @type("number")
    index: number
    @type("number")
    homeEntranceIndex: number
    @type("number")
    homeStartIndex: number
    @type("number")
    startIndex: number
    @type("string")
    pieceState: string
    @type("string")
    pieceType: string
    @type("number")
    x: number
    @type("number")
    y: number
    @type("number")
    hx: number
    @type("number")
    hy: number
    constructor(pieceId?: string, index?: number, homeEntranceIndex?: number, 
                homeStartIndex?: number, startIndex?: number, pieceState?: string, 
                pieceType?: string, x?: number, y?: number, hx?: number, hy?: number){
                super()
                this.pieceId = pieceId
                this.index = index
                this.homeEntranceIndex = homeEntranceIndex
                this.homeStartIndex = homeStartIndex
                this.startIndex = startIndex
                this.pieceState = pieceState
                this.pieceType = pieceType
                this.x = x
                this.y = y
                this.hx = hx
                this.hy = hy
    }
}