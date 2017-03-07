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
  let profile;
  let editable;
  let mockedActions;
  let pathsCreateSpy;
  let pathsRemoveSpy;
  let pathsRenameSpy;
  let routerSpy;

  beforeEach(() => {
    profile = generate('user')[0];
  });

  afterEach(() => {
    profile = null;
    editable = false;
    mockedActions = null;
    pathsCreateSpy = null;
    pathsRemoveSpy = null;
    routerSpy = null;
  });

  function getComponent(props) {
    pathsCreateSpy = sinon.spy();
    pathsRemoveSpy = sinon.spy();
    pathsRenameSpy = sinon.spy();
    routerSpy = {
      push: sinon.spy(),
      replace: sinon.spy(),
      go: sinon.spy(),
      goBack: sinon.spy(),
      goForward: sinon.spy(),
      setRouteLeaveHook: sinon.spy(),
      isActive: sinon.spy()
    };
    mockedActions = {
      pathsCreate: pathsCreateSpy,
      pathsRemove: pathsRemoveSpy,
      pathsRename: pathsRemoveSpy,
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
      profile: profile,
      userId: testId,
      location: location,
      router: routerSpy,
      editable: editable
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

  it('should render paths actions providing showActions true', () => {
    editable = true;
    const component = getComponent();
    component.find(PathHeader).forEach((pathHeader) => {
      expect(pathHeader.prop('showActions')).to.be.true;
    });
  });

  it('should not render paths actions providing showActions false', () => {
    const component = getComponent();
    component.find(PathHeader).forEach((pathHeader) => {
      expect(pathHeader.prop('showActions')).to.be.false;
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
