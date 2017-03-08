import faker from 'faker';
import random from 'lodash/random';
import times from 'lodash/times';

const generateGoal = () => ({
  id: faker.random.uuid(),
  name: faker.name.title(),
  description: faker.lorem.sentences(),
  level: 1,
  achieved: false,
  comments: [],
  unread: 0,
});

const generatePath = (userId) => {
  const goalCount = random(5) + 2;
  const goals = times(goalCount, generateGoal);
  return {
    userId,
    goals,
    id: faker.random.uuid(),
    name: faker.name.title(),
  };
};

export default generatePath;
