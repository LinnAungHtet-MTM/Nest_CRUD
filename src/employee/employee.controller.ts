import {
  Controller,
  Get,
  Res,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { employee } from './schema/employee.schema';
import { EmployeeService } from './employee.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @UseGuards(AuthGuard)
  @Get()
  // async getEmployee(): Promise<employee[]> {}
  async getEmployee(@Res() res): Promise<employee[]> {
    const data = await this.employeeService.getAllEmployee();
    return res.status(200).json({ message: 'Get All Employee List', data });
  }

  @Get(':id')
  async getById(@Res() res, @Param('id') id: string): Promise<employee> {
    const data = await this.employeeService.getEmployeeById(id);
    return res.status(200).json({ message: 'Get Employee By Id', data });
  }

  @Post()
  async create(@Res() res, @Body() employee): Promise<employee> {
    const data = await this.employeeService.createEmployee(employee);
    return res
      .status(200)
      .json({ message: 'Employee Created Successfully', data });
  }

  @Put(':id')
  async updateEmployee(
    @Res() res,
    @Param('id') id: string,
    @Body() employee,
  ): Promise<employee> {
    const data = await this.employeeService.updateEmployeeByID(id, employee);
    return res
      .status(200)
      .json({ message: 'Employee Updated Successfullly', data });
  }

  @Delete(':id')
  async delEmployee(@Res() res, @Param('id') id: string): Promise<employee> {
    await this.employeeService.dropEmployee(id);
    return res.status(200).json({ message: 'Employee Deleted Successfully' });
  }
}
