import express, {Express} from 'express';
import serverless from 'serverless-http';
import {connect} from './connections/Mongo';
import defaultMiddleware from './middlewares/DefaultMiddleware';

// Connect to MongoDB
//connect();

const app: Express = express();

// Include routes
import defaultRoutes from './routes/DefaultRoute';
import loadTesterRoutes from "./routes/LoadTesterRoute";

// Use Default Middleware
app.use(defaultMiddleware)

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/load-tests', loadTesterRoutes);
app.use('/', defaultRoutes);

if (process.env.PROJECT_APP_STAGE === 'LOCAL') {
    app.listen(process.env.PROJECT_DEFAULT_PORT, () => console.log(`Listening on: ${process.env.PROJECT_DEFAULT_PORT}`));
}

// Export app
module.exports.project_handler = serverless(app);