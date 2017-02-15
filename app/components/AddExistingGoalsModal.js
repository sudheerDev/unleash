import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import _ from 'lodash';

let styles = {};

class AddExistingGoalsModal extends React.Component {
  componentDidMount() {
    const { actions } = this.props;

    actions.fetchGoals();
  }
  handleSelectedGoal(index) {
    const { actions, goals } = this.props;

    actions.updateSelectedGoal(goals[index]);
  }
  handleCancel() {
    const { actions } = this.props;

    actions.resetExistingGoalModal();
  }
  handleSubmit() {
    const { actions, parameters, profile } = this.props;

    actions.addExistingGoalToPathRequest(
      parameters.selectedGoal,
      parameters.selectedPath,
      profile
    ).then(
      actions.resetExistingGoalModal()
    );
  }
  generateGoalCard() {
    const { parameters } = this.props;

    let displayedCard = null;
    if (parameters.selectedGoal) {
      displayedCard = (
        <Card>
          <CardHeader
            title={parameters.selectedGoal.name}
            avatar={<Avatar icon={<FontIcon className={parameters.selectedGoal.icon} />} />}
          />
          <CardText>{parameters.selectedGoal.description}</CardText>
        </Card>
      );
    }

    return displayedCard;
  }
  generateActionButtons() {
    const { parameters } = this.props;
    const cancelButton = (
      <FlatButton
        label="Cancel"
        onTouchTap={() => this.handleCancel()}
        disabled={parameters.showSpinner}
      />);
    const submitButton = (
      <FlatButton
        label="Submit"
        secondary
        onTouchTap={() => this.handleSubmit()}
        disabled={parameters.showSpinner}
      />);

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
    const autoCompleteData = _.map(goals, 'name');

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
  actions: React.PropTypes.object.isRequired,
  parameters: React.PropTypes.object.isRequired,
  profile: React.PropTypes.object.isRequired,
  goals: React.PropTypes.array.isRequired,
  paths: React.PropTypes.array.isRequired,
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
