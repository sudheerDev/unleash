import React, { Component } from 'react';
import map from 'lodash/map';
import flatten from 'lodash/flatten';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import GoalCard from './GoalCard';
import AddGoalsModalGeneric from './AddGoalsModalGeneric';

let styles = {};

class Goals extends Component {
  componentDidMount() {
    this.props.actions.fetchGoals();
  }

  getTags() {
    const { list } = this.props;
    const goalsWithTags = list.filter(goal => (goal.tags ? goal.tags.length > 0 : false));
    return flatten(goalsWithTags.map(goal => goal.tags));
  }

  renderGoals(goals) {
    return map(goals, goal => <GoalCard key={goal.id} goal={goal} />);
  }

  renderAddGoalModal() {
    const { addModalParameters: { showSpinner, ...modalParams }, actions } = this.props;
    const onFieldChange = (field, value) => actions.updateAddGoalsField(field, value);
    const modalActions = [(
      <FlatButton
        label="Cancel"
        onTouchTap={() => actions.resetGoalModal()}
        disabled={showSpinner}
      />), (<FlatButton
        label="Submit"
        secondary
        onTouchTap={() => actions.addGoalRequest()}
        disabled={showSpinner}
      />),
    ];


    const addGoalsModalParameters = {
      ...modalParams,
      onFieldChange,
      modalActions,
    };

    return (
      <AddGoalsModalGeneric
        parameters={addGoalsModalParameters}
        tagsOptions={this.getTags()}
        usersGoal={false}
      />
    );
  }

  render() {
    const { list, actions } = this.props;
    return (
      <div>
        <div style={styles.goalsWrapper}>
          {this.renderGoals(list)}
        </div>
        <FloatingActionButton
          style={styles.addButton}
          onClick={() => actions.showAddGoalsModal(true)}
        >
          <ContentAdd />
        </FloatingActionButton>
        {this.renderAddGoalModal()}
      </div>
    );
  }
}

Goals.propTypes = {
  actions: React.PropTypes.shape({
    fetchGoals: React.PropTypes.func.isRequired,
    showAddGoalsModal: React.PropTypes.func.isRequired,
    addGoalRequest: React.PropTypes.func.isRequired,
  }).isRequired,
  list: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  addModalParameters: React.PropTypes.shape({
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
  goalsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: 'auto',
    width: '90%',
    maxWidth: '1150px',
  },
  addButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
  },
};

export default Goals;
