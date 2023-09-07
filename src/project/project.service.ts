import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { project } from './schema/project.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(project.name) private projectModel: Model<project>,
  ) {}

  async getAllProjectList(): Promise<project[]> {
    const data = await this.projectModel.find();
    return data;
  }

  async getById(id: string): Promise<project> {
    const data = await this.projectModel.findById(id);
    if (!data) {
      throw new NotFoundException('No project with this id');
    }
    return data;
  }

  async createProject(payload): Promise<project> {
    const data = await new this.projectModel(payload);
    data.save();
    return data;
  }

  async updateProject(id: string, payload): Promise<project> {
    const data = await this.projectModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
    return data;
  }

  async deleteProject(id: string): Promise<undefined> {
    await this.projectModel.findByIdAndUpdate(id);
  }
}
