class BadRequestError extends Error{
    constructor(message) {
        super(message);
        this.name = 'BadRequestError';
        this.message = message;
    }
}

module.exports = BadRequestError;
