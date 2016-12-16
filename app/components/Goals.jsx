import React, { Component } from 'react';
import _ from 'lodash';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import GoalCard from './GoalCard';
import AddGoalsModal from './AddGoalsModal';

let styles = {};

class Goals extends Component {
  componentDidMount() {
    this.props.actions.fetchGoals();
  }

  getTags() {
    const { list } = this.props;
    const goalsWithTags = list.filter(goal => (goal.tags ? goal.tags.length > 0 : false));
    return _.flatten(goalsWithTags.map(goal => goal.tags));
  }

  renderGoals(goals) {
    return _.map(goals, goal => <GoalCard key={goal.id} goal={goal} />);
  }

  render() {
    const { list, actions, addModalParameters } = this.props;
    const tags = this.getTags();
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
        <AddGoalsModal
          parameters={addModalParameters}
          actions={actions}
          tagsOptions={tags}
          onSubmit={actions.addGoalRequest}
        />
      </div>
    );
  }
}

Goals.propTypes = {
  actions: React.PropTypes.shape({
    fetchGoals: React.PropTypes.func.isRequired,
    showAddGoalsModal: React.PropTypes.func.isRequired,
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
