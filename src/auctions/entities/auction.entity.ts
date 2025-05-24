import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { text } from 'stream/consumers';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'auctions',
})
export class Auction {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'text',
    nullable: false
  })
  public name: string

  @Column({
    type: 'boolean',
    default: true
  })
  isActive: boolean

  @ManyToOne(() => User, (user) => user.auctions)
  owner: User;

  @OneToMany(() => Product, (product) => product.auction)
  products: Product[];
}
