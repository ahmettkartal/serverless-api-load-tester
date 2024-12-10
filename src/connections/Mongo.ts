import mongoose from 'mongoose';
const MONGO_URI = `mongodb+srv://${process.env.PROJECT_DB_USER}:${process.env.PROJECT_DB_PASSWORD}@${process.env.PROJECT_DB_HOST}/?retryWrites=true&w=majority`

let cachedMongoConn : any = null;

const connectDatabase = () => {
    return new Promise((resolve, reject) => {
        mongoose.Promise = global.Promise;
        mongoose.set('strictQuery', false);
        mongoose.connection
            // Reject if an error occurred when trying to connect to MongoDB
            .on('error', error => {
                console.info('Error: connection to DB failed');
                reject(error);
            })
            // Exit Process if there is no longer a Database Connection
            .on('close', () => {
                console.error('Error: Connection to DB lost');
                process.exit(1);
            })
            // Connected to DB
            .once('open', () => {
                const infos = mongoose.connections;
                infos.map(info => console.info(`Connected to ${info.host}:${info.port}/${info.name}`));
                // Return successful promise
                resolve(cachedMongoConn);
            });

        if (!cachedMongoConn) {
            cachedMongoConn = mongoose.connect(MONGO_URI, {
                connectTimeoutMS: 5000
            });
        } else {
            console.info('MongoDB: using cached database instance');
            resolve(cachedMongoConn);
        }
    });
}

export const connect = () => {
    connectDatabase().then(() => {
        console.info('Connected to MongoDB');
    }).catch(error => {
        console.error('Could not connect to database', {error});
        throw error;
    });
}