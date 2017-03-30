import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import toggleHOC from '../hocs/toggleHOC';

const RENAME_DIALOG = 'rename';
const REMOVE_DIALOG = 'remove';
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
   * Open confirmation modal with delete path request bound
   * to confirm button
   */
  handleRemovePath(pathId) {
    const { actions, toggleOff } = this.props;
    actions.pathsRemove(pathId);
    toggleOff(RENAME_DIALOG);
  }

  /**
   * Send rename request to API and close dialog.
   * @param {String} pathId - Edited Path's id.
   */
  handleRenamePath(pathId) {
    const newName = this.state.renameText;
    const { actions, toggleOff } = this.props;

    actions.pathsRename(pathId, newName);
    toggleOff(RENAME_DIALOG);
  }

  /**
   * Render dialog with description.
   * @returns {Object} dialog element
   */
  renderDialog(pathId) {
    const actions = [
      <FlatButton
        label="Rename"
        primary
        onTouchTap={() => this.handleRenamePath(pathId)}
      />,
      <FlatButton
        label="Cancel"
        onTouchTap={() => this.props.toggleOff(RENAME_DIALOG)}
      />,
    ];

    return (
      <Dialog
        actions={actions}
        title="Rename Path"
        open={this.props.getToggleState(RENAME_DIALOG)}
        onRequestClose={() => this.props.toggleOff(RENAME_DIALOG)}
      >
        <TextField
          id="rename-path"
          defaultValue={this.state.renameText || 'Unnamed Path'}
          onChange={this.handleNameChange}
          fullWidth
        />
      </Dialog>
    );
  }

  renderRemoveDialog(pathId) {
    const actions = [
      <FlatButton
        label="Continue"
        secondary
        onTouchTap={() => this.handleRemovePath(pathId)}
      />,
      <FlatButton
        label="Cancel"
        onTouchTap={() => this.props.toggleOff(REMOVE_DIALOG)}
      />,
    ];

    const pathName = this.state.renameText || 'Unnamed Path';
    return (
      <Dialog
        title={`You are about to remove "${pathName}"`}
        actions={actions}
        open={this.props.getToggleState(REMOVE_DIALOG)}
        onRequestClose={() => this.props.toggleOff(REMOVE_DIALOG)}
      >
        This action can not be undone.
      </Dialog>
    );
  }

  render() {
    const { path } = this.props;

    return (
      <div className="pathHeader">
        <div style={styles.pathHeader}>
          <div style={styles.divider} />
          <div style={styles.name}>
            <i className="icon-map" /> {path.name || 'Unnamed Path'}
          </div>
          <div style={styles.divider} />
        </div>
        {this.props.showActions && (
          <div className="pathActions" style={styles.pathHeaderActions}>
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            >
              <MenuItem
                primaryText="Rename path"
                onTouchTap={() => this.props.toggleOn(RENAME_DIALOG)}
              />
              <MenuItem
                primaryText="Delete path"
                onTouchTap={() => this.props.toggleOn(REMOVE_DIALOG)}
              />
            </IconMenu>
            {this.renderDialog(path.id)}
            {this.renderRemoveDialog(path.id)}
          </div>
        )}
      </div>
    );
  }
}

PathHeader.propTypes = {
  path: React.PropTypes.shape({
    name: React.PropTypes.string,
    id: React.PropTypes.string.isRequired,
  }).isRequired,
  showActions: React.PropTypes.bool.isRequired,
  actions: React.PropTypes.shape({
    pathsRemove: React.PropTypes.func.isRequired,
    pathsRename: React.PropTypes.func.isRequired,
  }).isRequired,
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
  pathHeaderActions: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    padding: '0 40px',
    justifyContent: 'flex-end',
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
  },
};

export default toggleHOC(PathHeader);
