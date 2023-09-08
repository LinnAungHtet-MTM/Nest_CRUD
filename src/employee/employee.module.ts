import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { MongooseModule } from '@nestjs/mongoose';
import { employeeSchema } from './schema/employee.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from 'src/utils/email.service';
import { VerifyEmailService } from 'src/template/email.template';

@Module({
  imports: [
    // JwtModule,
    MongooseModule.forFeature([{ name: 'employee', schema: employeeSchema }]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: 'mtm.linnaunghtet@gmail.com',
          pass: 'cuciaasounngjloe',
        },
      },
    }),
    JwtModule.register({
      secret: 'JWT_SECRET_KEY',
      signOptions: { expiresIn: '1D' },
    }),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, AuthGuard, EmailService, VerifyEmailService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
