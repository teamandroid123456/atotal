import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { PagoService } from './pago.service';
import { CreatePagoDto } from './dto/create-pago.dto';

@Controller('pago')
export class PagoController {
  constructor(private readonly pagoService: PagoService) {}

  @Get()
  async getCuentasYSaldos() {
    return this.pagoService.getCuentasYSaldos();
  }
  @Post()
  async realizarPago(@Body(ValidationPipe) pagoData: CreatePagoDto) {
    try {
      await this.pagoService.realizarPago(pagoData.numeroCuenta, pagoData.monto);
      return { message: 'Pago realizado con éxito' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException('No se encontró la cuenta especificada.', HttpStatus.INTERNAL_SERVER_ERROR);
      } else if (error.message === 'Saldo insuficiente para realizar el pago.') {
        throw new HttpException('Saldo insuficiente para realizar el pago.', HttpStatus.INTERNAL_SERVER_ERROR);
      } else {
        throw new HttpException('Ocurrió un error al procesar el pago.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

}
