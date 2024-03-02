import { LogSeverityLevel } from '../domain/entities/log.entity';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-log';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDataSource } from '../infrastructure/datasources/mongo-log.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

//const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDataSource());
const logRepository = new LogRepositoryImpl(new MongoLogDataSource());
export class ServerApp {
    static async start() {
        console.log('server started....');

        CronService.createJob('* * * * * *', () => {
            console.log('excute');
            new CheckService(
                () => console.log('sucess'),
                () => console.log('error'),
                logRepository
            ).execute('https://google.com');
        });

        const emailService = new EmailService();

        new SendEmailLogs(logRepository, emailService).execute('cabrera.franco@outlook.com');

        // emailService.sendEmail({
        //     to: 'cabrera.franco@outlook.com',
        //     subject: 'prueba de email',
        //     htmlBody: '<h3>Logs de sistemas </h3>',
        // });
        // emailService.sendEmailWithFileSystemLog('cabrera.franco@outlook.com');

        const logs = await logRepository.getLogs(LogSeverityLevel.Low);
        console.log(logs);
    }
}
