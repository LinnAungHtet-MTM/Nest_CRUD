import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { MongooseModule } from '@nestjs/mongoose';
import { employeeSchema } from './schema/employee.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([{ name: 'employee', schema: employeeSchema }]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, AuthGuard],
  exports: [EmployeeService],
})
export class EmployeeModule {}
