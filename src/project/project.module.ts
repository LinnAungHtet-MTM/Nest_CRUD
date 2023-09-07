import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { MongooseModule } from '@nestjs/mongoose';
import { projectSchema } from './schema/project.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'project', schema: projectSchema }]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
