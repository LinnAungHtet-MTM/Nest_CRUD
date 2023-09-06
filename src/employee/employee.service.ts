import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { employee } from './schema/employee.schema';
import { Model } from 'mongoose';
import { createEmployeeDto } from 'src/book/dto/employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(employee.name) private employeeModel: Model<employee>,
  ) {}

  async getAllEmployee(): Promise<employee[]> {
    return await this.employeeModel.find();
  }

  async getEmployeeById(id: string): Promise<employee> {
    const employee = await this.employeeModel.findById(id);
    if (!employee) {
      throw new NotFoundException('No User with this id');
    }
    return employee;
  }

  async createEmployee(payload: createEmployeeDto): Promise<employee> {
    const employee = new this.employeeModel(payload);
    return employee.save();
  }

  async updateEmployeeByID(
    id: string,
    employee: createEmployeeDto,
  ): Promise<employee> {
    const employeeUpdate = await this.employeeModel.findByIdAndUpdate(
      id,
      employee,
      {
        new: true,
        runValidators: true,
      },
    );
    return employeeUpdate;
  }

  async dropEmployee(id: string): Promise<employee> {
    return await this.employeeModel.findByIdAndDelete(id);
  }
}
