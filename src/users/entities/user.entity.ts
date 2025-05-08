import { Badge } from 'src/badges/entities/badge.entity';
import { Pokemon } from 'src/pokemons/entities/pokemon.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, select: false })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  firstName: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'int', nullable: true })
  addressNumber: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  addressComplement: string;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @Column({ type: 'varchar', length: 255 })
  state: string;

  @Column({ type: 'varchar', length: 255 })
  country: string;

  @Column({ type: 'varchar', length: 10 })
  postalCode: string;

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @OneToMany(() => Pokemon, (pokemon) => pokemon.userId)
  pokemons: Pokemon[];

  @ManyToMany(() => Badge, (badge) => badge.users)
  badges: Badge[];
}
