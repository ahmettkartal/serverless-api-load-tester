export default interface LoadTestResult {
    iteration: number;
    request_data: object;
    result: "SUCCESS" | "ERROR";
    error: string | null;
}