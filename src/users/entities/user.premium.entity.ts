import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class UserIsPremium {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: "varchar",
        length: 100,
        unique: true,
    })
    suscriptionType: string
}

