import React, { Component } from 'react';

function toggleHOC(WrappedComponent, initialToggleStates) {
  class Toggle extends Component {

    constructor(props) {
      super(props);
      this.state = initialToggleStates || {};
      this.getToggleState = this.getToggleState.bind(this);
      this.toggle = this.toggle.bind(this);
      this.toggleOn = this.toggleOn.bind(this);
      this.toggleOff = this.toggleOff.bind(this);
    }

    /**
     * retrieve state of provided toggle
     *
     * @param {String} toggleName
     * @returns {Boolean}
     */
    getToggleState(toggleName) {
      return !!this.state[toggleName];
    }

    /**
     * change state of provided toggle
     *
     * @param {String} toggleName
     * @returns {Undefined} undefined
     */
    toggle(toggleName) {
      this.setState({ [toggleName]: !this.state[toggleName] });
    }

    /**
     * change state of provided toggle to true
     *
     * @param toggleName
     * @returns {Undefined} undefined
     */
    toggleOn(toggleName) {
      this.setState({ [toggleName]: true });
    }

    /**
     * change state of provided toggle to false
     *
     * @param toggleName
     * @returns {Undefined} undefined
     */
    toggleOff(toggleName) {
      this.setState({ [toggleName]: false });
    }

    render() {
      const componentProps = {
        getToggleState: this.getToggleState,
        toggle: this.toggle,
        toggleOn: this.toggleOn,
        toggleOff: this.toggleOff,
      };

      return <WrappedComponent {...this.props} {...componentProps} />;
    }
  }

  return Toggle;
}

export default toggleHOC;
