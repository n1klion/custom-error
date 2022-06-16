const BadRequestError =  require("./BadRequestError");

class BodyError extends BadRequestError {
    constructor(message) {
        super(message);
        this.name = "BodyError";
        this.message = message;
    }
}

module.exports = BodyError;
