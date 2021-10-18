import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Owner } from '../owners/owner.entity';

@Entity()
class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  type?: string;

  @ManyToOne(()=> Owner, owner => owner.pets, { nullable: true })
  owner?: Owner;
}

export default Pet;
