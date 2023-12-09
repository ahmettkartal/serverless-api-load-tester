const base_response = {
    "response_time" : Date.now()
}

const {log} = require('../helpers/LoggerHelper');
const {OK, NOT_FOUND, INTERNAL_SERVER_ERROR} = require('../common/enums/HTTPStatusCodes');

exports.success = (message, req, res) => {
    try {
        log("INFO", {
            request: {body: req.body, url: req.url, method: req.method}
        });
    } catch (err) {
        console.log("log err", err);
    }

    return res.status(OK).send({
        ...base_response,
        "is_complete": true,
        "message": message
    });
}

exports.successWithData = (data, req, res) => {
    try {
        log("INFO", {
            request: { body: req?.body, url: req?.url, method: req?.method }
        });
    } catch (err) {
        console.log("log err", err);
    }

    return res.status(OK).send({
        ...base_response,
        "is_complete": true,
        "data": data
    });
}

exports.error = (message, req, res) => {
    const is_debug = req.app.get('is_debug') || false;

    try {
        log("ERROR", {
            request: { body: req?.body, url: req?.url, method: req?.method },
            response: { message: message }
        });
    } catch (err) {
        console.log("log err", err);
    }

    let response = {};
    if (is_debug === "true") {
        response = {
            ...base_response,
            "is_complete": false,
            "error": {
                "code": "INTERNAL_SERVER_ERROR",
                "message": "Internal Server Error",
                "data": message
            }
        }
    } else {
        response = {
            ...base_response,
            "is_complete": false,
            "error": {
                "code": "INTERNAL_SERVER_ERROR",
                "message": "Internal Server Error"
            }
        }
    }

    return res.status(INTERNAL_SERVER_ERROR).send(response);
}

exports.notFound = (req, res) => {
    try {
        log("ERROR", {
            request: { body: req?.body, url: req?.url, method: req?.method },
            response: { message: "NOT FOUND" }
        });
    } catch (err) {
        console.log("log err", err);
    }

    return res.status(NOT_FOUND).send({
        ...base_response,
        "is_complete": false,
        "error": {
            "code": "NOT_FOUND",
            "message": "Not Found"
        }
    });
}