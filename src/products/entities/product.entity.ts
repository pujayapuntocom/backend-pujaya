import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  public name: string;

  @Column({
    type: 'text',
    default: [
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shopify.com%2Fpartners%2Fblog%2Fimg-url-filter&psig=AOvVaw2EkP0J65Il4Nos_inEkDNc&ust=1742612582382000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNjajdCXmowDFQAAAAAdAAAAABAE',
    ],
  })
  public imgProduct: [string];

  @Column({
    type: 'text',
    nullable: false,
  })
  public description: string;

  @Column('decimal', {
    scale: 2,
    nullable: false,
    precision: 10,
  })
  public initialPrice: number;

  @Column('decimal', {
    scale: 2,
    nullable: false,
    precision: 10,
  })
  public finalPrice: number;
}
