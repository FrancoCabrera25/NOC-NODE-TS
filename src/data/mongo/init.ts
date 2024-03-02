import mongoose from 'mongoose';

interface ConnectionOptions {
    mongoUrl: string;
    dbName: string;
}

export class MongoDataBase {
    static async connect(options: ConnectionOptions) {
        const { mongoUrl } = options;

        try {
            await mongoose.connect(mongoUrl, {});

            console.log('mongo connected!!!!!');
        } catch (error) {
            console.log('mogno connection error', error);
            throw error;
        }
    }
}
