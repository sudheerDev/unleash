import React from 'react';
import capitalize from 'lodash/capitalize';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Loading from './Loading';

let styles = {};

class AddSkillsModal extends React.Component {

  getSkillsForm() {
    return (
      <div>
        {this.generateTextField('name')}
      </div>
    );
  }

  generateTextField(fieldName) {
    const { actions, parameters } = this.props;
    return (
      <TextField
        style={styles.textFields}
        floatingLabelText={capitalize(fieldName)}
        value={parameters[fieldName]}
        onChange={event => actions.updateAddSkillField(fieldName, event.target.value)}
      />
    );
  }

  render() {
    const { actions, parameters } = this.props;
    const modalContent = parameters.showSpinner ? <Loading /> : this.getSkillsForm();

    const cancelButton = (
      <FlatButton
        label="Cancel"
        onTouchTap={() => actions.resetSkillModal()}
        disabled={parameters.showSpinner}
      />);
    const submitButton = (
      <FlatButton
        label="Submit"
        secondary
        onTouchTap={() => actions.addSkillRequest()}
        disabled={parameters.showSpinner}
      />);

    return (
      <Dialog
        title="Add Skills"
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

AddSkillsModal.propTypes = {
  actions: React.PropTypes.shape({
    updateAddSkillField: React.PropTypes.func,
    resetSkillModal: React.PropTypes.func,
    addSkillRequest: React.PropTypes.func,
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

export default AddSkillsModal;
