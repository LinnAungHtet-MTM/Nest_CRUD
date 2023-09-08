import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { employee } from './schema/employee.schema';
import * as bcrypt from 'bcrypt';
import * as randomstring from 'randomstring';
import { Model } from 'mongoose';
import { EmployeeRequestDto } from './dto/employee.request.dto';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/utils/email.service';
import { VerifyEmailService } from 'src/template/email.template';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(employee.name) private employeeModel: Model<employee>,
    private readonly emailService: EmailService,
    private readonly verifyEmail: VerifyEmailService,
    private readonly jwtService: JwtService,
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

  async createEmployee(payload: EmployeeRequestDto): Promise<any> {
    const employeeData = {
      employeeName: payload.employeeName,
      email: payload.email,
      address: payload.address,
      Phone: payload.Phone,
      DOB: payload.DOB,
      Position: payload.Position,
    };

    const user = await this.employeeModel.findOne({
      email: employeeData.email,
    });
    if (user) {
      throw new NotFoundException('User is already exists!');
    }
    const randomPassword = randomstring.generate(8);
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    const token = this.jwtService.sign({ email: employeeData.email });

    const data = {
      ...employeeData,
      password: hashedPassword,
      token,
    };
    await this.employeeModel.create(data);

    const verifyLink = `http://localhost:3000/verify?token=${token}`;

    const template = this.verifyEmail.verifyTemplate(
      employeeData.email,
      verifyLink,
      randomPassword,
    );

    this.emailService.sendMail(
      employeeData.email,
      'Verify your Email',
      template,
    );

    return data;
  }

  async updateEmployeeByID(id: string, employee): Promise<employee> {
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
