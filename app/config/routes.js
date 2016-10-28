import React from 'react';
import UnleashApp from '../containers/UnleashApp';
import ProfilesContainer from '../containers/ProfilesContainer';
import PathContainer from '../containers/PathContainer';
import SkillsContainer from '../containers/SkillsContainer';
import SkillContainer from '../containers/SkillContainer';
import GoalsContainer from '../containers/GoalsContainer';
import CuratedPathsContainer from '../containers/CuratedPathsContainer';
import { Route } from 'react-router';

export default (
  <Route path="/" component={UnleashApp}>
    <Route path="/profiles" component={ProfilesContainer} />
    <Route path="/profiles/:userId" component={PathContainer} />
    <Route path="/skills" component={SkillsContainer} />
    <Route path="/skills/:slug" component={SkillContainer} />
    <Route path="/goals" component={GoalsContainer} />
    <Route path="/curated-paths" component={CuratedPathsContainer} />
  </Route>
);
