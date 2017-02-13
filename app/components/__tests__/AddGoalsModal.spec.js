import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import _ from 'lodash';
import sinon from 'sinon';
import AddGoalsModal from '../AddGoalsModal';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

describe('Add Goals Modal', () => {
  let component;
  const modalParameters = {
    showModal: true,
    showSpinner: false,
    name: '',
    description: '',
    tags: [],
    icon: '',
    level: '',
  };
  const tags = ['react', 'wordpress', 'php', 'node'];

  let mockedActions;
  let updateAddGoalsFieldSpy;

  const renderAddGoalsModal = (options = {}, props = {}) => {
    updateAddGoalsFieldSpy = sinon.spy();
    mockedActions = {
      updateAddGoalsField: updateAddGoalsFieldSpy,
    };

    const context = {
      muiTheme: getMuiTheme()
    };
    const childContextTypes = {
      muiTheme: React.PropTypes.object
    };

    const defaultProps = {
      tagsOptions: tags,
      actions: mockedActions,
      parameters: _.assign(modalParameters, options)
    };

    component = shallow(<AddGoalsModal {...defaultProps} {...props} />, {
      context,
      childContextTypes
    });
  };

  it('should render without problems', () => {
    renderAddGoalsModal();
    expect(component).to.exist; // eslint-disable-line
  });

  it('should render the three textfield component to fill the new goal', () => {
    renderAddGoalsModal();
    const textFields = component.find('TextField');
    expect(textFields.length).to.equal(3);
  });

  it('should render icon select component', () => {
    renderAddGoalsModal();
    const iconSelector = component.find('IconSelector');
    expect(iconSelector.length).to.equal(1);
  });

  it('should render icon select component', () => {
    renderAddGoalsModal();
    const iconSelector = component.find('IconSelector');
    expect(iconSelector.length).to.equal(1);
  });

  it('should render chip component for the tags', () => {
    renderAddGoalsModal();
    const chipInput = component.find('ChipInput');
    expect(chipInput.length).to.equal(1);
  });

  it('should not render the dueDate field if withPath prop is not provided', () => {
    renderAddGoalsModal();
    const dueDateField = component.find('DatePicker');
    expect(dueDateField.length).to.equal(0);
  });

  it('should render the dueDate field if withPath prop is true', () => {
    renderAddGoalsModal({ paths: [] }, { withPath: true });
    const dueDateField = component.find('DatePicker');
    expect(dueDateField.length).to.equal(1);
  });

  it('should call updateAddGoalFields when dueDate changes', () => {
    renderAddGoalsModal({ paths: [] }, { withPath: true });
    const dueDateField = component.find('DatePicker');
    const onDueDateChange = dueDateField.prop('onChange');

    expect(onDueDateChange).to.be.a('function');
    expect(mockedActions.updateAddGoalsField.callCount).to.equal(0);
    onDueDateChange('evt', 'test-date');
    expect(mockedActions.updateAddGoalsField.callCount).to.equal(1);
    expect(mockedActions.updateAddGoalsField.getCall(0).args).to.eql(['dueDate', 'test-date']);
  });

  it('should hide all the element and show the spinner', () => {
    renderAddGoalsModal({ showSpinner: true });
    const textFields = component.find('TextField');
    const chipInput = component.find('ChipInput');
    const iconSelector = component.find('IconSelector');
    const loading = component.find('Loading');
    expect(textFields.length).to.equal(0);
    expect(chipInput.length).to.equal(0);
    expect(iconSelector.length).to.equal(0);
    expect(loading.length).to.equal(1);
  });
});
