import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StudentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column('json', { nullable: true }) //this to read  arrays as json
  address: string[];
}
