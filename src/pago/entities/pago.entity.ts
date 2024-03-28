import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CuentaDocument = Cuenta & Document;

@Schema()
export class Cuenta {
  
  @Prop({ unique: true })
  numeroCuenta: string;

  @Prop({ type: Number })
  saldo: number;

  // Definir campo id

}

export const CuentaSchema = SchemaFactory.createForClass(Cuenta);
