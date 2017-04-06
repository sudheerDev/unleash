import React, { Component } from 'react';
import find from 'lodash/find';
import every from 'lodash/every';
import some from 'lodash/some';
import each from 'lodash/each';
import values from 'lodash/values';
import map from 'lodash/map';
import { Tabs, Tab } from 'material-ui/Tabs';
import { List, ListItem } from 'material-ui/List';
import { routerShape } from 'react-router/lib/PropTypes';
import ActionExtension from 'material-ui/svg-icons/action/extension';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import AvWeb from 'material-ui/svg-icons/av/web';
import ContentLink from 'material-ui/svg-icons/content/link';
import ContentCreate from 'material-ui/svg-icons/content/create';
import SocialSchool from 'material-ui/svg-icons/social/school';
import NotificationOnDemandVideo from 'material-ui/svg-icons/notification/ondemand-video';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ContentUndo from 'material-ui/svg-icons/content/undo';
import toggleHOC from '../hocs/toggleHOC';
import Loading from './Loading';
import UserCard from './UserCard';

const DIALOG_TOGGLE = 'addResource';
let styles = {};

const resourceTypes = {
  post: <ContentCreate />,
  course: <SocialSchool />,
  video: <NotificationOnDemandVideo />,
  tool: <ActionExtension />,
  other: <ContentLink />,
};

function getSkillBySlug(skills = {}, slug) {
  return find(values(skills), ['slug', slug]) || {};
}

function loadVotes(props, skillId, resources) {
  const { actions } = props;
  each(resources, (resource) => {
    actions.voteList(skillId, resource.id);
  });
}

function loadResources(props, skills) {
  const { actions, params } = props;
  const skill = getSkillBySlug(skills, params.slug);
  actions.resourceList(skill.id).then((resourceAction) => { loadVotes(props, skill.id, resourceAction.resources); });
}

function loadData(props) {
  const { actions, params } = props;
  actions.skillList().then((action) => { loadResources(props, action.skills); });
  actions.profileList();
  actions.profileListBySkill(params.slug);
}

class Skill extends Component {

  constructor(props) {
    super(props);

    this.state = this.getInitalDialogState();
  }

  componentWillMount() {
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const oldSlug = this.props.params.slug;
    const nextSlug = nextProps.params.slug;

    if (oldSlug !== nextSlug) {
      loadData(nextProps);
    }
  }

  getProfilesInIds(profiles = {}, ids = []) {
    return profiles.filter(profile => this.filterProfileIds(profile, ids));
  }

  getInitalDialogState() {
    return {
      resource_url: '',
      resource_description: '',
      resource_type: 'other',
    };
  }

  filterProfileIds(profile, ids) {
    return ids.indexOf(profile.id) > -1;
  }

  /**
   * Handle TextField change.
   * @param {Object} event - TextField event.
   */
  handleResourceUrlChange = (event) => {
    this.setState({
      resource_url: event.target.value,
    });
  }

  /**
   * Handle TextField change.
   * @param {Object} event - TextField event.
   */
  handleResourceDescriptionChange = (event) => {
    this.setState({
      resource_description: event.target.value,
    });
  }

  /**
   * Handle SelectField change.
   * @param {Object} event - SelectField event.
   */
  handleResourceTypeChange = (event, index, value) => {
    this.setState({
      resource_type: value,
    });
  }

  handleAddResource() {
    this.props.toggleOn(DIALOG_TOGGLE);
  }

  toggleDeletingState() {
    this.setState({
      isRemoving: !this.setState.isRemoving,
    });
  }

  addResource(skillId) {
    const { actions, toggleOff, userId } = this.props;
    if (this.state.resource_url !== '' && this.state.resource_description !== '') {
      actions.resourceAdd(skillId, {
        url: this.state.resource_url,
        description: this.state.resource_description,
        type: this.state.resource_type,
        authorId: userId,
      });
      toggleOff(DIALOG_TOGGLE);
      this.setState(this.getInitalDialogState());
    }
  }

  addVote = (skillId, resource, upvoted) => () => {
    const { actions, userId } = this.props;
    const vote = upvoted ? -1 : 1;

    actions.resourceAddVote(skillId, resource.id, {
      authorId: userId,
      vote,
    });
  }

