const axios = require('axios')

module.exports.handler = async (event) => {
    return new Promise((resolve, reject) => {
        let records = event.Records
        let promises = []

        for (let record of records) {
            let body = JSON.parse(record.body)
            promises.push(axios.get(body.target_url))
        }

        Promise.all(promises).then((result) => {
            console.log(result)
            resolve(result)
        }).catch((err) => {
            console.log("err" + err)
            reject(err)
        })
    }).then((result) => {
        return {
            statusCode: 200,
            body: JSON.stringify(
                {
                    message: "All requests sent successfully"
                }
            )
        }
    }).catch((err) => {
        console.log("err" + err)
        return {
            statusCode: 500,
            body: JSON.stringify(
                {
                    message: "Something went wrong"
                }
            )
        }
    })
}