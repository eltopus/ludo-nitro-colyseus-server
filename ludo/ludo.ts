import { Schema, ArraySchema, type } from "@colyseus/schema";
import Die from './die'
import Player from './player'
export default class Ludo extends Schema {
    @type("string")
    uuid: string = ""
    @type([Die])
    dice: ArraySchema<Die> = new ArraySchema<Die>()
    @type([Player])
    players: ArraySchema<Player> = new ArraySchema<Player>()

    constructor(uuid?: string, dice?: ArraySchema<Die>, players?: ArraySchema<Player>) {
        super()
        this.uuid = uuid
        this.dice = dice
        this.players = players
    }
  }