import { combineReducers } from 'redux';
import announcementsReducer from './announcementsReducer';
import newsReducer from './newsReducer';
import skillsReducer from './skillsReducer';
import profilesBySkillReducer from './profilesBySkillReducer';
import goalsReducer from './goalsReducer';
import profilesReducer from './profilesReducer';
import pathsReducer from './pathsReducer';
import userReducer from './userReducer';
import curatedPathsReducer from './curatedPathsReducer';
import notificationsReducer from './notificationsReducer';

const rootReducer = combineReducers({
  announcements: announcementsReducer,
  news: newsReducer,
  skills: skillsReducer,
  profilesBySkill: profilesBySkillReducer,
  goals: goalsReducer,
  profiles: profilesReducer,
  paths: pathsReducer,
  user: userReducer,
  notifications: notificationsReducer,
  curatedPaths: curatedPathsReducer
});

export default rootReducer;
