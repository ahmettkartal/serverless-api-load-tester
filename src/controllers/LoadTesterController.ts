import {Request, Response} from 'express';
import {successWithData, error} from "../responses/APIResponse";
import {push} from "../services/SQSService"

export const create = (req: Request, res: Response) => {
    let promises = [];
    for (let i = 0; i < req.body.iteration; i++) {
        promises.push(push(process.env.LOAD_TEST_SQS_QUEUE_URL, req.body.request_data));
    }

    Promise.all(promises).then((result) => {
        return successWithData({message: "Load test(s) queued successfully"}, req, res);
    }).catch((err) => {
        error(err, req, res);
    })
}
