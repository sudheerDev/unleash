import React from 'react';
import UnleashApp from '../containers/UnleashApp';
import DashboardContainer from '../containers/DashboardContainer';
import ProfilesContainer from '../containers/ProfilesContainer';
import ProfileContainer from '../containers/ProfileContainer';
import SkillsContainer from '../containers/SkillsContainer';
import SkillContainer from '../containers/SkillContainer';
import GoalsContainer from '../containers/GoalsContainer';
import CuratedPathsContainer from '../containers/CuratedPathsContainer';
import ErrorContainer from '../containers/ErrorContainer';
import { Route, IndexRoute } from 'react-router';

export default (
  <Route>
    <Route path="/" component={UnleashApp}>
      <IndexRoute component={DashboardContainer} />
      <Route path="/profiles" component={ProfilesContainer} />
      <Route path="/profiles/:userId" component={ProfileContainer} />
      <Route path="/skills" component={SkillsContainer} />
      <Route path="/skills/:slug" component={SkillContainer} />
      <Route path="/goals" component={GoalsContainer} />
      <Route path="/curated-paths" component={CuratedPathsContainer} />
    </Route>
    <Route path="/error/:code" component={ErrorContainer} />
  </Route>
);
