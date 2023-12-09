const express = require('express');
const serverless = require('serverless-http');
const app = express();
const { defaultMiddleware } = require('./src/middlewares/DefaultMiddleware');

// Use Default Middleware
app.use(defaultMiddleware);

// Include routes
const default_routes = require('./src/routes/DefaultRoute');
const load_tester_routes = require('./src/routes/LoadTesterRoute');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/load-tests', load_tester_routes);
app.use('/', default_routes);

if (process.env.PROJECT_APP_STAGE === 'LOCAL') {
    app.listen(process.env.PROJECT_DEFAULT_PORT, () => console.log(`Listening on: ${process.env.PROJECT_DEFAULT_PORT}`));
}

// Export app
module.exports.project_handler = serverless(app, {
    callbackWaitsForEmptyEventLoop: false,
});