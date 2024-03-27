import { IsString, IsNumber } from 'class-validator';

export class CreatePagoDto {
  @IsString()
  numeroCuenta: string;

  @IsNumber()
  monto: number;
}
