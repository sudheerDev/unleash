import faker from 'faker';

export default function generateResource() {
  return {
    id: faker.random.uuid(),
    url: faker.name.title(),
    description: faker.name.title(),
    type: faker.name.title(),
  };
}
