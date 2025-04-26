import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Listing } from '@modules/listing/listing.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Listing, (listing) => listing.user)
  listings: Listing[];
}
