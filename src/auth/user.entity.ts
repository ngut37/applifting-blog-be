import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  async validatePassword(passwordToValidate: string): Promise<boolean> {
    const hash = await bcrypt.hash(passwordToValidate, this.salt);
    return hash === this.password;
  }
}
