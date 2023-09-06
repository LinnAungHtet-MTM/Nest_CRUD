import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { MongooseModule } from '@nestjs/mongoose';
import { employeeSchema } from './schema/employee.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'employee', schema: employeeSchema }]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
