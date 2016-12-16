import React from 'react';
import _ from 'lodash';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import ChipInput from 'material-ui-chip-input';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Loading from './Loading';
import IconSelector from './IconSelector';

let styles = {};

class AddGoalsModal extends React.Component {

  getGoalForm() {
    const { parameters, tagsOptions, actions } = this.props;
    return (
      <div>
        {this.generateTextField('name')}
        {this.generateTextField('description')}
        {this.generateTextField('level')}
        {this.generatePathsSelectField()}
        {this.generateDueDateField()}
        <IconSelector
          value={parameters.icon}
          onChange={value => actions.updateAddGoalsField('icon', value)}
        />
        <ChipInput
          style={styles.textFields}
          floatingLabelText="Tags"
          dataSource={tagsOptions}
          value={parameters.tags}
          onRequestAdd={chip => this.handleChipChange('add', chip)}
          onRequestDelete={chip => this.handleChipChange('remove', chip)}
        />
      </div>
    );
  }

  generateDueDateField() {
    const { actions, parameters, withPath } = this.props;

    if (!withPath) {
      return null;
    }

    return (
      <DatePicker
        style={styles.dueDateField}
        textFieldStyle={styles.textFields}
        hintText="Due Date"
        container="inline"
        mode="landscape"
        onChange={(event, date) => actions.updateAddGoalsField('dueDate', date)}
        value={new Date(parameters.dueDate)}
      />
    );
  }

  generatePathsSelectField() {
    const { actions, parameters, withPath } = this.props;
    let pathsSelectField = null;

    if (withPath) {
      pathsSelectField = (
        <SelectField
          floatingLabelText="Path"
          style={styles.textFields}
          value={parameters.path}
          onChange={(event, index, value) => actions.updateAddGoalsField('path', value)}
        >
          {parameters.paths.map(path => (
            <MenuItem key={path.id} value={path.id} primaryText={path.name} />
          ))}
        </SelectField>
      );
    }

    return pathsSelectField;
  }

  generateTextField(fieldName) {
    const { actions, parameters } = this.props;
    return (
      <TextField
        style={styles.textFields}
        floatingLabelText={_.capitalize(fieldName)}
        value={parameters[fieldName]}
        onChange={event => actions.updateAddGoalsField(fieldName, event.target.value)}
      />
    );
  }

  handleChipChange(actionType, chip) {
    const { actions, parameters } = this.props;
    if (actionType === 'add') {
      parameters.tags.push(chip);
      actions.updateAddGoalsField('tags', parameters.tags);
    } else if (actionType === 'remove') {
      const removeElementIndex = parameters.tags.indexOf(chip);
      parameters.tags.splice(removeElementIndex, 1);
      actions.updateAddGoalsField('tags', parameters.tags);
    }
  }

  render() {
    const { actions, parameters, onSubmit } = this.props;
    const modalContent = parameters.showSpinner ? <Loading /> : this.getGoalForm();

    const cancelButton = (
      <FlatButton
        label="Cancel"
        onTouchTap={() => actions.resetGoalModal()}
        disabled={parameters.showSpinner}
      />);
    const submitButton = (
      <FlatButton
        label="Submit"
        secondary
        onTouchTap={() => onSubmit().then(() => actions.resetGoalModal())}
        disabled={parameters.showSpinner}
      />);

    return (
      <Dialog
        title="Add Goal"
        open={parameters.showModal}
        contentStyle={styles.modal}
        actions={[cancelButton, submitButton]}
        modal
      >
        <div style={styles.modalContainer}>
          {modalContent}
        </div>
      </Dialog>
    );
  }
}

AddGoalsModal.propTypes = {
  actions: React.PropTypes.shape({
    resetGoalModal: React.PropTypes.func,
    addGoalRequest: React.PropTypes.func,
    updateAddGoalsField: React.PropTypes.func,
  }).isRequired,
  parameters: React.PropTypes.shape({
    showModal: React.PropTypes.bool,
    showSpinner: React.PropTypes.bool,
    name: React.PropTypes.string,
    description: React.PropTypes.string,
    tags: React.PropTypes.array,
    icon: React.PropTypes.string,
    level: React.PropTypes.string,
  }).isRequired,
  tagsOptions: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  withPath: React.PropTypes.bool,
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

export default AddGoalsModal;
