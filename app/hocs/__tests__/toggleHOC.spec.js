/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import toggleHOC from '../toggleHOC';

describe('Toggle HOC', () => {
  let toggleComponent;

  beforeEach(() => {
    const ToggleComponent = toggleHOC(React.createClass({
      render() {
        return <div>Test</div>;
      }
    }));
    toggleComponent = shallow(<ToggleComponent />);
  });

  it('should export a function', () => {
    expect(toggleHOC).to.be.a('function');
  });

  it('should have the provided component rendered', () => {
    expect(toggleComponent.first().props()).to.have.property('getToggleState');
    expect(toggleComponent.first().props()).to.have.property('toggle');
    expect(toggleComponent.first().props()).to.have.property('toggleOn');
    expect(toggleComponent.first().props()).to.have.property('toggleOff');

    expect(toggleComponent.first().props().getToggleState).to.be.a('function');
    expect(toggleComponent.first().props().toggle).to.be.a('function');
    expect(toggleComponent.first().props().toggleOn).to.be.a('function');
    expect(toggleComponent.first().props().toggleOff).to.be.a('function');
  });

  describe('toggle', () => {
    it('should toggle the provided state', () => {
      const instance = toggleComponent.instance();
      expect(instance.state.customToggle).not.to.exist;
      instance.toggle('customToggle');
      expect(instance.state.customToggle).to.be.true;
      instance.toggle('customToggle');
      expect(instance.state.customToggle).to.be.false;
    });
  });

  describe('toggleOn', () => {
    it('should set true the provided toggle', () => {
      const instance = toggleComponent.instance();
      expect(instance.state.testOnToggle).not.to.exist;
      instance.toggleOn('testOnToggle');
      expect(instance.state.testOnToggle).to.be.true;
      instance.toggleOn('testToggle');
      expect(instance.state.testOnToggle).to.be.true;
    });
  });

  describe('toggleOff', () => {
    it('should set false the provided toggle', () => {
      const instance = toggleComponent.instance();
      expect(instance.state.testOffToggle).not.to.exist;
      instance.toggleOff('testOffToggle');
      expect(instance.state.testOffToggle).to.be.false;
      instance.toggleOff('testOffToggle');
      expect(instance.state.testOffToggle).to.be.false;
    });
  });
});
