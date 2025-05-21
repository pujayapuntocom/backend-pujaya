<<<<<<< HEAD
import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { text } from 'stream/consumers';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
=======
import { Entity, PrimaryGeneratedColumn } from "typeorm";
>>>>>>> f55598db47a6601675358d0309e09bd1ce652ce2

@Entity({
  name: 'auctions',
})
export class Auction {
<<<<<<< HEAD
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne(() => User, (user) => user.auctions)
  owner: User;

  @OneToMany(() => Product, (product) => product.auction)
  products: Product[];
=======
    @PrimaryGeneratedColumn('uuid')
    public id: string
    
>>>>>>> f55598db47a6601675358d0309e09bd1ce652ce2
}
