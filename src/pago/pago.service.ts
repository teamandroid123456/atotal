import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CuentaDocument, Cuenta } from './entities/pago.entity';
import { CreatePagoDto } from './dto/create-pago.dto';

@Injectable()
export class PagoService {
  constructor(
    @InjectModel(Cuenta.name) private readonly cuentaModel: Model<CuentaDocument>,
  ) {}

  async getCuentasYSaldos(): Promise<{ numeroCuenta: string, saldo: number }[]> {
    const cuentas = await this.cuentaModel.find().exec();
    return cuentas.map(cuenta => ({ numeroCuenta: cuenta.numeroCuenta, saldo: cuenta.saldo }));
  }

  async realizarPago(numeroCuenta: string, monto: number): Promise<void> {
    const cuenta = await this.cuentaModel.findOne({ numeroCuenta }).exec();

    if (!cuenta) {
      throw new NotFoundException('No se encontró la cuenta especificada.');
    }

    if (cuenta.saldo < monto) {
      throw new Error('Saldo insuficiente para realizar el pago.');
    }

    cuenta.saldo -= monto;
    await cuenta.save();
  }
}
