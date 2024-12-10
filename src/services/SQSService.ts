import { SQSClient, SendMessageCommand, SendMessageCommandInput, SendMessageCommandOutput } from "@aws-sdk/client-sqs";

const client = new SQSClient({ region: process.env.PREFERRED_REGION });

export const push = async (sqsUrl: string | undefined, data: any): Promise<SendMessageCommandOutput> => {
    if (!sqsUrl) {
        throw new Error("SQS URL is not defined");
    }
    const input: SendMessageCommandInput = {
        QueueUrl: sqsUrl,
        MessageBody: JSON.stringify(data),
        DelaySeconds: 0
    };

    const command = new SendMessageCommand(input);
    return client.send(command);
}