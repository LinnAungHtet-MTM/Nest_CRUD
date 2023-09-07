import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { task } from './schema/task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(task.name) private readonly taskModel: Model<task>,
  ) {}

  async getAllTaskList(): Promise<task[]> {
    try {
      const data = await this.taskModel.find().populate([
        {
          path: 'projectName',
          select: '_id projectName',
        },
        {
          path: 'assignedEmployee',
          select: '_id employeeName',
        },
      ]);
      return data;
    } catch (err) {
      throw new NotFoundException('Failed to get all lists');
    }
  }

  async createTask(payload): Promise<task> {
    try {
      const data = await new this.taskModel(payload);
      return data.save();
    } catch (err) {
      throw new NotFoundException('Failed to get all lists');
    }
  }

  async updateTask(id, payload): Promise<task> {
    try {
      const data = await this.taskModel.findByIdAndUpdate(id, payload, {
        new: true,
      });
      return data;
    } catch (err) {
      throw new NotFoundException('Failed to update task');
    }
  }
}
