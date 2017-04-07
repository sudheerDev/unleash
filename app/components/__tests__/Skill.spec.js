/* eslint-disable */
import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sampleSize from 'lodash/sampleSize';
import map from 'lodash/map';
import sinon from 'sinon';
import generate from '../../testUtils/fixtures';
import Skill from '../Skill';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

describe('Skill Details', () => {
  let component;
  let mockedActions;
  let mockedParams;
  let routerSpy;
  const skills = generate('skill', 15);
  const profiles = generate('profile', 15);
  const resources = generate('resource', 15);
  const votes = generate('vote', 15);
  const mockedUserId = 'test';
  const mockedProfilesBySkill = map(sampleSize(profiles, 3), 'id');
  const skillListPromise = sinon.spy()

  beforeEach(() => {
    skillListPromise.reset()
    mockedActions = {
      skillList: () => ({
        then: skillListPromise
      }),
      resourceList: sinon.spy(),
      profileList: sinon.spy(),
      voteList: sinon.spy(),
      profileListBySkill: sinon.spy(),
      resourceAdd: sinon.spy(),
      resourceAddVote: sinon.spy(),
    }
    routerSpy = {
      push: sinon.spy(),
      replace: sinon.spy(),
      go: sinon.spy(),
      goBack: sinon.spy(),
      goForward: sinon.spy(),
      setRouteLeaveHook: sinon.spy(),
      isActive: sinon.spy()
    }
    mockedParams = {
      slug: skills[0].slug
    }
    const context = {
      muiTheme: getMuiTheme()
    }
    const childContextTypes = {
      muiTheme: React.PropTypes.object
    }

    component = mount(
      <Skill
        actions={mockedActions}
        skills={skills}
        resources={resources}
        profiles={profiles}
        votes={votes}
        profilesBySkill={mockedProfilesBySkill}
        router={routerSpy}
        params={mockedParams}
        userId={mockedUserId}
        skillsLoading={false}
        resourcesLoading={false}
        profilesLoading={false}
        bySkillLoading={false}
      />,
      {
        context,
        childContextTypes
      });
  });

  it('should render without problems', () => {
    expect(component).to.exist;
  });

  it('should render the list of skilled profiles', () => {
    const listItems = component.find('UserCard');
    expect(listItems.length).to.equal(mockedProfilesBySkill.length);
  });

  it('should fetch the skill list when component is mounted', () => {
    expect(skillListPromise.callCount).to.equal(1);
  });

  it('should fetch the profile list when component is mounted', () => {
    expect(mockedActions.profileList.callCount).to.equal(1);
  });

  it('should fetch the profile list by skill when component is mounted', () => {
    expect(mockedActions.profileListBySkill.callCount).to.equal(1);
  });

});
