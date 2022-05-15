const createClient = require("../../utils/httpClient")
const password = require("../../../pages/api/user/change-password")
const {getSession} = require("next-auth/client");
jest.mock("next-auth/client");
jest.setTimeout(10000);
describe("user tasks API tests", () => {
    it("PATCH -/api/user/change-password route", async () => {
        getSession.mockReturnValue(
            Promise.resolve({
                user: {
                    name: "9999999999",
                },
                expires: "2022-05-21T05:43:22.574Z",
            })
        );
        const client = await createClient(password);
        const response = await client.patch("/user/change-password").send({
            newPassword: "password@123",
            oldPassword: "password123"
        })
        expect(response.status).toBe(201);
    })

}) 