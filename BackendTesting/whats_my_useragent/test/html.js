const app = require("../app");

const supertest = require("supertest");
const cheerio = require("cheerio");

describe("html response", function () {
    let request;
    beforeEach(function () {
        request = supertest(app)
            .get("/")
            .set("User-Agent", "my cool browser")
            .set("Accept", "text/html");
    });


    it("returns a html response", function (done) {
        request
            .expect("Content-Type", /html/)
            .expect(200)
            .end(done);
    });

    it("returns your User Agent", function (done) {
        request
            .expect(function (res) {
                const htmlResponse = res.text;
                const $ = cheerio.load(htmlResponse);
                const userAgent = $('.user-agent').html().trim();

                if (userAgent !== "my cool browser") {
                    throw new Error("Response does not contain User Agent");
                }
            })
            .end(done);
    });
});