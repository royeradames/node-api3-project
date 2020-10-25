const server = require("../server")
const request = require("supertest")
const prepTestDB = require("../helpers/prepTestDB")
const restrict = require("../middleware/restrict")
//mocks the restricition middleware
// uses the __mock__ file name restrict instead of the one is calling for
jest.mock("../middleware/restrict")


beforeEach(prepTestDB)
beforeEach(() => restrict.mockClear())
describe("users", () => {
    it("get /", async () => {
        restrict.mockImplementationOnce((req, res, next) => {
            console.log("I ran this test")
            req.user = { id: 1 }
            next()
        })
        const res = await request(server)
            .get("/users/")
        expect(res.status).toBe(200)
        expect(restrict).toBeCalled()
    })
    it("get /:id", async () => {
        const res = await request(server)
            .get("/users/1")
        expect(res.status).toBe(200)
        expect(restrict).not.toBeCalled()
    })
    it("get /:id 400", async () => {
        const res = await request(server)
            .get("/users/not_an_id")
        expect(res.status).toBe(400)
        expect(restrict).not.toBeCalled()
    })
})