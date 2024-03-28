import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PagoController } from './pago.controller';
import { PagoService } from './pago.service';
import { Cuenta,CuentaSchema } from './entities/pago.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cuenta.name, schema: CuentaSchema }]),
  ],
  controllers: [PagoController],
  providers: [PagoService],
})
export class PagoModule {}
