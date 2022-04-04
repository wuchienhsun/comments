import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  userName: string;

  @Column()
  avatar: string;

  @Column('text')
  comment: string;

  @Column('int')
  upvotes: number;

  @Column('timestamp')
  timestamp: number;

  @Column('int')
  commentId: number | null;
}
