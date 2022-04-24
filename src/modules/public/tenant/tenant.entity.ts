import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['name'])
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  salt: string;

  @Column()
  password: string;

  @Column()
  @Generated('uuid')
  apiKey: string;

  @CreateDateColumn({ type: 'timestamptz', update: false })
  createdAt: Date;

  @Column({ type: 'timestamptz', nullable: true, default: null })
  lastUsedAt?: Date;

  async validatePassword(passwordToValidate: string): Promise<boolean> {
    const hash = await bcrypt.hash(passwordToValidate, this.salt);
    return hash === this.password;
  }
}
