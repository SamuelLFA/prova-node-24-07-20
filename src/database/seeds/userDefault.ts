import Knex from 'knex';

// eslint-disable-next-line import/prefer-default-export
export async function seed(knex: Knex): Promise<void> {
  await knex('users').insert([
    {
      id: '5e2a2ba8-c57f-4f22-b7d4-323104b2a897',
      name: 'admin',
      username: 'admin',
      email: 'admin@helpper.com',
    },
  ]);
}
