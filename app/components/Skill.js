import React, { Component } from 'react';
import Loading from './Loading';
import { find, every, some, values, map, range, random, sample } from 'lodash';
import UserCard from './UserCard';
import { Tabs, Tab } from 'material-ui/Tabs';
import { List, ListItem } from 'material-ui/List';
import ActionExtension from 'material-ui/svg-icons/action/extension';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ContentLink from 'material-ui/svg-icons/content/link';
import ContentCreate from 'material-ui/svg-icons/content/create';
import SocialSchool from 'material-ui/svg-icons/social/school';
import NotificationOnDemandVideo from 'material-ui/svg-icons/notification/ondemand-video';
import FlatButton from 'material-ui/FlatButton';

let styles = {};

class Skill extends Component {
  componentDidMount() {
    this.props.actions.skillList();
    this.props.actions.profileList();
    this.props.actions.profileListBySkill(this.props.params.slug);
  }

  getSkillBySlug(skills = {}, slug) {
    return find(values(skills), ['slug', slug]);
  }

  getProfilesInIds(profiles = {}, ids = []) {
    return values(profiles).filter((profile) => ids.indexOf(profile.id) > -1);
  }

  renderProfiles(profiles) {
    if (profiles.length === 0) {
      return (
        <div style={styles.profiles}>
          <p style={styles.empty}>No profiles yet with this skill.</p>
        </div>
      );
    }

    return (
      <div style={styles.profiles}>
        {map(profiles, (profile) =>
          <UserCard user={profile} router={this.props.router} key={profile.id} />
        )}
      </div>
    );
  }

  renderResources(resources) {
    if (resources.length === 0) {
      return (
        <div style={styles.resources}>
          <p style={styles.empty}>No resources added yet for this skill.</p>
        </div>
      );
    }

    const resourceTypes = {
      post: <ContentCreate />,
      course: <SocialSchool />,
      video: <NotificationOnDemandVideo />,
      tool: <ActionExtension />,
      other: <ContentLink />
    };

    return (
      <div style={styles.resources}>
        <List>
        {map(resources, (resource) =>
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
        )}
        </List>
      </div>
    );
  }

  render() {
    const { skills, profiles, profilesBySkill } = this.props;
    const isLoading = some([skills.isLoading, profiles.isLoading, profilesBySkill.isLoading]);
    const allLoaded = every([skills.list, profiles.list, profilesBySkill.profiles]);

    if (isLoading || !allLoaded) {
      return <Loading />;
    }

    const skill = this.getSkillBySlug(skills.list, this.props.params.slug);
    const skilled = this.getProfilesInIds(profiles.list, profilesBySkill.profiles);
    const resources = range(10).map(() => ({
      id: Math.random().toString(36).slice(2),
      url: `http://google.com/?q=${skill.name}`,
      upvotes: random(0, 10),
      upvoted: random(0, 3) === 0,
      type: sample(['post', 'course', 'video', 'tool', 'other'])
    })).sort((a, b) => b.upvotes - a.upvotes);

    return (
      <div>
        <div style={styles.skillHeader}>
          <div style={styles.divider}></div>
          <div>{skill.name}</div>
          <div style={styles.divider}></div>
        </div>
        <Tabs>
          <Tab label="Profiles" style={styles.tab}>
            {this.renderProfiles(skilled)}
          </Tab>
          <Tab label="Resources" style={styles.tab}>
            {this.renderResources(resources)}
          </Tab>
        </Tabs>
      </div>
    );
  }
}

Skill.propTypes = {
  actions: React.PropTypes.object.isRequired,
  skills: React.PropTypes.object.isRequired,
  profiles: React.PropTypes.object.isRequired,
  profilesBySkill: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  router: React.PropTypes.object.isRequired,
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
    marginTop: '40px'
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
    color: '#757575'
  }
};

export default Skill;
