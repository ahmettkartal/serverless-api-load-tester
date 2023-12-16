## Before You Begin
Make sure you have:

- AWS Account
- Node.js installed
- Serverless Framework installed
- AWS SQS queue created with default settings

Don't worry if you're new to configuring the Serverless Framework or setting up AWS credentials. You can follow this [documentation](https://www.serverless.com/framework/docs/getting-started). Also, you can follow up on how to setup AWS credentials from this [documentation](https://www.serverless.com/framework/docs/providers/aws/guide/credentials)

## Configuring the SQS Queue

1. This project sends requests using [AWS SQS](https://aws.amazon.com/sqs/). You can create a simple FIFO queue with default settings.
2. Once your queue is created, you'll need to update the queue ARN and URL in the `config.development.json` file under the `config` folder. Alternatively, you can set these variables in the `run.sh` file for local development.

3. Replace `YOUR_SQS_QUEUE_ARN_HERE` and `YOUR_SQS_QUEUE_URL_HERE`, with your actual queue information.

## Deploying the Project

1. Deploy the project to AWS using the Serverless Framework with this command:

```
serverless deploy --stage development
```
2. If you want to create a new stage, you have to create the stage's config file under the `config` folder with the stage's name. For example, for a stage called `production`, create a file named `config.production.json`.

## Running the Project

1. After the deployment process, you'll get an endpoint like `https://endpoint_key.execute-api.eu-central-1.amazonaws.com/development`. This URL serves as your base endpoint.

2. To add a request to the queue you can use the `{{url}}/load-tests` endpoint. Below, you'll find an example of sample data you can use:
```
{	
	"iteration" : 100,
	"request_data" : {
		"method" : "post",
		"url" :"YOUR_LOAD_TEST_ENDPOINT",
		"data" : {
			"key" :"value"
		},
		"headers" : {
			"Content-Type": "application/json"
		}
	}
}
```

> I used [webhook.site](https://webhook.site) for testing. It is a great tool.
> Also you can find the Postman collection at the repo

The `iteration` parameter denotes the number of requests, and the `request_data` configures Axios.

That is it! Now you have your load tester tool 🥳. If you have additional ideas or any problems, please write me ✌🏻.