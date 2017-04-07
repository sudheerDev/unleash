import faker from 'faker';

export default function generateVote() {
  return {
    authorId: faker.random.uuid(),
    vote: 1,
  };
}
