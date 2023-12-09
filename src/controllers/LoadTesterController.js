const {successWithData, error} = require("../responses/APIResponse");
const {push} = require("../services/SQSService");

exports.create = (req, res) => {
    let promises = [];
    for (let i = 0; i < req.body.iteration; i++) {
        promises.push(push(process.env.LOAD_TEST_SQS_QUEUE_URL, req.body));
    }

    Promise.all(promises).then((result) => {
        return successWithData({message: "Load test(s) queued successfully"}, req, res);
    }).catch((err) => {
        error(err, req, res);
    })
}
