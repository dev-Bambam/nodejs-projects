class ValidationError extends CustomError{
    public details: string[];
    
    constructor(message: string, details: string[] = []) {
        super(message, 400, true);
        this.details = details;
        this.message = 'Validation Error'
    }
}