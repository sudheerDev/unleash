import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';

let styles = {};

class AddExistingGoalsModal extends React.Component {

  handleSelectedGoal(index) {
    const { actions, goals } = this.props;
    actions.updateSelectedGoal(goals[index]);
  }

  handleCancel() {
    const { actions } = this.props;
    actions.resetExistingGoalModal();
  }

  handleSubmit() {
    const { actions, parameters: { selectedGoal, selectedPath }, profile } = this.props;

    actions.addExistingGoalToPathRequest(selectedGoal, selectedPath, profile)
      .then(() => actions.resetExistingGoalModal());
  }

  generateGoalCard() {
    const { selectedGoal } = this.props.parameters;

    if (selectedGoal) {
      const icon = selectedGoal.icon ? <FontIcon className={selectedGoal.icon} /> : null;
      const avatar = icon ? <Avatar icon={icon} /> : null;
      return (
        <Card>
          <CardHeader
            title={selectedGoal.name}
            avatar={avatar}
          />
          <CardText>{selectedGoal.description}</CardText>
        </Card>
      );
    }

    return null;
  }

  generateActionButtons() {
    const { parameters } = this.props;
    const cancelButton = (
      <FlatButton
        label="Cancel"
        onTouchTap={() => this.handleCancel()}
        disabled={parameters.showSpinner}
      />
    );
    const submitButton = (
      <FlatButton
        label="Submit"
        secondary
        onTouchTap={() => this.handleSubmit()}
        disabled={parameters.showSpinner}
      />
    );

    return [cancelButton, submitButton];
  }

  generatePathsSelectField() {
    const { actions, parameters, paths } = this.props;

    return (
      <SelectField
        floatingLabelText="Path"
        fullWidth
        value={parameters.selectedPath}
        onChange={(event, index, selectedPath) => actions.updateSelectedPath(selectedPath)}
      >
        {paths.map(path => (
          <MenuItem key={path.id} value={path.id} primaryText={path.name} />
        ))}
      </SelectField>
    );
  }

  render() {
    const { parameters, goals } = this.props;
    const autoCompleteData = goals.map(goal => goal.name);

    return (
      <Dialog
        title="Add Existing Goal"
        open={parameters.showModal}
        contentStyle={styles.modal}
        actions={this.generateActionButtons()}
        modal
      >
        <div style={styles.modalContainer}>
          <AutoComplete
            hintText="Type anything"
            dataSource={autoCompleteData}
            filter={AutoComplete.caseInsensitiveFilter}
            floatingLabelText="Goal"
            onNewRequest={(chosenRequest, index) => this.handleSelectedGoal(index)}
            fullWidth
          />
          {this.generatePathsSelectField()}
          {this.generateGoalCard()}
        </div>
      </Dialog>
    );
  }
}

AddExistingGoalsModal.propTypes = {
  actions: React.PropTypes.shape({
    fetchGoals: React.PropTypes.func,
    updateSelectedGoal: React.PropTypes.func,
    resetExistingGoalModal: React.PropTypes.func,
    addExistingGoalToPathRequest: React.PropTypes.func,
    updateSelectedPath: React.PropTypes.func,
  }).isRequired,
  parameters: React.PropTypes.shape({
    showModal: React.PropTypes.bool,
    showSpinner: React.PropTypes.bool,
    selectedPath: React.PropTypes.string,
    selectedGoal: React.PropTypes.object,
  }).isRequired,
  profile: React.PropTypes.shape({
    id: React.PropTypes.string,
  }).isRequired,
  goals: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  paths: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
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

export default AddExistingGoalsModal;
