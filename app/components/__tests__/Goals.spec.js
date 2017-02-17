/* eslint-disable */
import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { keyBy, random } from 'lodash';
import sinon from 'sinon';
import generate from '../../testUtils/fixtures';
import Goals from '../Goals';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FloatingActionButton from 'material-ui/FloatingActionButton';

describe('Goals List', () => {
  let component;
  const goals = generate('goal', 15);
  const modalParameters =  {
    showModal: false,
    showSpinner: false,
    name: '',
    description: '',
    tags: [],
    icon: '',
    level: '',
  };
  let mockedActions;
  let fetchGoalsSpy;
  let routerSpy;
  let addGoalRequestSpy;
  let showAddGoalsModalSpy;
  let onSubmit;

  beforeEach(() => {
    fetchGoalsSpy = sinon.spy();
    routerSpy = sinon.spy();
    showAddGoalsModalSpy = sinon.spy();
    addGoalRequestSpy = sinon.spy();
    onSubmit = sinon.spy();
    mockedActions = {
      fetchGoals: fetchGoalsSpy,
      showAddGoalsModal: showAddGoalsModalSpy,
      addGoalRequest: addGoalRequestSpy
    };
    const context = {
      muiTheme: getMuiTheme()
    };
    const childContextTypes = {
      muiTheme: React.PropTypes.object
    };

    component = mount(
      <Goals
        list={goals}
        actions={mockedActions}
        addModalParameters={modalParameters}
        onSubmit={onSubmit}
      />,
      {
        context,
        childContextTypes
      });
  });

  it('should render without problems', () => {
    expect(component).to.exist;
  });

  it('should render the list of goals', () => {
    const listItems = component.find('GoalCard');
    expect(listItems.length).to.equal(goals.length);
  });

  it('should fetch the list of goals when components is mounted', () => {
    expect(fetchGoalsSpy.callCount).to.equal(1);
  });

  it('should render add goal button', () => {
    const addButton = component.find('FloatingActionButton');
    expect(addButton.length).to.equal(1);
  });

  it('should call the showAddGoalsModal action when we click the add button and send `showModal`' +
    ' parameter true', () => {
    const addButton = component.find('FloatingActionButton');
    addButton.props().onClick();
    expect(showAddGoalsModalSpy.callCount).to.equal(1);
    expect(showAddGoalsModalSpy.getCall(0).args[0]).to.equal(true);
  });
});
