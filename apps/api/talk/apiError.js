export class ApiError extends Error {
    /**
     * @param {number} errorCode http compliant status code
     * @param {string} message
     */
    constructor(errorCode, message) {
        super(message);
        this.errorCode = errorCode;
    }
}