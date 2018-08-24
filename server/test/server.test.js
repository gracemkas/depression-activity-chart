let app = require('../server');
let testServer = require('supertest');

//integration test
describe('testing our express apis', () => {
    test('the /user route returns a 403 when unauthenticated', async () => {
        let response = await testServer(app).get('/api/user');
        expect(response.statusCode).toBe(418);
    });
});

