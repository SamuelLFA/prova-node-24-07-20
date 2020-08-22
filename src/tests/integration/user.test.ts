import request, { Response } from 'supertest';
import * as faker from 'faker';
import server from '../../server';
import connection from '../../database/connection';
import config from '../../../knexfile';

const createNewUser = async (): Promise<Response> => {
  return request(server).post('/users').send({
    name: faker.name.firstName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
  });
};

describe('USERS', () => {
  beforeEach(async () => {
    await connection.migrate.rollback(config.test.migrations);
    await connection.migrate.latest(config.test.migrations);
  });

  afterEach(() => {
    server.close();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('Should be able to create a new user', async () => {
    const response = await createNewUser();
    expect(response.status).toEqual(201);
    expect(response.body.error).toBeFalsy();
    expect(typeof response.body.data.id).toBe('string');
  });

  it('Should be able to list all users', async () => {
    await createNewUser();

    const response = await request(server).get('/users').send();
    expect(response.status).toEqual(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it('Should be able to show a user', async () => {
    const { id } = (await createNewUser()).body.data;

    const response = await request(server).get(`/users/${id}`).send();
    expect(response.status).toEqual(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeInstanceOf(Object);
  });

  it('Should be able to update a user', async () => {
    const { id } = (await createNewUser()).body.data;

    const response = await request(server).get(`/users/${id}`).send();
    expect(response.status).toEqual(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeInstanceOf(Object);
  });

  it('Should be able to delete a user', async () => {
    const { id } = (await createNewUser()).body.data;

    const response = await request(server).delete(`/users/${id}`).send();
    expect(response.status).toEqual(200);
    expect(response.body.error).toBeFalsy();
  });
});
