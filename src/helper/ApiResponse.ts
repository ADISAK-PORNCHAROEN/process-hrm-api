export default class APIResponse {
    public success: boolean;
    public message: string;
    public data?: any;

    constructor(success: boolean, message: string, data?: any) {
        this.success = success;
        this.message = message;
        if (data !== undefined) {
            this.data = data
        }
    }

    static success(message: string, data?: any): APIResponse {
        return new APIResponse(true, message, data);
    }

    static error(message: string): APIResponse {
        return new APIResponse(false, message);
    }
}