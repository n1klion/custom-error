const http = require('http');
const router = require('./router');

const server = http.createServer()

const PORT = 3000;

class Request {
    constructor(req) {
        this.req = req;
        this.body = "";
    }

    async parseBody() {
        if (this.req.method !== "POST" || this.req.headers["content-type"] !== "application/json") {
            return Promise.resolve();
        }
        const buffer = [];
        for await (const chunk of this.req) {
            buffer.push(chunk);
        }

        const bodyString = Buffer.concat(buffer).toString();
        this.body = bodyString ? JSON.parse(bodyString): "";
    }

    static async create(req) {
        const request = new Request(req);
        await request.parseBody();
        return request;
    }
}

class Response {
    constructor(res) {
        this.res = res;
        this.res.setHeader("content-type", "application/json");
    }

    status(code) {
        this.res.statusCode = code;
        return this;
    }

    json(data) {
        this.res.end(JSON.stringify(data));
    }
}

server.on("request", async (req, res) => {
    const url = req.url;

    const request = await Request.create(req);
    const response = new Response(res);

    if (router.has(url)) {
        router.get(url)(request, response);
    } else {
        res.statusCode = 404;
        res.end("Not found");
    }
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
