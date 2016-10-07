import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import toggleHOC from '../hocs/toggleHOC';
import MilestoneImg from '../assets/milestone.png';

const DIALOG_TOGGLE = 'dialog';
let styles = {};

const propTypes = {
  goal: React.PropTypes.object.isRequired,
  getToggleState: React.PropTypes.func.isRequired,
  toggleOn: React.PropTypes.func.isRequired,
  toggleOff: React.PropTypes.func.isRequired,
};

class GoalCard extends Component {

  /**
   * Calculate days left for Due Date.
   * @param {String} date - Date from API.
   * @returns {number} days left.
   */
  daysLeft = (date) => {
    const due = new Date(date).getTime();
    const now = Date.now();

    return Math.round(Math.max(0, (due - now) / (24 * 3600 * 1000)));
  };

  /**
   * Render dialog with description
   *
   * @returns {Object} dialog element
   */
  renderDialog() {
    const { goal } = this.props;
    const actions = [
      <FlatButton
        label="Close"
        primary
        onTouchTap={() => this.props.toggleOff(DIALOG_TOGGLE)}
      />
    ];

    return (
      <Dialog
        actions={actions}
        title={goal.name}
        open={this.props.getToggleState(DIALOG_TOGGLE)}
        onRequestClose={() => this.props.toggleOff(DIALOG_TOGGLE)}
      >
        {goal.description}
      </Dialog>
    );
  }

  render() {
    const { goal } = this.props;
    const achieved = goal.achieved;
    const dueDays = goal.dueDate ? this.daysLeft(goal.dueDate) : 0;
    const goalStyle = Object.assign({}, styles.goal, achieved && styles.achieved);
    // @TODO: (Kelvin De Moya) - Just for testing. Update once goal type is implemented in the api.
    const isMilestone = dueDays >= 10 || goal.level === 4;

    return (
      <Paper style={goalStyle} zDepth={2} onTouchTap={() => this.props.toggleOn(DIALOG_TOGGLE)} >
        {isMilestone && <img src={MilestoneImg} style={styles.milestone} alt="milestone" />}
        <i className={goal.icon} style={styles.icon} />
        <span style={styles.title}>{goal.name}</span>
        <div style={styles.details}>
          <span style={styles.level}>Lvl {goal.level}</span>
          <div style={Object.assign({}, styles.status, achieved && styles.achieved)}>
            <i className={achieved ? 'icon-checkmark' : 'icon-hour-glass'} />
          </div>
          <span style={styles.dueDate}><i className="icon-history" /> {dueDays}</span>
        </div>
        {this.renderDialog()}
      </Paper>
    );
  }
}

GoalCard.propTypes = propTypes;

styles = {
  goal: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '280px',
    height: '240px',
    margin: '20px 20px 50px',
    padding: '20px',
    textAlign: 'center',
    color: '#5f5f5f',
  },
  milestone: {
    position: 'absolute',
    right: '-8px',
    top: '-8px',
    width: '150px',
  },
  icon: {
    display: 'block',
    fontSize: '100px',
    marginTop: '20px',
  },
  title: {
    display: 'flex',
    flexGrow: '1',
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: '22px',
    fontWeight: '200',
    padding: '5px',
    marginTop: '10px'
  },
  details: {
    color: '#ffffff',
    position: 'absolute',
    bottom: '-15px',
    left: '25%',
    height: '30px',
    width: '50%',
    backgroundColor: '#5f5f5f',
    borderRadius: '50px',
  },
  level: {
    float: 'left',
    lineHeight: '30px',
    width: '50px',
    textTransform: 'uppercase',
    fontSize: '12px',
  },
  status: {
    position: 'absolute',
    left: '33%',
    width: '40px',
    height: '40px',
    lineHeight: '43px',
    textAlign: 'center',
    color: '#ffffff',
    fontSize: '18px',
    borderRadius: '50px',
    backgroundColor: '#909090',
    borderColor: '#ffffff',
    margin: '-8px auto 0',
    borderWidth: '4px',
    borderStyle: 'solid',
  },
  dueDate: {
    float: 'right',
    lineHeight: '30px',
    width: '50px',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: '12px',
  },
  achieved: {
    backgroundColor: '#8FD694',
    color: '#ffffff',
  },
};

export default toggleHOC(GoalCard);
