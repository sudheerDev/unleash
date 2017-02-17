/* eslint-disable */
import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { keyBy, sampleSize, map } from 'lodash';
import sinon from 'sinon';
import generate from '../../testUtils/fixtures';
import Skill from '../Skill';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

describe('Skill Details', () => {
  let component;
  let mockedActions;
  let mockedRouter;
  const skills = generate('skill', 15);
  const profiles = generate('profile', 15);
  const mockedProfilesBySkill = map(sampleSize(profiles, 3), 'id');

  beforeEach(() => {
    mockedActions = {
      skillList: sinon.spy(),
      profileList: sinon.spy(),
      profileListBySkill: sinon.spy(),
      resourceAdd: sinon.spy(),
    }
    mockedRouter = {
      params: { slug: skills[0].slug }
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
        profiles={profiles}
        profilesBySkill={mockedProfilesBySkill}
        router={mockedRouter}
        params={mockedRouter.params}
        skillsLoading={false}
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
    expect(mockedActions.skillList.callCount).to.equal(1);
  });

  it('should fetch the profile list when component is mounted', () => {
    expect(mockedActions.profileList.callCount).to.equal(1);
  });

  it('should fetch the profile list by skill when component is mounted', () => {
    expect(mockedActions.profileListBySkill.callCount).to.equal(1);
  });

});
