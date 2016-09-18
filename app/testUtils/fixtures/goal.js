import faker from 'faker';

export default function generateGoal() {
  return {
    id: faker.random.uuid(),
    name: faker.name.title(),
    description: faker.lorem.sentence(),
    resources: [],
    slug: faker.helpers.slugify(faker.name.title()),
  };
}
