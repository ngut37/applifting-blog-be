import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  tenantId: string;

  @Column()
  name: string;

  @Column()
  @Generated('uuid')
  apiKey: string;

  @CreateDateColumn({ type: 'timestamptz', update: false })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  lastUsedAt: Date;
}
