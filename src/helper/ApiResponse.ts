export default class APIResponse {
    public success: boolean;
    public message: string;
    public data?: any;
    public error?: any;

    constructor(success: boolean, message: string, data?: any, error?: any) {   
        this.success = success;
        this.message = message;
        if (data !== undefined) {
            this.data = data
        }
        if (error !== undefined) {
            this.error = error
        }
    }

    static success(message: string, data?: any): APIResponse {
        return new APIResponse(true, message, data);
    }

    static error(message: string, error?: any): APIResponse {
        return new APIResponse(false, message, undefined, error);
    }
}