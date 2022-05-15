const {createServer} = require("http")
const {apiResolver} = require("next/dist/server/api-utils/node")
const request = require("supertest")

const createClient = async (handler, queryParams = {}, { host="http://localhost:3000/api"} = {}) => request(
    createServer(async (req, res) => {
        req.headers.host = host;
        return apiResolver(req, res, queryParams, handler, {}, undefined);
    })
)

module.exports = createClient;