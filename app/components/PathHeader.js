import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import toggleHOC from '../hocs/toggleHOC';

const DIALOG_TOGGLE = 'rename';
let styles = {};

class PathHeader extends Component {

  constructor(props) {
    super(props);

    this.state = {
      renameText: props.path.name,
    };
  }

  /**
   * Handle TextField change.
   * @param {Object} event - TextField event.
   */
  handleNameChange = (event) => {
    this.setState({
      renameText: event.target.value,
    });
  };

  /**
   * Send rename request to API and close dialog.
   * @param {String} pathId - Edited Path's id.
   */
  renamePath(pathId) {
    const newName = this.state.renameText;
    const { actions, toggleOff } = this.props;

    actions.pathsRename(pathId, newName);
    toggleOff(DIALOG_TOGGLE);
  }

  /**
   * Render dialog with description.
   * @returns {Object} dialog element
   */
  renderDialog(pathId) {
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={() => this.props.toggleOff(DIALOG_TOGGLE)}
      />,
      <FlatButton
        label="Rename Path"
        primary
        onTouchTap={() => this.renamePath(pathId)}
      />
    ];

    return (
      <Dialog
        actions={actions}
        title="Rename Path"
        open={this.props.getToggleState(DIALOG_TOGGLE)}
        onRequestClose={() => this.props.toggleOff(DIALOG_TOGGLE)}
      >
        <TextField
          id="rename-path"
          defaultValue={this.state.renameText || 'Empty Path'}
          onChange={this.handleNameChange}
          fullWidth
        />
      </Dialog>
    );
  }

  render() {
    const { path } = this.props;

    return (
      <div className="pathHeader" style={styles.pathHeader}>
        <div style={styles.divider}></div>
        <div style={styles.name} onTouchTap={() => this.props.toggleOn(DIALOG_TOGGLE)}>
          <i className="icon-map" /> {path.name || 'Empty Path'}
        </div>
        <div style={styles.divider}></div>
        {this.renderDialog(path.id)}
      </div>
    );
  }
}

PathHeader.propTypes = {
  path: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired,
  getToggleState: React.PropTypes.func.isRequired,
  toggleOn: React.PropTypes.func.isRequired,
  toggleOff: React.PropTypes.func.isRequired,
};

styles = {
  pathHeader: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    maxWidth: '1150px',
    margin: '40px auto 0',
    padding: '0 40px',
    textAlign: 'center',
    fontFamily: 'Inconsolata, cursive',
    fontWeight: 'lighter',
    fontSize: '26px',
    textTransform: 'capitalize',
    color: '#969696',
  },
  divider: {
    flexGrow: 1,
    backgroundColor: '#ebebeb',
    height: '1px',
    alignSelf: 'center',
    margin: '0 20px',
  },
  name: {
    cursor: 'pointer',
  }
};

export default toggleHOC(PathHeader);
