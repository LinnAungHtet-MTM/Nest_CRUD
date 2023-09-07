import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class employee {
  @Prop({ required: true })
  employeeName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  token: string;

  @Prop()
  verified: boolean;

  @Prop()
  profile: string;

  @Prop()
  address: string;

  @Prop()
  Phone: number;

  @Prop()
  DOB: string;

  @Prop()
  Position: string;
}

export const employeeSchema = SchemaFactory.createForClass(employee);
