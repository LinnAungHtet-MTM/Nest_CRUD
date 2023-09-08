// import { Injectable } from '@nestjs/common';
// import * as nodemailer from 'nodemailer';

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

// @Injectable()
// export class EmailService {
//   private transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'mtm.linnaunghtet@gmail.com',
//       pass: 'cuciaasounngjloe',
//     },
//   });

//   sendEmail(email: string, subject: string, text: string): void {
//     const mailOptions = {
//       from: 'mtm.linnaunghtet@gmail.com',
//       to: email,
//       subject,
//       html: text,
//     };

//     this.transporter.sendMail(mailOptions, (err, info) => {
//       if (err) {
//         console.log(err, 'Email not sent');
//       } else {
//         console.log('Email sent successfully', info.response);
//       }
//     });
//   }
// }

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  sendMail(email: string, subject: string, text: string): void {
    this.mailerService.sendMail({
      to: email,
      from: 'mtm.linnaunghtet@gmail.com',
      subject,
      html: text,
    });
  }
}
