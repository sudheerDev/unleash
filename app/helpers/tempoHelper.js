import { pullAll, flatten } from 'lodash';

const day = 1000 * 60 * 60 * 24;
const week = day * 7;
const now = new Date().valueOf();

function getAllAchievedGoals(paths = { list: [] }) {
  return flatten(paths.list.map(path => path.goals))
          .filter(path => path.achieved);
}

function getAchievements(goals = [], startDate = new Date.valueOf() - week, endDate = new Date().valueOf()) {
  return goals.filter((goal) => {
    if ('achievedDate' in goal || 'dueDate' in goal) {
      const achievedDate = new Date(goal.achievedDate).valueOf() || new Date(goal.dueDate).valueOf();
      return achievedDate > startDate && achievedDate <= endDate;
    }
    return false;
  });
}

function getPoints(currentAchievements = 0, hasPriorAchievement = false) {
  if (currentAchievements === 0 && !hasPriorAchievement) {
    return -1;
  }
  return currentAchievements;
}

function getTempoHistory(paths = { list: [] }) {
  const tempo = [];

  let achievedGoals = getAllAchievedGoals(paths);

  const startTime = now - (day * 365);

  let currentTempo = 0;
  let currentAchievements;
  let hasPriorAchievement = false;

  for (let i = startTime; i < now; i += week) {
    currentAchievements = getAchievements(achievedGoals, i, i + week);
    achievedGoals = pullAll(achievedGoals, currentAchievements);

    currentTempo += getPoints(currentAchievements.length, hasPriorAchievement);
    hasPriorAchievement = currentAchievements.length > 0;

    tempo.push({ tempo: currentTempo });
  }

  return tempo;
}

export default { day, week, now, getAllAchievedGoals, getAchievements, getPoints, getTempoHistory };
