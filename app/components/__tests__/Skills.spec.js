/* eslint-disable */
import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { keyBy, random } from 'lodash';
import sinon from 'sinon';
import generate from '../../testUtils/fixtures';
import Skills from '../Skills';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

describe('Skills List', () => {
  let component;
  const skills = generate('skill', 15);
  const mockedSkills = { list: keyBy(skills, 'name') };
  const modalParameters = {
    showModal: false,
    showSpinner: false,
    name: '',
  };
  let mockedActions;
  let skillListSpy;
  let routerSpy;
  let showAddSkillModalSpy;

  beforeEach(() => {
    skillListSpy = sinon.spy();
    routerSpy = sinon.spy();
    showAddSkillModalSpy = sinon.spy();
    mockedActions = {
      skillList: skillListSpy,
      showAddSkillModal: showAddSkillModalSpy,
    };
    const router = {
      push: routerSpy,
    };
    const context = {
      muiTheme: getMuiTheme()
    };
    const childContextTypes = {
      muiTheme: React.PropTypes.object
    };

    component = mount(
      <Skills
        skills={mockedSkills}
        actions={mockedActions}
        router={router}
        addModalParameters={modalParameters}
      />,
      {
        context,
        childContextTypes
      });
  });

  it('should render without problems', () => {
    expect(component).to.exist;
  });

  it('should render the list of skills', () => {
    const listItems = component.find('ListItem');
    expect(listItems.length).to.equal(skills.length);
  });

  it('should fetch the list of skills when components is mounted', () => {
    expect(skillListSpy.callCount).to.equal(1);
  });

  it('should go to a skill page when a skill is selected', () => {
    const index = random(skills.length - 1);
    const skill = skills[index];
    const skillElement = component.find('Skills');
    skillElement.node.handleSkillSelect(skill.name);
    const expectedRoute = `/skills/${skill.name}`;
    expect(routerSpy.getCall(0).args[0]).to.equal(expectedRoute);
  });

  it('should render add goal button', () => {
    const addButton = component.find('FloatingActionButton');
    expect(addButton.length).to.equal(1);
  });

  it('should call the showAddSkillModal action when we click the add button and send `showModal`' +
    ' parameter true', () => {
    const addButton = component.find('FloatingActionButton');
    addButton.props().onClick();
    expect(showAddSkillModalSpy.callCount).to.equal(1);
    expect(showAddSkillModalSpy.getCall(0).args[0]).to.equal(true);
  });
});
