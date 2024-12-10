import {Request, Response} from 'express';
import {HTTPStatusCodes} from '../common/enums/HTTPStatusCodes'
import {log} from '../helpers/LoggerHelper'

const base_response = {
    "application": process.env.APPLICATION,
    "api_version": process.env.VERSION,
    "response_time": Date.now()
}

export const error = (err: any, req: Request, res: Response) => {
    try {
        log("ERROR", {
            request: {body: req.body, url: req.originalUrl, method: req.method},
            error: err?.message
        });
    } catch (err) {
        console.log("log err", err);
    }

    return res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).send({
        ...base_response,
        "is_complete": false,
        "error": {
            "code": "INTERNAL_SERVER_ERROR",
            "message": err.message
        }
    });
}

export const successWithNoData = (req: Request, res: Response) => {
    try {
        log("INFO", {
            request: {body: req.body, url: req.originalUrl, method: req.method}
        });
    } catch (err) {
        console.log("log err", err);
    }

    return res.status(HTTPStatusCodes.NO_CONTENT).send();
}

export const successWithMessage = (req: Request, res: Response) => {
    try {
        log("INFO", {
            request: {body: req.body, url: req.originalUrl, method: req.method}
        });
    } catch (err) {
        console.log("log err", err);
    }

    return res.status(HTTPStatusCodes.OK).send({
        ...base_response,
        "is_complete": true,
        "data": {
            "message": "Process is completed successfully"
        }
    });
}

export const successWithData = (data: any, req: Request, res: Response) => {
    try {
        log("INFO", {
            request: {body: req.body, url: req.originalUrl, method: req.method}
        });
    } catch (err) {
        console.log("log err", err);
    }

    return res.status(HTTPStatusCodes.OK).send({
        ...base_response,
        "is_complete": true,
        "data": data
    });
}

export const successWithPagination = (data: any, total: number, req: Request, res: Response) => {
    try {
        log("INFO", {
            request: {body: req.body, url: req.originalUrl, method: req.method}
        });
    } catch (err) {
        console.log("log err", err);
    }

    return res.status(HTTPStatusCodes.OK).send({
        ...base_response,
        "is_complete": true,
        "total_count": total,
        "per_page": req.app.get("per_page"),
        "page": req.app.get("page"),
        "data": data
    });
}

export const notFound = (req: Request, res: Response) => {
    try {
        log("ERROR", {
            request: {body: req.body, url: req.originalUrl, method: req.method}
        });
    } catch (err) {
        console.log("log err", err);
    }

    return res.status(HTTPStatusCodes.NOT_FOUND).send({
        ...base_response,
        "is_complete": false,
        "error": {
            "code": "NOT_FOUND",
            "message": "Not Found"
        }
    });
}

export const unProcessableEntity = (req: Request, res: Response) => {
    try {
        log("ERROR", {
            request: {body: req.body, url: req.originalUrl, method: req.method}
        });
    } catch (err) {
        console.log("log err", err);
    }

    return res.status(HTTPStatusCodes.UNPROCESSABLE_ENTITY).send({
        ...base_response,
        "is_complete": false,
        "error": {
            "code": "UNPROCESSABLE_ENTITY",
            "message": "Unprocessable Entity"
        }
    });
}

export const authorizationFailed = (req: Request, res: Response) => {
    try {
        log("ERROR", {
            request: {body: req.body, url: req.originalUrl, method: req.method}
        });
    } catch (err) {
        console.log("log err", err);
    }

    return res.status(HTTPStatusCodes.UNAUTHORIZED).send({
        ...base_response,
        "is_complete": false,
        "error": {
            "code": "INVALID_AUTHORIZATION",
            "message": "Authorization Failed"
        }
    });
}