import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:'auctions'
})
export class Auction {
    @PrimaryGeneratedColumn('uuid')
    public id: string
    
}
