import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cuentas } from './entities/pago.entity';
import { CreatePagoDto } from './dto/create-pago.dto';

@Injectable()
export class PagoService {
  constructor(
    @InjectRepository(Cuentas)
    private readonly cuentaRepository: Repository<Cuentas>,
   
  ) {}

  async getCuentasYSaldos(): Promise<{ numeroCuenta: string, saldo: number }[]> {
    const cuentas = await this.cuentaRepository.find();
    return cuentas.map(cuenta => ({ numeroCuenta: cuenta.numeroCuenta, saldo: cuenta.saldo }));
  }
  async realizarPago(numeroCuenta: string, monto: number): Promise<void> {
    const cuenta = await this.cuentaRepository.findOne({ where: { numeroCuenta } });

    if (!cuenta) {
      throw new NotFoundException('No se encontró la cuenta especificada.');
    }

    if (cuenta.saldo < monto) {
      throw new Error('Saldo insuficiente para realizar el pago.');
    }
    cuenta.saldo -= monto;
    await this.cuentaRepository.save(cuenta);
  }
}
