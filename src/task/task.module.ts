import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { taskSchema } from './schema/task.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'task', schema: taskSchema }])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
