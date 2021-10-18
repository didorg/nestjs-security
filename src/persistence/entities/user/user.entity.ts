import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  userName: string;

  @Column({ nullable: true })
  password: string;
}

export default User;
