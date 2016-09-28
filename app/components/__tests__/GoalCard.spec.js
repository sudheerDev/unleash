/* eslint-disable */
import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import generate from '../../testUtils/fixtures';
import GoalCard from '../GoalCard';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

describe('Goal Card', () => {
  let component;
  let goalData;

  beforeEach(() => {
    goalData = generate('goal')[0];
    const context = {
      muiTheme: getMuiTheme()
    };
    const childContextTypes = {
      muiTheme: React.PropTypes.object
    };

    component = mount(
      <GoalCard goal={goalData} />,
      {
        context,
        childContextTypes
      });
  });

  it('should render without problems', () => {
    expect(component).to.exist;
  });

  it('should render the goal', () => {
    expect(component.find('Paper')).to.exist;
  });

  describe('description dialog', () => {
    it('should toggle dialog state when touchTap event is fired', () => {
      const childComponent = component.find('Paper');
      expect(component.state().dialog).not.to.exist;
      childComponent.props().onTouchTap();
      expect(component.state().dialog).to.be.true;
    });

    it('should render a dialog when dialog state is true', () => {
      const childComponent = component.find('Paper');
      expect(component.find('Dialog').props().open).to.be.false;
      childComponent.props().onTouchTap();
      expect(component.find('Dialog').props().open).to.be.true;
      expect(component.find('Dialog').props().children).to.equal(goalData.description);
    });
  });
});
