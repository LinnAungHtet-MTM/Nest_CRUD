import {
  Controller,
  Response,
  Param,
  Request,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async getAllProject(@Response() res) {
    const data = await this.projectService.getAllProjectList();
    return res.status(200).json({ message: 'Get all project List', data });
  }

  @Get(':id')
  async getId(@Response() res, @Param('id') id: string) {
    const data = await this.projectService.getById(id);
    return res.status(200).json({ message: 'Get project by id', data });
  }

  @Post()
  async create(@Request() req, @Response() res) {
    const payload = req.body;
    const data = await this.projectService.createProject(payload);
    return res
      .status(200)
      .json({ message: 'Project Created Successfully', data });
  }

  @Put(':id')
  async updated(@Request() req, @Response() res, @Param('id') id: string) {
    const payload = req.body;
    const data = await this.projectService.updateProject(id, payload);
    return res
      .status(200)
      .json({ message: 'Project Updated Successfully', data });
  }

  @Delete(':id')
  async drop(@Response() res, @Param('id') id: string) {
    await this.projectService.deleteProject(id);
    return res.status(200).json({ message: 'Project Deleted Successfully' });
  }
}
