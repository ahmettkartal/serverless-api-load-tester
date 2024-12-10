export const log = function (logType: string, logData: any) {
    switch (logType) {
        case "INFO":
            console.log(JSON.stringify({type: "INFO", ...logData}));
            break;
        case "ERROR":
            console.error(JSON.stringify({type: "ERROR", ...logData}));
            break;
        case "WARN":
            console.warn(JSON.stringify({type: "WARN", ...logData}));
            break;
        default:
            console.log(JSON.stringify({type: "DEFAULT", ...logData}));
    }
}