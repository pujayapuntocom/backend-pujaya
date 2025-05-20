import { ApiProperty } from "@nestjs/swagger";
import { text } from "stream/consumers";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:'auctions'
})
export class Auction {
    @PrimaryGeneratedColumn('uuid')
    public id: string
}
