const createClient = require("../../utils/httpClient")
const userTasks = require("../../../pages/api/user/tasks")
const {getSession} = require("next-auth/client");
jest.mock("next-auth/client");
let insertId;

describe("user tasks API tests", () => {
    it("GET -/api/user/tasks route", async () => {
        getSession.mockReturnValue(
            Promise.resolve({
                user: {
                    name: "9999999999",
                },
                expires: "2022-05-21T05:43:22.574Z",
            })
        );
        const client = await createClient(userTasks);
        const response = await client.get("/user/tasks");
        expect(response.status).toBe(200);
    })
    it("POST -/api/user/tasks route", async () => {
        getSession.mockReturnValue(
            Promise.resolve({
                user: {
                    name: "9999999999",
                },
                expires: "2022-05-21T05:43:22.574Z",
            })
        );
        const client = await createClient(userTasks);
        const response = await client.post("/user/tasks").send({
            task: "todo item",
        })
        insertId = response.body.response.insertId;
        expect(response.status).toBe(201);
    })
    it("PATCH -/api/user/tasks route", async () => {
        getSession.mockReturnValue(
            Promise.resolve({
                user: {
                    name: "9999999999",
                },
                expires: "2022-05-21T05:43:22.574Z",
            })
        );
        const client = await createClient(userTasks);
        const response = await client.patch("/user/tasks").send({
            task: "todo item",
            taskId: 1
        })
        insertId = response.body.response.insertId;
        expect(response.status).toBe(201);
    })
    it("DELETE -/api/user/tasks route", async () => {
        getSession.mockReturnValue(
            Promise.resolve({
                user: {
                    name: "9999999999",
                },
                expires: "2022-05-21T05:43:22.574Z",
            })
        );
        const client = await createClient(userTasks);
        const response = await client.delete("/user/tasks").send({
            taskId: insertId
        });
        expect(response.status).toBe(201);
    })
}) 