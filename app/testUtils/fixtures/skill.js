import faker from 'faker';

export default function generateSkill() {
  return {
    id: faker.random.uuid(),
    name: faker.name.title(),
    resources: [],
    slug: faker.helpers.slugify(faker.name.title()),
  };
}
