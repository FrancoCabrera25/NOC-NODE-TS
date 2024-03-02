import { envs } from './config/plugins/envs.plugin';
import { MongoDataBase } from './data/mongo/init';
import { ServerApp } from './presentation/server';

(async () => {
    main();
})();

async function main() {
    await MongoDataBase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: '',
    });
    ServerApp.start();
    console.log(envs.PORT);
}
