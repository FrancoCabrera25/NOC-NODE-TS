import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachments[];
}

interface Attachments {
    fileName: string;
    path: string;
}
export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        },
    });

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            const sendInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments,
            });
            console.log('sendInformation', sendInformation);
            return true;
        } catch (error) {
            return false;
        }
    }

    async sendEmailWithFileSystemLog(to: string | string[]) {
        const subject = 'Logs del servidor';
        const htmlBody = '<h3>Logs de sistemas </h3>';
        const attachments: Attachments[] = [
            {
                fileName: 'logs-all.log',
                path: './logs/logs-all.log',
            },
            {
                fileName: 'logs-high.log',
                path: './logs/logs-high.log',
            },
            {
                fileName: 'logs-medium.log',
                path: './logs/logs-medium.log',
            },
        ];

        await this.sendEmail({
            to,
            subject,
            htmlBody,
            attachments,
        });
        return true;
    }
}
