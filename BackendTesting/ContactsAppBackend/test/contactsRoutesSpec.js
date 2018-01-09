import app  from  '../bin/www';

import supertest from 'supertest';

import chai from 'chai';
const should = chai.should();

describe('contact route tests', function() {
    let request;
    beforeEach(function () {
        request = supertest(app)
            .get("/contacts")
            .set("Accept", "application/json");
    });

    it("returns a json response", function (done) {
        request
            .expect("Content-Type", /json/)
            .expect(200)
            .end(done);
    });

    it("returns array of contacts", function (done) {
        request
            .expect(function (res) {
                let contacts = res.body;
                Array.isArray(contacts).should.be.true;
            })
            .end(done);
    });
});
