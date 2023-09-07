import {
  Controller,
  Response,
  Get,
  Request,
  Post,
  Param,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTask(@Response() res) {
    const data = await this.taskService.getAllTaskList();
    return res.status(200).json({ messag: 'Get All Task Lists', data });
  }

  @Post()
  async create(@Response() res, @Request() req) {
    const payload = req.body;
    const data = await this.taskService.createTask(payload);
    return res.status(200).json({ message: 'New task created', data });
  }

  @Put(':id')
  async update(@Request() req, @Response() res, @Param('id') id: string) {
    const payload = req.body;
    const data = await this.taskService.updateTask(id, payload);
    return res.status(200).json({ message: 'Update Task Created', data });
  }
}
