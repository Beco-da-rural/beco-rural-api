import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../category/category.entity';
import { User } from '../user/user.entity';

@Entity()
export class Listing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.listings, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Category, (category) => category.listings, { onDelete: 'SET NULL' })
  category: Category;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
