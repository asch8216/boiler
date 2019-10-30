const { User } = require('./server/db/models/users');
const { green, red } = require('chalk');
const db = require('./server/db/db');
const faker = require('faker');

const users = [
  {
    email: faker.internet.email(),
    password: '123456',
    imageUrl: faker.image.avatar()
  },
  {
    email: faker.internet.email(),
    password: faker.internet.password(),
    imageUrl: faker.image.avatar()
  },
  {
    email: faker.internet.email(),
    password: faker.internet.password(),
    imageUrl: faker.image.avatar()
  },
  {
    email: faker.internet.email(),
    password: faker.internet.password(),
    imageUrl: faker.image.avatar()
  },
  {
    email: faker.internet.email(),
    password: faker.internet.password(),
    imageUrl: faker.image.avatar()
  },
  {
    email: faker.internet.email(),
    password: faker.internet.password(),
    imageUrl: faker.image.avatar()
  }
];

const seed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(
      users.map(user => {
        return User.create(user);
      })
    );

    console.log(green('Seeding success!'));
    db.close();
  } catch (err) {
    console.error(red('Oh no! Something went wrong!'));
    console.error(err);
    db.close();
  }
};

seed();
module.exports = seed;
