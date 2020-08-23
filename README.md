# Back-end test

This project was developed using Node.js and TypeScript in order to demonstrate the ability to develop a REST API.

## Requisites
* [NodeJs]
* [PostgreSQL]

## Running the project

* Clone the repository using:
```
git clone git@github.com:SamuelLFA/prova-node-24-07-20.git
```
* Create a file named `.env` on the root of the project. Using as model the content of `.env.example`.

* In order to run the tests, create a PostgreSQL database and use the connection string to `.env`. With the connection string specified, you can run the tests with the command `npm test`.

* In order to run the development environment, create a PostgreSQL database and use the connection string to `.env`. Then, you need to run the migration with the command `npm run knex:migrate` and the seeds with `npm run knex:seed`. Now you are ready to make requests to the application running `npm run start`.

* Import the [collection] from [Postman]. Remember to login with the default user with the request body below:
```
{
    "username": "admin"
}
```
P.S: This user is inserted into the database with the seed.

## Contact
samuellfa3@gmail.com

### Thank you and best regards 👨‍💻

[NodeJs]: <https://nodejs.org/en/>
[PostgreSQL]: <https://www.postgresql.org/>
[Postman]: <https://www.postman.com/>
[collection]: <https://www.getpostman.com/collections/eb1f7ca9292728deb328>