import { Auction } from 'src/auctions/entities/auction.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  password: string;

  @Column({
    nullable: true,
  })
  imgProfile: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  country: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  address: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: ['regular', 'admin', 'premium'],
    default: 'regular',
  })
  role: string;

  @Column({
    type: 'json',
    nullable: true,
  })
  permissions: {
    canManageUsers?: boolean;
    canEditAuctions?: boolean;
    canDeleteListings?: boolean;
    suscriptionType?: 'monthly' | 'annual';
  };

  @OneToMany(() => Auction, (auction) => auction.owner)
  auctions: Auction[];
}