  removeResource(resource, skill) {
    const { actions } = this.props;
    actions.resourceRemove(resource, skill.slug).then(() => {
      const index = skill.resources.findIndex(el => el.id === resource.id);
      skill.resources.splice(index, 1);
      this.toggleDeletingState();
    });
  }

  /**
   * Render dialog with description.
   * @returns {Object} dialog element
   */
  renderDialog(skill) {
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={() => this.props.toggleOff(DIALOG_TOGGLE)}
      />,
      <FlatButton
        label="Add Resource"
        primary
        onTouchTap={() => this.addResource(skill.id)}
      />,
    ];

    return (
      <Dialog
        actions={actions}
        title="Add Resource"
        open={this.props.getToggleState(DIALOG_TOGGLE)}
        onRequestClose={() => this.props.toggleOff(DIALOG_TOGGLE)}
      >
        <TextField
          id="resource-url"
          defaultValue={this.state.resource_url}
          hintText="Resource URL"
          onChange={this.handleResourceUrlChange}
          fullWidth
        />
        <TextField
          id="resource-description"
          defaultValue={this.state.resource_description}
          hintText="Description"
          onChange={this.handleResourceDescriptionChange}
          fullWidth
        />
        <SelectField
          floatingLabelText="Type"
          value={this.state.resource_type}
          onChange={this.handleResourceTypeChange}
        >
          <MenuItem value={'post'} primaryText="Post" />
          <MenuItem value={'course'} primaryText="Course" />
          <MenuItem value={'video'} primaryText="Video" />
          <MenuItem value={'tool'} primaryText="Tool" />
          <MenuItem value={'other'} primaryText="Other" />
        </SelectField>

      </Dialog>
    );
  }

  renderProfiles(profiles) {
    const { router } = this.props;

    if (profiles.length === 0) {
      return (
        <div style={styles.profiles}>
          <p style={styles.empty}>No profiles yet with this skill.</p>
        </div>
      );
    }

    return (
      <div style={styles.profiles}>
        {map(profiles, profile => <UserCard user={profile} router={router} key={profile.id} />)}
      </div>
    );
  }

  renderResourceItem = (resource, skill) => {
    const { votes, userId } = this.props;

    let votesCount = 0;
    let upvoted = 0;
    if (votes[resource.id]) {
      votesCount = votes[resource.id].length;
      each(votes[resource.id], (vote) => {
        if (vote.authorId === userId) {
          upvoted = 1;
        }
      });
    }

    return (
      <ListItem
        key={resource.id}
        leftIcon={resourceTypes[resource.type]}
        primaryText={resource.description}
        secondaryText={resource.type}
        rightIconButton={
          <div>
            <FlatButton
              href={resource.url}
              target="_blank"
              icon={<AvWeb />}
            />
            <FlatButton
              label={`x ${votesCount}`}
              secondary={upvoted}
              icon={<ActionThumbUp />}
              onTouchTap={this.addVote(skill.id, resource, upvoted)}
            />
          </div>
        }
      />
    );
  };

  renderResources(resources, skill) {
    let resourceItems;
    let emptyMessage;

    if (this.state.isRemoving) {
      resourceItems = this.renderRemovingResourcesList(resources, skill);
      emptyMessage = 'There are no resources you can remove.';
    } else {
      resourceItems = map(resources, resource => this.renderResourceItem(resource, skill));
      emptyMessage = 'No resources added yet for this skill.';
    }

    return (
      <div style={styles.resources}>
        {resourceItems.length ? (
          <List>{resourceItems}</List>
        ) : (
          <div style={styles.resources}>
            <p style={styles.empty}>{emptyMessage}</p>
          </div>
        )}
      </div>
    );
  }

  renderDefaultResourcesList(resources) {
    return resources.map(resource => (
      <ListItem
        key={resource.id}
        leftIcon={resourceTypes[resource.type]}
        primaryText={resource.url}
        secondaryText={resource.type}
        rightIconButton={
          <FlatButton
            label={`x ${resource.upvotes}`}
            icon={<ActionThumbUp />}
            secondary={resource.upvoted}
          />
        }
      />
    ));
  }

  renderRemovingResourcesList(resources, skill) {
    const { userId } = this.props;
    const ownedResources = resources.filter(resource => resource.authorId === userId);

    return ownedResources.map(resource => (
      <ListItem
        key={resource.id}
        leftIcon={
          <ContentClear
            color="#ff5965"
            onClick={() => this.removeResource(resource, skill)}
          />
        }
        primaryText={resource.url}
        secondaryText={resource.type}
      />
    ));
  }

  render() {
    const {
      skills,
      skillsLoading,
      profiles,
      profilesLoading,
      profilesBySkill,
      bySkillLoading,
      resourcesLoading,
      resources,
    } = this.props;
    const isLoading = some([profilesLoading, skillsLoading, resourcesLoading, bySkillLoading]);
    const allLoaded = every([skills, profiles, resources, profilesBySkill]);

    if (isLoading || !allLoaded) {
      return <Loading />;
    }

    const skill = getSkillBySlug(skills, this.props.params.slug);
    const skilled = this.getProfilesInIds(profiles, profilesBySkill);
    const renderButtons = () => {
      const showDefaultButtons = this.state.isRemoving !== true;
      return (
        <div style={styles.resources}>
          {showDefaultButtons ? (
            <div>
              <FloatingActionButton
                backgroundColor="#8FD694"
                style={styles.addButton}
                onClick={() => this.handleAddResource()}
              >
                <ContentAdd />
              </FloatingActionButton>
              <FloatingActionButton
                backgroundColor="#ff5965"
                style={styles.removeButton}
                onClick={() => this.toggleDeletingState()}
              >
                <ContentClear />
              </FloatingActionButton>
            </div>
          ) : (
            <FloatingActionButton
              backgroundColor="#8FD694"
              style={styles.removeButton}
              onClick={() => this.setState({ isRemoving: false })}
            >
              <ContentUndo />
            </FloatingActionButton>
          )}
        </div>
      );
    };

    const tabsRender = ({ selected, children }) => (
      <div>
        {selected && children}
      </div>
    );

    return (
      <div>
        <div style={styles.skillHeader}>
          <div style={styles.divider} />
          <div>{skill.name}</div>
          <div style={styles.divider} />
          {skill && this.renderDialog(skill)}
        </div>
        <Tabs tabTemplate={tabs => tabsRender(tabs)}>
          <Tab label="Profiles" style={styles.tab}>
            {this.renderProfiles(skilled)}
          </Tab>
          <Tab label="Resources" style={styles.tab}>
            {this.renderResources(resources, skill)}
            {renderButtons()}
          </Tab>
        </Tabs>
      </div>
    );
  }
}

