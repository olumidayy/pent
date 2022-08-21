import request from 'supertest';
import app from '../src/app';

describe('GET /api', () => {
  it('returns a 200.', async () => {
    const result = await request(app).get('/api');
    expect(result.status).toEqual(200);
    expect(result.body.success).toEqual(true);
    expect(result.body.message).toEqual("Welcome to Olumide's attempt at Pario Solutions' challenge.");
    expect(result.body.code).toEqual(200);
    expect(result.statusCode).toEqual(200);
  });
});
