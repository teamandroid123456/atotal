import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagoModule } from './pago/pago.module';
import { Cuentas } from './pago/entities/pago.entity';

@Module({
  imports: [PagoModule,
    TypeOrmModule.forRoot({
      type: 'mysql', 
      host: 'localhost', 
      port: 3306, 
      username: 'root',
      password: '12345678', 
      database: 'bd_atotal',
      entities: [Cuentas],
      synchronize: true, 
    }),
  ],
})
export class AppModule {}
