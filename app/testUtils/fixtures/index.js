import times from 'lodash/times';
import generateGoal from './goal';
import generateSkill from './skill';
import generateProfile from './profile';
import generatePath from './path';
import generateUser from './user';
import generateResource from './resource';
import generateVote from './vote';

const fixtures = {
  goal: generateGoal,
  skill: generateSkill,
  profile: generateProfile,
  path: generatePath,
  user: generateUser,
  resource: generateResource,
  vote: generateVote,
};

export default function generate(fixture, amount = 1, values) {
  return times(amount, () => fixtures[fixture](values));
}
