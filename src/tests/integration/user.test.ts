import request, { Response } from 'supertest';
import * as faker from 'faker';
import server from '../../server';
import connection from '../../database/connection';
import config from '../../../knexfile';

async function login() {
  return (
    await request(server).post('/login').send({
      username: 'admin',
    })
  ).body.data.token;
}

const createNewUser = async (token: string): Promise<Response> => {
  return request(server)
    .post('/users')
    .send({
      name: faker.name.firstName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
    })
    .set({ Authorization: token });
};

describe('USERS', () => {
  beforeEach(async () => {
    await connection.migrate.rollback(config.test.migrations);
    await connection.migrate.latest(config.test.migrations);
    await connection.seed.run(config.test.seeds);
  });

  afterEach(() => {
    server.close();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('Should be able to create a new user', async () => {
    const token = await login();
    const response = await createNewUser(token);

    expect(response.status).toEqual(201);
    expect(response.body.error).toBeFalsy();
    expect(typeof response.body.data.id).toBe('string');
  });

  it('Should be able to list all users', async () => {
    const token = await login();
    await createNewUser(token);

    const response = await request(server)
      .get('/users')
      .send()
      .set({ Authorization: token });

    expect(response.status).toEqual(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it('Should be able to show a user', async () => {
    const token = await login();
    const { id } = (await createNewUser(token)).body.data;

    const response = await request(server)
      .get(`/users/${id}`)
      .send()
      .set({ Authorization: token });

    expect(response.status).toEqual(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeInstanceOf(Object);
  });

  it('Should be able to update a user', async () => {
    const token = await login();
    const { id } = (await createNewUser(token)).body.data;

    const response = await request(server)
      .get(`/users/${id}`)
      .send()
      .set({ Authorization: token });

    expect(response.status).toEqual(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeInstanceOf(Object);
  });

  it('Should be able to delete a user', async () => {
    const token = await login();
    const { id } = (await createNewUser(token)).body.data;

    const response = await request(server)
      .delete(`/users/${id}`)
      .send()
      .set({ Authorization: token });

    expect(response.status).toEqual(200);
    expect(response.body.error).toBeFalsy();
  });
});
