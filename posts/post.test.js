const server = require("../server")
const request = require("supertest")
const prepTestDB = require("../helpers/prepTestDB")

beforeEach(prepTestDB)

describe("post", () => {
    it("get /", async () => {
        const res = await request(server)
            .get("/posts/")
        expect(res.status).toBe(200)
    })
})