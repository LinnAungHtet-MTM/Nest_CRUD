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
  NotFoundException,
} from '@nestjs/common';
import { employee } from './schema/employee.schema';
import { EmployeeService } from './employee.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { EmployeeRequestDto } from './dto/employee.request.dto';
import { EmployeeResponseDto } from './dto/employee.response.dto';

@Controller('employee')
@ApiTags('Employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @ApiBearerAuth('JWT-auth')
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
  async create(
    @Res() res,
    @Body() employee: EmployeeRequestDto,
  ): Promise<EmployeeResponseDto> {
    try {
      const data = await this.employeeService.createEmployee(employee);
      return res
        .status(200)
        .json({ message: 'Employee Created Successfully', data });
    } catch (err) {
      throw new NotFoundException(err);
    }
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
