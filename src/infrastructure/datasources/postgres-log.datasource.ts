// import { LogDataSource } from '../../domain/datasources/log.datasource';
// import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
// import { PrismaClient, SeverityLevel } from '@prisma/client';

// const prisma = new PrismaClient();

// const severityEnum = {
//     low: SeverityLevel.LOW,
//     medium: SeverityLevel.MEDIUM,
//     high: SeverityLevel.HIGH,
// };
// export class PostgresDataSource implements LogDataSource {
//     async saveLog(log: LogEntity): Promise<void> {
//         const level = severityEnum[log.level];
//         const newLog = await prisma.logModel.create({
//             data: {
//                 ...log,
//                 level: level,
//             },
//         });
//     }
//     async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
//         const level = severityEnum[severityLevel];
//         const dblogs = await prisma.logModel.findMany({
//             where: { level },
//         });

//         return dblogs.map((dbLog: any) => LogEntity.fromObject(dbLog));
//     }
// }
