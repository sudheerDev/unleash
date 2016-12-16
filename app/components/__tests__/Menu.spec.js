/* eslint-disable */
import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Menu from '../Menu';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

describe('Menu Component', () => {
  const userId = '12345ABCDEF';
  let component;
  let routerSpy;
  let userLogoutProcess;

  beforeEach(() => {
    routerSpy = {
      push: sinon.spy()
    };
    userLogoutProcess = sinon.spy();
    const context = {
      muiTheme: getMuiTheme()
    };
    const childContextTypes = {
      muiTheme: React.PropTypes.object
    };

    component = mount(
      <Menu
        userId={userId}
        router={routerSpy}
        userLogoutProcess={userLogoutProcess}
      />,
      {
        context,
        childContextTypes
      });
  });

  it('should render without problems', () => {
    expect(component).to.exist;
  });

  it('should change the page when a menu item is clicked', () => {
    const element = component.find('Menu');
    const expectedRoute = '/heroes/unleash';
    element.node.handleMenuClick(expectedRoute);
    expect(routerSpy.push.getCall(0).args[0]).to.equal(expectedRoute);
  });

  it('should change the page to my path', () => {
    const menuItem = component.find('MenuItem').filterWhere((element) => {
      return element.text() === 'My Path';
    });
    menuItem.props().onTouchTap();
    const expectedValue = `/profiles/${userId}`;
    expect(routerSpy.push.getCall(0).args[0]).to.equal(expectedValue);
  });

  it('should call the userLogoutProcess function', () => {
    const element = component.find('Menu');
    element.node.props.userLogoutProcess();
    expect(userLogoutProcess).to.have.property('callCount', 1)
  });
});
