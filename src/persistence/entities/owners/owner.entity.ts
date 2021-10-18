import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Pet from '../pet/pet.entity';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Pet, pet => pet.owner, {
    cascade: true, lazy:true
  })
  pets: Pet[];
}
