import { EmailService } from '../../../presentation/email/email.service';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface SendlogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendlogEmailUseCase {
    constructor(private readonly logRepository: LogRepository, private readonly emailService: EmailService) {}
    async execute(to: string | string[]) {
        try {
            const response = await this.emailService.sendEmailWithFileSystemLog(to);

            if (!response) {
                throw new Error('Email log not sent');
            }

            return true;
        } catch (error) {
            const log = new LogEntity({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: 'send-email-logs.ts',
            });

            this.logRepository.saveLog(log);

            return false;
        }
    }
}
