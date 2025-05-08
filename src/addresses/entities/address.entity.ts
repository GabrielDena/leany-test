import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('address')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  street: string;

  @Column({ type: 'int', nullable: true })
  number: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  complement: string;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @Column({ type: 'varchar', length: 255 })
  state: string;

  @Column({ type: 'varchar', length: 255 })
  country: string;

  @Column({ type: 'varchar', length: 10 })
  postalCode: string;

  @OneToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
