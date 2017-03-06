import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import ActionSupervisorAccount from 'material-ui/svg-icons/action/supervisor-account';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import FlipMove from 'react-flip-move';
import { routerShape } from 'react-router/lib/PropTypes';
import find from 'lodash/find';
import includes from 'lodash/includes';
import map from 'lodash/map';
import UserCard from './UserCard';
import Loading from './Loading';

let styles = {};

class Profiles extends Component {
  componentDidMount() {
    if (this.props.skills < 1) {
      this.props.actions.skillList();
    }

    if (this.props.profiles.length < 1) {
      this.props.actions.profileList();
    }
  }

  componentWillUnmount() {
    this.props.actions.clearSkill();
  }

  updateResults(searchText, dataSource) {
    const shouldClear = !includes(dataSource, searchText);

    if (shouldClear) {
      this.props.actions.clearSkill();
    }
  }

  renderProfilesBySkillOrName(profiles, skills, selection) {
    const filteredSkill = find(skills, skill => skill.name === selection.text);
    const filteredProfile = find(profiles, profile => profile.fullName === selection.text);
    if (filteredSkill) {
      this.props.actions.profileListBySkill(filteredSkill.slug, 'profile');
    }
    if (filteredProfile) {
      this.props.router.push(`/profiles/${filteredProfile.id}`);
    }
  }

  renderProfiles(profiles) {
    const { router } = this.props;
    return map(profiles, profile => <UserCard user={profile} router={router} key={profile.id} />);
  }

  render() {
    const { profiles, skills, isLoading } = this.props;
    const skillNames = map(skills, 'name');
    const profileNames = map(profiles, 'fullName');
    const skillsAutoCompleteData = skillNames.map(skillName => ({
      text: skillName,
      value: (
        <MenuItem
          primaryText={skillName}
          secondaryText={<ActionGrade />}
        />
      ),
    }));
    const profilesAutoCompleteData = profileNames.map(profileName => ({
      text: profileName,
      value: (
        <MenuItem
          primaryText={profileName}
          secondaryText={<ActionSupervisorAccount />}
        />
      ),
    }));
    const autoCompleteData = skillsAutoCompleteData.concat(profilesAutoCompleteData);

    return (
      <div style={styles.wrapper}>
        <AutoComplete
          hintText="Type a skill or name"
          dataSource={autoCompleteData}
          floatingLabelText="Search by Skill or Name"
          filter={AutoComplete.caseInsensitiveFilter}
          onNewRequest={selection => this.renderProfilesBySkillOrName(profiles, skills, selection)}
          onUpdateInput={(searchText, dataSource) => this.updateResults(searchText, dataSource)}
          fullWidth
        />
        <Loading loading={isLoading}>
          { profiles && profiles.length
            ? (
              <FlipMove style={styles.profiles}>
                {this.renderProfiles(profiles)}
              </FlipMove>
            ) : (
              <p>Could not find any profiles</p>
            )
          }
        </Loading>
      </div>
    );
  }
}

Profiles.propTypes = {
  actions: React.PropTypes.shape({
    skillList: React.PropTypes.func.isRequired,
    profileList: React.PropTypes.func.isRequired,
    profileListBySkill: React.PropTypes.func.isRequired,
    clearSkill: React.PropTypes.func.isRequired,
  }).isRequired,
  profiles: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  skills: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  router: routerShape.isRequired,
  isLoading: React.PropTypes.bool,
};

styles = {
  wrapper: {
    maxWidth: '1024px',
    margin: '0 auto',
  },
  profiles: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
};

export default Profiles;
