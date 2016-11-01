/* eslint-disable */
import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { keyBy, random } from 'lodash';
import sinon from 'sinon';
import generate from '../../testUtils/fixtures';
import Goals from '../Goals';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

describe('Goals List', () => {
  let component;
  const goals = generate('goal', 15);
  const mockedData = { list: goals };
  let mockedActions;
  let fetchGoalsSpy;
  let routerSpy;

  beforeEach(() => {
    fetchGoalsSpy = sinon.spy();
    routerSpy = sinon.spy();
    mockedActions = {
      fetchGoals: fetchGoalsSpy,
    };
    const context = {
      muiTheme: getMuiTheme()
    };
    const childContextTypes = {
      muiTheme: React.PropTypes.object
    };

    component = mount(
      <Goals
        goals={mockedData}
        actions={mockedActions}
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
});
