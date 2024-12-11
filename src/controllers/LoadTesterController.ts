import {Request, Response} from 'express';
import {successWithData, error} from "../responses/APIResponse";
import {push} from "../services/SQSService"
import LoadTest from "../models/LoadTest";
import LoadTestResult from "../common/interfaces/LoadTestResult";

export const create = async (req: Request, res: Response) => {
    let result: LoadTestResult = {
        iteration : req.body.iteration,
        request_data: req.body.request_data,
        result: "ERROR",
        error: null
    }
    let promises = [];
    for (let i = 0; i < req.body.iteration; i++) {
        promises.push(push(process.env.LOAD_TEST_SQS_QUEUE_URL, req.body.request_data));
    }

    try {
        await Promise.all(promises);
        result.result = "SUCCESS"
    } catch (err: any) {
        result.error = err;
    }

    try {
        const loadTest = await LoadTest.create(result);
        return successWithData(loadTest, req, res);
    } catch (err) {
        return error(err, req, res);
    }

}
