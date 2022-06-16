const BodyError = require("../errors/BodyError");
const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");

const users = [
    {id: 1, name: "John", age: 20},
    {id: 2, name: "Mary", age: 30},
    {id: 3, name: "Peter", age: 40}
];

const getUserByName = (name) => {
    const user = users.find(user => user.name === name);
    if (!user) {
        throw new NotFoundError("User not found");
    }
    return user;
};

const validateBody = (name) => {
    if (!name || typeof name !== "string") {
        throw new BodyError("Name is required");
    }
}

module.exports = async (req, res) => {
    const responseJSON = {
        success: false,
        data: {},
        error: ""
    }
    try {
        const {name} = req.body;
        validateBody(name);

        const user = getUserByName(name);

        responseJSON.success = true;
        responseJSON.data = user;
        return res.status(200).json(responseJSON);
    } catch (e) {
        console.log(e);
        switch (true) {
            case e instanceof BadRequestError:
                responseJSON.error = e.message;
                return res.status(400).json(responseJSON);
            case e instanceof NotFoundError:
                responseJSON.error = e.message;
                return res.status(404).json(responseJSON);
            default:
                responseJSON.error = "Something went wrong";
                return res.status(500).json(responseJSON);
        }
    }
};
