import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuentas } from './entities/pago.entity';
import { PagoController } from './pago.controller';
import { PagoService } from './pago.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cuentas])], 
  controllers: [PagoController],
  providers: [PagoService],
})
export class PagoModule {}
