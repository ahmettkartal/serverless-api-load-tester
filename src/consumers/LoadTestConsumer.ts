import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const handler = async (event: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        const records: any[] = event.Records;
        const promises: Promise<AxiosResponse<any>>[] = [];

        for (const record of records) {
            const body = JSON.parse(record.body);
            const config: AxiosRequestConfig = {
                method: body.method,
                url: body.url,
                data: JSON.stringify(body.data),
                headers: body.headers
            };
            promises.push(axios.request(config));
        }

        Promise.all(promises).then((results) => {
            for (const result of results) {
                console.log({ data: result.data, status: result.status });
            }
            resolve(results);
        }).catch((err) => {
            console.log("err" + err);
            reject(err);
        });
    }).then((result) => {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "All requests sent successfully"
            })
        };
    }).catch((err) => {
        console.log("err" + err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Something went wrong"
            })
        };
    });
};