Skill.propTypes = {
  actions: React.PropTypes.shape({
    skillList: React.PropTypes.func.isRequired,
    profileList: React.PropTypes.func.isRequired,
    profileListBySkill: React.PropTypes.func.isRequired,
    resourceAdd: React.PropTypes.func.isRequired,
    resourceAddVote: React.PropTypes.func.isRequired,
    resourceList: React.PropTypes.func.isRequired,
  }).isRequired,
  userId: React.PropTypes.string.isRequired,
  skills: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  skillsLoading: React.PropTypes.bool.isRequired,
  resources: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  resourcesLoading: React.PropTypes.bool.isRequired,
  votes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  profiles: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  profilesLoading: React.PropTypes.bool.isRequired,
  profilesBySkill: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  bySkillLoading: React.PropTypes.bool.isRequired,
  params: React.PropTypes.shape({
    slug: React.PropTypes.string,
  }).isRequired,
  router: routerShape.isRequired,
  getToggleState: React.PropTypes.func.isRequired,
  toggleOn: React.PropTypes.func.isRequired,
  toggleOff: React.PropTypes.func.isRequired,
};

styles = {
  skillHeader: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    maxWidth: '1150px',
    margin: '40px auto 40px',
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
  empty: {
    color: '#969696',
    textAlign: 'center',
    marginTop: '40px',
  },
  profiles: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    maxWidth: '1024px',
    margin: '0 auto',
  },
  tab: {
    backgroundColor: '#fff',
    color: '#757575',
  },
  fullWidthButton: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: '20px auto 0 auto',
    width: '100%',
  },
  addButton: {
    position: 'fixed',
    bottom: '20px',
    right: '100px',
  },
  removeButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
  },
};

export default toggleHOC(Skill);
