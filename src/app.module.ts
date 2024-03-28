// src/app.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PagoModule } from './pago/pago.module';
import { Cuenta,CuentaSchema } from './pago/entities/pago.entity';

@Module({
  imports: [
    PagoModule,
    MongooseModule.forRoot('mongodb+srv://jojhan24:21DEjunio@cluster0.a4ikckw.mongodb.net/bd_atotal'),
    MongooseModule.forFeature([{ name: Cuenta.name, schema: CuentaSchema }]),
  ],
})
export class AppModule {}
