import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column({
        type: "varchar",
        length: 100,
        unique: true,
    })
    categoryName: string
    
    @Column({
        type: "varchar",
        length: 100,
        unique: true,
    })
    imgProduct: string
}



