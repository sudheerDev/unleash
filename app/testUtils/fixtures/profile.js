import faker from 'faker';

export default function generateProfile() {
  return {
    id: faker.random.uuid(),
    username: faker.internet.userName(),
    fullName: faker.name.title(),
  };
}
