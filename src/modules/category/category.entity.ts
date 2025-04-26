import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Listing } from '@modules/listing/listing.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Listing, (listing) => listing.category)
  listings: Listing[];
}
