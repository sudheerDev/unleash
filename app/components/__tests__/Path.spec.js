/* eslint-disable */
import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { keyBy, random, forEach, keys } from 'lodash';
import sinon from 'sinon';
import generate from '../../testUtils/fixtures';
import Paths from '../Path';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

describe('Path Component', () => {
  const testId = 'testId';
  const paths = {
    list: generate('path', 5, testId),
  };
  const location = {
    pathname: `/profiles/${testId}`
  };
  let component;
  let mockedActions;
  let pathsListSpy;
  let routerSpy;

  beforeEach(() => {
    pathsListSpy = sinon.spy();
    routerSpy = sinon.spy();
    mockedActions = {
      pathsList: pathsListSpy,
    };
    const router = {
      push: routerSpy,
    };
    const params = {
      userId: testId
    };
    const context = {
      muiTheme: getMuiTheme()
    };
    const childContextTypes = {
      muiTheme: React.PropTypes.object
    };

    component = mount(
      <Paths
        params={params}
        actions={mockedActions}
        paths={paths}
        location={location}
        router={router}
      />,
      {
        context,
        childContextTypes
      });
  });

  it('should render without problems', () => {
    expect(component).to.exist;
  });

  it('should render the list of paths', () => {
    const pathItems = component.find('.pathHeader');
    expect(pathItems.length).to.equal(paths.list.length);
  });

  it('should render the list of goals', () => {
    const goalsItems = component.find('GoalCard');
    let goalsLength = 0;
    forEach(paths.list, path => {
      goalsLength += path.goals.length;
    });
    expect(goalsItems.length).to.equal(goalsLength);
  });
});
