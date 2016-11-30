/* eslint-disable */
import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import generate from '../../testUtils/fixtures';
import UserCard from '../UserCard';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

describe('User Card', () => {
  let component;
  const user = generate('profile')[0];
  let routerSpy;

  beforeEach(() => {
    routerSpy = sinon.spy();
    const context = {
      muiTheme: getMuiTheme()
    };
    const childContextTypes = {
      muiTheme: React.PropTypes.object
    };
    const router = {
      push: routerSpy,
    };

    component = mount(
      <UserCard user={user} router={router} />,
      {
        context,
        childContextTypes
      });
  });

  it('should render without problems', () => {
    expect(component).to.exist;
  });

  it('should go to the profile page when clicked', () => {
    const userElement = component.find('UserCard');
    userElement.node.handleProfileSelect(user.id);
    const expectedRoute = `/profiles/${user.id}`;
    expect(routerSpy.getCall(0).args[0]).to.equal(expectedRoute);
  });
});
