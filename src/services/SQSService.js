const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");
const client = new SQSClient({ region: process.env.PREFERRED_REGION });

module.exports.push = async (sqs_url, data) => {
    const input = {
        QueueUrl: sqs_url,
        MessageBody: JSON.stringify(data),
        DelaySeconds: 0
    };

    const command = new SendMessageCommand(input);
    return client.send(command);
}