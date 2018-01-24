const supertest = require('supertest');
const chai = require('chai');
const app = require('../bin/www');
const auth = require('../routes/auth');
const expect = chai.expect;
const authKey = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTY3YWNlNWUxOTllNjE5NzQzMGJlYjYiLCJ1c2VybmFtZSI6Im5ld3VzZXIiLCJmaXJzdCI6Ik5ldyIsImxhc3QiOiJVc2VyIiwiZXhwIjoxNTE2ODMwMzA5LCJpYXQiOjE1MTY3NDM5MDl9.ldirmPpSoKsihY6wvvz9i9R3uAmrI1MUYscG23DHLg8';

describe('/book-reviews', function (done) {

    let request;

    it('Returns all the book-reviews', function () {
        request = supertest(app)
            .get('/book-reviews')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(done);
    });

    it('Creates a new book-review', function () {
        request = supertest(app)
            .post('/book-reviews')
            .set('Authorization', authKey)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                rating: '5',
                body: 'temp body',
                reviewer: 'test me',
                book: '9781617292422'
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(done);
    });

    it('Fails to create a new book with no authorization', function () {
        request = supertest(app)
            .post('/book-reviews')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                rating: '5',
                body: 'temp body',
                reviewer: 'test me',
                book: '9781617292422'
            })
            .expect('Content-Type', /json/)
            .expect(401)
            .end(done);
    });

    it('Fails to create a new book-review with missing field', function () {
        request = supertest(app)
            .post('/book-reviews')
            .set('Authorization', authKey)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                body: 'temp body',
                reviewer: 'test me',
                book: '9781617292422'
            })
            .expect('Content-Type', /json/)
            .expect(400)
            .end(done);
    });
});

describe('/book-reviews:id', function (done) {

    let request;

    it('Gets the book-review with the given :id', function () {
        request = supertest(app)
            .get('/book-reviews/5a56d7733c2a5c7279332988')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(done);
    });

    it('Fails to get the book-review with the given :id', function () {
        request = supertest(app)
            .get('/book-reviews/5a56d7733c2a5c7279332988adslf5')
            .set('Accept', 'application/json')
            .expect(404)
            .expect('Content-Type', /json/)
            .end(done);
    });

    it('Updates the book-review with the given :id', function () {
        request = supertest(app)
            .put('/book-reviews/5a56d7733c2a5c7279332988')
            .set('Authorization', authKey)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                rating: 4,
                body: 'put body',
                reviewer: 'put me',
                book: '9781617292422'
            })
            .expect(200)
            .end(done);
    });

    it('Fails to update the book-review with incorrect :id', function () {
        request = supertest(app)
            .put('/book-reviews/5a56d7733c2a5c7279332988aladsfj')
            .set('Authorization', authKey)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                rating: 4,
                body: 'put body',
                reviewer: 'put me',
                book: '9781617292422'
            })
            .expect(404)
            .end(done);
    });

    it('Fails to update the book-review with missing field', function() {
        request = supertest(app)
            .put('/book-reviews/5a56d7733c2a5c7279332988')
            .set('Authorization', authKey)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                body: 'put body',
                reviewer: 'put me',
                book: '9781617292422'
            })
            .expect(404)
            .end(done);
    });

    it('Fails to update the book-review with no authorization', function () {
        request = supertest(app)
            .put('/book-reviews/5a56d7733c2a5c7279332988')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                rating: 4,
                body: 'put body',
                reviewer: 'put me',
                book: '9781617292422'
            })
            .expect(401)
            .end(done);
    });

    it('Fails to delete the book-review with the given :id', function () {
        request = supertest(app)
            .delete('/book-reviews/5a56d7733c2a5c7279332988')
            .set('Authorization', authKey)
            .expect('Content-Type', /json/)
            .expect(403)
            .end(done);
    });

    it('Fails to delete the book-review with the given :id with no authorization', function () {
        request = supertest(app)
            .delete('/book-reviews/5a56d7733c2a5c7279332988')
            .expect('Content-Type', /json/)
            .expect(401)
            .end(done);
    });

});