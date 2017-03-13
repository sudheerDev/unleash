import faker from 'faker';
import generateProfile from './profile';

export default function generateNews() {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  return {
    id: faker.random.uuid(),
    title: faker.name.title(),
    body: faker.lorem.paragraphs(),
    date: faker.date.between(today, yesterday),
    profile: generateProfile(),
  };
}
