import { Schema, ArraySchema, type } from "@colyseus/schema";
export default class Die extends Schema {
    @type("string")
    dieId: string
    @type("number")
    dieValue: number
    @type("boolean")
    selected: boolean
    constructor(dieId?: string, dieValue?: number, selected?: boolean){
        super()
        this.dieId = dieId
        this.dieValue = dieValue
        this.selected = selected
    }
}