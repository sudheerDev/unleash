import faker from 'faker';

export default function generateUser() {
  return {
    id: faker.random.uuid(),
    fullName: faker.name.title(),
    isAdmin: faker.random.boolean(),
    picture: faker.image.imageUrl(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
  };
}
