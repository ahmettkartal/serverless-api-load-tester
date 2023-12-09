# Serverless API Load Tester
## Running on Local Environment 
To run project on your local environment just go to the root directory of the project and run `./run.sh` command.

## Running on AWS Lambda
To run project on AWS Lambda you need to have AWS account and SQS service configured.
To configure SQS service you need to create queue and set queue ARN and URL in `config.development.json` file in `config` folder.

## Queue Configuration
To configure queue you need to create queue in SQS use default settings on AWS (It should be a FIFO queue).

## Deploying to AWS Lambda
To deploy project to AWS you should have serverless framework installed on your machine.
To install serverless framework run `npm install -g serverless` command.
To deploy project to AWS run `serverless deploy development` command.
Stage is totally up to you, you can use any stage you want, but if you crate new stage you need to create new configuration file in `config` folder like `config.production.json` and set all the variables in it.