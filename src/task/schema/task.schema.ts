import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class task {
  @Prop({ type: String, ref: 'project', required: true })
  projectName: string;

  @Prop({ type: String, ref: 'employee', required: true })
  assignedEmployee: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  estimateHour: number;

  @Prop({ default: true })
  actualHour: number;

  @Prop({ required: true, default: '0' })
  status: string;

  @Prop()
  estimate_start_date: string;

  @Prop()
  estimate_finish_date: string;

  @Prop()
  actual_start_date: string;

  @Prop()
  actual_finish_date: string;
}

export const taskSchema = SchemaFactory.createForClass(task);
