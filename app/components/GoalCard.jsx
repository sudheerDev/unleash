import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import { red300 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import toggleHOC from '../hocs/toggleHOC';
import MilestoneImg from '../assets/milestone.png';
import Loading from './Loading';

const DIALOG_TOGGLE = 'dialog';
const NOTIFY_ON_SLACK = 'notify-on-slack';

let styles = {};

const propTypes = {
  loading: React.PropTypes.bool,
  actions: React.PropTypes.object,
  editable: React.PropTypes.bool,
  goal: React.PropTypes.object.isRequired,
  path: React.PropTypes.object,
  profile: React.PropTypes.shape({
    id: React.PropTypes.string,
    fullName: React.PropTypes.string,
    picture: React.PropTypes.string,
  }),
  getToggleState: React.PropTypes.func.isRequired,
  toggleOn: React.PropTypes.func.isRequired,
  toggleOff: React.PropTypes.func.isRequired,
  toggle: React.PropTypes.func.isRequired,
};

class GoalCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      slackAdditionalMessage: '',
    };
  }

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

  toggleAchievement() {
    const { goal, path, profile } = this.props;
    const achieved = !goal.achieved;
    const slackOptions = {
      notifyOnSlack: this.props.getToggleState(NOTIFY_ON_SLACK),
      additionalMessage: this.state.slackAdditionalMessage,
      profile,
    };

    this.props.actions.pathsUpdateGoal(path, goal, { achieved }, slackOptions)
      .then(() => this.closeDialog());
  }

  handleRemove() {
    const { actions, goal, path, profile } = this.props;

    actions.removeGoalFromPath(goal, path, profile.id);
  }

  updateDueDate(dueDate) {
    const { goal, path } = this.props;
    this.props.actions.pathsUpdateGoal(path, goal, { dueDate });
  }

  handleSlackMessageChange(event) {
    this.setState({
      slackAdditionalMessage: event.target.value,
    });
  }

  closeDialog() {
    this.props.toggleOff(NOTIFY_ON_SLACK);
    this.props.toggleOff(DIALOG_TOGGLE);
  }

  /**
   * Render dialog with description
   *
   * @returns {Object} dialog element
   */
  renderDialog() {
    const { goal, path, loading, editable } = this.props;
    const actions = [
      <FlatButton
        label="Close"
        onTouchTap={() => this.closeDialog()}
      />,
    ];
    let editableInputs = null;

    if (path && editable) {
      actions.unshift(
        <FlatButton
          label={goal.achieved ? 'Mark as unachieved' : 'Mark as achieved'}
          primary
          onTouchTap={() => this.toggleAchievement()}
        />,
      );
      actions.unshift(
        <FlatButton
          label="Remove"
          secondary
          onTouchTap={() => this.handleRemove()}
        />,
      );

      const notifySlackValue = this.props.getToggleState(NOTIFY_ON_SLACK);
      editableInputs = (
        <div>
          <DatePicker
            style={styles.dueDatePicker}
            hintText="Due Date"
            container="inline"
            mode="landscape"
            onChange={(event, date) => this.updateDueDate(date)}
            value={goal.dueDate ? new Date(goal.dueDate) : null}
          />
          {!goal.achieved && (
            <div>
              <Checkbox
                style={styles.notifySlackCheckbox}
                checked={notifySlackValue}
                onCheck={() => this.props.toggle(NOTIFY_ON_SLACK)}
                label="Notify on Slack"
              />
              {notifySlackValue && (
                <TextField
                  onChange={event => this.handleSlackMessageChange(event)}
                  style={styles.additionalMessageInput}
                  hintText="Additional message (optional)"
                />
              )}
            </div>
          )}
        </div>
      );
    }

    return (
      <Dialog
        actions={!loading ? actions : null}
        title={!loading ? goal.name : null}
        open={this.props.getToggleState(DIALOG_TOGGLE)}
        onRequestClose={() => this.closeDialog()}
      >
        <Loading loading={loading}>
          <div>
            {goal.description}
            {editableInputs}
          </div>
        </Loading>
      </Dialog>
    );
  }

  render() {
    const { goal, loading } = this.props;
    const achieved = goal.achieved;
    const dueDays = goal.dueDate ? this.daysLeft(goal.dueDate) : 0;
    const inProgress = !goal.achieved && goal.dueDate;
    const goalStyle = Object.assign(
      {},
      styles.goal,
      achieved && styles.achieved,
      inProgress && styles.inProgress,
    );
    // @TODO: (Kelvin De Moya) - Just for testing. Update once goal type is implemented in the api.
    const isMilestone = dueDays >= 10 || goal.level === 4;

    return (
      <Paper style={goalStyle} zDepth={2} onTouchTap={() => this.props.toggleOn(DIALOG_TOGGLE)} >
        <Loading loading={loading}>
          <div>
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
          </div>
        </Loading>
        {this.renderDialog()}
      </Paper>
    );
  }
}

GoalCard.propTypes = propTypes;

GoalCard.defaultProps = {
  loading: false,
};

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
    marginTop: '10px',
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
  inProgress: {
    backgroundColor: red300,
    color: '#ffffff',
  },
  dueDatePicker: {
    marginTop: '15px',
    width: '100%',
  },
  notifySlackCheckbox: {
    marginTop: '15px',
  },
  additionalMessageInput: {
    width: '100%',
  },
};

export default toggleHOC(GoalCard);
