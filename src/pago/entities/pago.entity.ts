import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cuentas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  numeroCuenta: string;

  @Column('decimal', { precision: 10, scale: 2 })
  saldo: number;
}
