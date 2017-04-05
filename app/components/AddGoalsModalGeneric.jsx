import React from 'react';
import capitalize from 'lodash/capitalize';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import ChipInput from 'material-ui-chip-input';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Loading from './Loading';
import IconSelector from './IconSelector';

let styles = {};

class AddGoalsModalGeneric extends React.Component {
  getGoalForm() {
    const { parameters, tagsOptions } = this.props;
    return (
      <div>
        {this.generateTextField('name')}
        {this.generateTextField('description')}
        {this.generateTextField('level')}
        {this.generatePathsSelectField()}
        {this.generateDueDateField()}
        <IconSelector
          value={parameters.icon}
          onChange={value => parameters.onFieldChange('icon', value)}
        />
        <ChipInput
          style={styles.textFields}
          floatingLabelText="Tags"
          dataSource={tagsOptions}
          value={parameters.tags}
          onRequestAdd={chip => this.handleChipChange('add', chip)}
          onRequestDelete={chip => this.handleChipChange('remove', chip)}
        />
        {this.generateExtraFields()}
      </div>
    );
  }

  generateExtraFields() {
    const { parameters: { extraFields } } = this.props;

    return extraFields && extraFields.map((Component, index) => <Component key={index} />);
  }

  generateDueDateField() {
    const { parameters, usersGoal } = this.props;

    if (!usersGoal) {
      return null;
    }

    return (
      <DatePicker
        style={styles.dueDateField}
        textFieldStyle={styles.textFields}
        hintText="Due Date"
        container="inline"
        mode="landscape"
        onChange={(event, date) => parameters.onFieldChange('dueDate', date)}
        value={parameters.dueDate ? new Date(parameters.dueDate) : null}
      />
    );
  }

  generatePathsSelectField() {
    const { parameters, usersGoal } = this.props;

    if (!usersGoal) {
      return null;
    }

    return (
      <SelectField
        floatingLabelText="Path"
        style={styles.textFields}
        value={parameters.path}
        onChange={(event, index, value) => parameters.onFieldChange('path', value)}
      >
        {parameters.paths.map(path => (
          <MenuItem key={path.id} value={path.id} primaryText={path.name} />
        ))}
      </SelectField>
    );
  }

  generateTextField(fieldName) {
    const { parameters } = this.props;
    return (
      <TextField
        style={styles.textFields}
        floatingLabelText={capitalize(fieldName)}
        value={parameters[fieldName]}
        onChange={event => parameters.onFieldChange(fieldName, event.target.value)}
      />
    );
  }

  handleChipChange(actionType, chip) {
    const { parameters } = this.props;
    if (actionType === 'add') {
      parameters.tags.push(chip);
      parameters.onFieldChange('tags', parameters.tags);
    } else if (actionType === 'remove') {
      const removeElementIndex = parameters.tags.indexOf(chip);
      parameters.tags.splice(removeElementIndex, 1);
      parameters.onFieldChange('tags', parameters.tags);
    }
  }

  render() {
    const { parameters } = this.props;
    const modalContent = parameters.showSpinner ? <Loading /> : this.getGoalForm();
    const modalActions = parameters.modalActions;

    return (
      <Dialog
        title="Add Goal"
        open={parameters.showModal}
        contentStyle={styles.modal}
        actions={modalActions}
        autoScrollBodyContent
        modal
      >
        <div style={styles.modalContainer}>
          {modalContent}
        </div>
      </Dialog>
    );
  }
}

AddGoalsModalGeneric.propTypes = {
  parameters: React.PropTypes.shape({
    showModal: React.PropTypes.bool.isRequired,
    showSpinner: React.PropTypes.bool,
    name: React.PropTypes.string,
    description: React.PropTypes.string,
    tags: React.PropTypes.array,
    icon: React.PropTypes.string,
    level: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    modalActions: React.PropTypes.array,
    extraFields: React.PropTypes.arrayOf(React.PropTypes.func),
  }).isRequired,
  tagsOptions: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  usersGoal: React.PropTypes.bool,
};

styles = {
  modal: {
    width: '500px',
  },
  modalContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: '50px',
  },
  textFields: {
    width: '100%',
  },
  dueDateField: {
    paddingTop: 20,
    width: '100%',
  },
};

export default AddGoalsModalGeneric;
