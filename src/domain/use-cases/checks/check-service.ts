import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
    constructor(
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
        private readonly logRepository: LogRepository
    ) {}
    async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);

            if (!req.ok) throw new Error(`Error on check services ${url}`);

            this.logRepository.saveLog(
                new LogEntity({ message: 'todo ok', level: LogSeverityLevel.Low, origin: 'check-service.ts' })
            );
            this.successCallback();
            return true;
        } catch (error) {
            this.logRepository.saveLog(
                new LogEntity({ message: 'errorrr', level: LogSeverityLevel.high, origin: 'check-service.ts' })
            );
            this.errorCallback(`${error}`);
            return false;
        }
    }
}
