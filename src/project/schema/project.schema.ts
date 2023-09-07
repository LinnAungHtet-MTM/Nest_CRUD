import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class project {
  @Prop({ required: true })
  projectName: string;

  @Prop({ required: true })
  language: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  startDate: string;

  @Prop({ required: true })
  endDate: string;
}

export const projectSchema = SchemaFactory.createForClass(project);
