/* eslint-disable */
import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { keyBy, random, mapValues } from 'lodash';
import sinon from 'sinon';
import generate from '../../testUtils/fixtures';
import Profiles from '../Profiles';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

describe('Profiles List', () => {
  let component;
  const profiles = generate('profile', 15);
  const skills = generate('skill', 5);
  const mockedProfiles = keyBy(profiles, 'username');
  const mockedSkills = keyBy(skills, 'name');
  let mockedActions;
  let profileListSpy;
  let skillListSpy;
  let clearSkillSpy;
  let routerSpy;
  let profileListBySkill;

  beforeEach(() => {
    profileListSpy = sinon.spy();
    skillListSpy = sinon.spy();
    clearSkillSpy = sinon.spy();
    routerSpy = sinon.spy();
    profileListBySkill = sinon.spy();
    mockedActions = {
      profileList: profileListSpy,
      skillList: skillListSpy,
      clearSkill: clearSkillSpy,
      profileListBySkill: profileListBySkill,
    };
    const context = {
      muiTheme: getMuiTheme()
    };
    const childContextTypes = {
      muiTheme: React.PropTypes.object
    };

    component = mount(
      <Profiles
        profiles={profiles}
        skills={skills}
        actions={mockedActions}
        router={routerSpy}
      />,
      {
        context,
        childContextTypes
      });
  });

  it('should render without problems', () => {
    expect(component).to.exist;
  });

  it('should render the list of profiles', () => {
    const listItems = component.find('UserCard');
    expect(listItems.length).to.equal(profiles.length);
  });

  it('should fetch the profiles lists if state is empty', () => {
    if (mockedProfiles.length === 0) {
      expect(profileListSpy.callCount).to.equal(1);
    } else {
      expect(profileListSpy.callCount).to.equal(0);
    }
  });
});
