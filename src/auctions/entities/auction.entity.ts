import { ApiProperty } from "@nestjs/swagger";
import { text } from "stream/consumers";
import { Entity } from "typeorm";

@Entity({
    name:'auctions'
})
export class Auction {}
