import React from 'react';
import _ from 'lodash';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import ChipInput from 'material-ui-chip-input';
import FlatButton from 'material-ui/FlatButton';
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
        <IconSelector
          value={parameters.icon}
          onChange={(value) => actions.updateAddGoalsField('icon', value)}
        />
        <ChipInput
          style={styles.textFields}
          floatingLabelText="Tags"
          dataSource={tagsOptions}
          value={parameters.tags}
          onRequestAdd={(chip) => this.handleChipChange('add', chip)}
          onRequestDelete={(chip) => this.handleChipChange('remove', chip)}
        />
      </div>
    );
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
    const { actions, parameters } = this.props;
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
        onTouchTap={() => actions.addGoalRequest()}
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
  actions: React.PropTypes.object.isRequired,
  parameters: React.PropTypes.object.isRequired,
  tagsOptions: React.PropTypes.array.isRequired,
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
};

export default AddGoalsModal;
