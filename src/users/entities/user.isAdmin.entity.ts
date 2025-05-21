import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class UserIsAdmin {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: "varchar",
        length: 100,
        unique: true,
    })
    canManageUsers: boolean

    @Column({
        type: "varchar",
        length: 100,
        unique: true,
    })
    canEditAuctions: boolean

    @Column({
        type: "varchar",
        length: 50,
        unique: true,
    })
    canDeleteListings: boolean
}
