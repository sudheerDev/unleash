/* eslint-disable */
import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { assign, keyBy, random, forEach, keys } from 'lodash';
import sinon from 'sinon';
import generate from '../../testUtils/fixtures';
import Paths from '../Path';
import PathHeader from '../PathHeader';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

describe('Path Component', () => {
  const testId = 'testId';
  const paths = { list: generate('path', 5, testId) };
  const location = { pathname: `/profiles/${testId}` };
  let loggedInUser;
  let mockedActions;
  let pathsCreateSpy;
  let pathsRemoveSpy;
  let routerSpy;

  beforeEach(() => {
    loggedInUser = generate('user')[0];
  });

  afterEach(() => {
    loggedInUser = null;
    mockedActions = null;
    pathsCreateSpy = null;
    pathsRemoveSpy = null;
    routerSpy = null;
  });

  function getComponent(props) {
    pathsCreateSpy = sinon.spy();
    pathsRemoveSpy = sinon.spy();
    routerSpy = sinon.spy();
    mockedActions = {
      pathsCreate: pathsCreateSpy,
      pathsRemove: pathsRemoveSpy,
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

    const componentProps = assign({
      params: params,
      actions: mockedActions,
      paths: paths,
      loggedInUser: loggedInUser,
      userId: testId,
      location: location,
      router: router,
      editable: {false}
    }, props);

    return mount(<Paths {...componentProps} />, { context, childContextTypes });
  }

  it('should render without problems', () => {
    const component = getComponent();
    expect(component).to.exist;
  });

  it('should render the list of paths', () => {
    const component = getComponent();
    const pathItems = component.find('.pathHeader');
    expect(pathItems.length).to.equal(paths.list.length);
  });

  it('should render paths providing showActions false if user is not admin or owner', () => {
    loggedInUser.isAdmin = false;
    loggedInUser.id = testId + '1';
    const component = getComponent();
    component.find(PathHeader).forEach((pathHeader) => {
      expect(pathHeader.prop('showActions')).to.be.false;
    });
  });

  it('should render paths providing showActions true if user is admin', () => {
    loggedInUser.isAdmin = true;
    loggedInUser.id = testId + '1';
    const component = getComponent();
    component.find(PathHeader).forEach((pathHeader) => {
      expect(pathHeader.prop('showActions')).to.be.true;
    });
  });

  it('should render paths providing showActions false if user is admin', () => {
    loggedInUser.isAdmin = false;
    loggedInUser.id = testId;
    const component = getComponent();
    component.find(PathHeader).forEach((pathHeader) => {
      expect(pathHeader.prop('showActions')).to.be.true;
    });
  });

  it('should render the list of goals', () => {
    const component = getComponent();
    const goalsItems = component.find('GoalCard');
    let goalsLength = 0;
    forEach(paths.list, path => {
      goalsLength += path.goals.length;
    });
    expect(goalsItems.length).to.equal(goalsLength);
  });
});
