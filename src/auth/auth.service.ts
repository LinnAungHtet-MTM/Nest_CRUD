import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { employee } from 'src/employee/schema/employee.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(employee.name) private employeeModel: Model<employee>,
    private readonly jwtService: JwtService,
  ) {}

  // --------- login ---------------
  async loginService(email: string, password: string): Promise<any> {
    const user = await this.employeeModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('Email does not exist');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      userId: user._id,
      type: user.Position,
    };

    const data = {
      _id: user._id,
      employeeName: user.employeeName,
      email: user.email,
      address: user.address,
      Phone: user.Phone,
      DOB: user.DOB,
      position: user.Position,
    };
    const token = this.jwtService.sign(payload);
    return { token, data };
  }

  // -------- change-password --------
  async changePassword(
    email: string,
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<any> {
    const user = await this.employeeModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('This user does not exist!');
    }

    const MatchPassword = await bcrypt.compare(oldPassword, user.password);

    if (!MatchPassword) {
      throw new UnauthorizedException('Wrong old password!');
    }

    if (oldPassword === newPassword) {
      throw new UnauthorizedException(
        'Old password and new password must not same!',
      );
    }

    if (newPassword === confirmPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
      // return 'Changed password successfullly!';
    } else {
      throw new UnauthorizedException(
        'New password and confirm password must same!',
      );
    }
  }

  // --------- froget-password ------
  async forgetPassword(email: string): Promise<undefined> {
    const user = await this.employeeModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('This user does not exist!');
    }
  }

  // --------- reset-password -------
  async resetPassword(
    id: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<undefined> {
    const user = await this.employeeModel.findOne({ _id: id });
    if (!user) {
      throw new NotFoundException('This user does not exist');
    }
    if (newPassword === confirmPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
    } else {
      throw new UnauthorizedException(
        'New password and confirm password must be same!',
      );
    }
  }

  // --------- account-verified -----
  //   async accountVerified(token: string): Promise<undefined> {
  //     if (!token) {
  //       throw new UnauthorizedException('Token does not exists!');
  //     }
  //     const user = await this.employeeModel.findOne({ token });
  //     if (user) {
  //       await this.employeeModel.findOneAndUpdate(user.token, { ver });
  //     }
  //   }
}
