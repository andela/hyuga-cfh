var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  faker = require('faker');

exports.user = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
  password: faker.internet.password()
};

exports.article = {
  title: faker.company.catchPhrase(),
  content: faker.lorem.paragraph(),
  user: new User(this.user)
};