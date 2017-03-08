/* eslint-disable */
import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import assign from 'lodash/assign';
import generate from '../../testUtils/fixtures';
import PathHeader from '../PathHeader';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


describe('PathHeader Component', () => {
  let path;
  let mockedActions;

  beforeEach(() => {
    path = generate('path')[0];
  });

  afterEach(() => {
    path = null;
    mockedActions = null;
  });

  function getComponent(props) {
    mockedActions = {
      pathsRemove: sinon.stub(),
      pathsRename: sinon.stub(),
    };
    const context = {
      muiTheme: getMuiTheme()
    };
    const childContextTypes = {
      muiTheme: React.PropTypes.object
    };

    const componentProps = assign({
      path,
      showActions: false,
      actions: mockedActions,
    }, props);

    return mount(<PathHeader {...componentProps} />, { context, childContextTypes });
  }

  it('should render without problems', () => {
    const component = getComponent();
    expect(component).to.exist;
  });

  it('should render the path name', () => {
    path.name = 'test path name';
    const component = getComponent();
    expect(component.text().trim()).to.equal(path.name);
  });

  it('should render not render actions if showActions is false', () => {
    const component = getComponent();
    expect(component.find('.pathActions').length).to.equal(0);
  });

  it('should render not render actions if showActions is true', () => {
    const component = getComponent({ showActions: true });
    expect(component.find('.pathActions').length).to.equal(1);
  });
});
