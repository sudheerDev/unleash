/* eslint-disable */
import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Login from '../Login';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

describe('Login Component', () => {
  let userLoginProcess = sinon.spy();

  const createLoginComponent = (props) => {
    const context = {
      muiTheme: getMuiTheme()
    };
    const childContextTypes = {
      muiTheme: React.PropTypes.object
    };

    return mount(
      <Login userLoginProcess={userLoginProcess} {...props} />,
      {
        context,
        childContextTypes
      });
  };

  it('should render without problems', () => {
    const component = createLoginComponent();
    expect(component).to.exist;
  });

  it('should not render any message or action element until the authService is completed init', () => {
    const component = createLoginComponent({
      authServiceInit: false,
    });

    const messageElement = component.find('h1');
    const loginButton = component.find('button');
    const spinner = component.find('svg');

    expect(messageElement.length).to.equal(0);
    expect(loginButton.length).to.equal(0);
    expect(spinner.length).to.equal(0);
  });

  it('should render the login message and login button when the component is not in loading state', () => {
    const component = createLoginComponent({
      isLoading: false,
      authServiceInit: true,
    });

    const messageElement = component.find('h1');
    const loginButton = component.find('button');
    const spinner = component.find('svg');

    expect(messageElement.text()).to.equal('Unleash your potential');
    expect(loginButton.length).to.equal(1);
    expect(spinner.length).to.equal(0);
  });

  it('should render the loading message and spinner when the component is in loading state', () => {
    const component = createLoginComponent({
      isLoading: true,
      authServiceInit: true,
    });

    const messageElement = component.find('h1');
    const loginButton = component.find('button');
    const spinner = component.find('svg');

    expect(messageElement.text()).to.equal('Loading your superpowers');
    expect(loginButton.length).to.equal(0);
    expect(spinner.length).to.equal(1);
  });

  it('should call the userLoginProcess function on login button click', () => {
    const component = createLoginComponent({
      isLoading: false,
      authServiceInit: true,
    });
    const loginButton = component.find('button');
    loginButton.simulate('click');
    expect(userLoginProcess).to.have.property('callCount', 1)
  });
});
