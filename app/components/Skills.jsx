import React, { Component } from 'react';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { routerShape } from 'react-router/lib/PropTypes';
import map from 'lodash/map';
import Loading from './Loading';
import AddSkillsModal from './AddSkillsModal';

let styles = {};

class Skills extends Component {
  componentDidMount() {
    this.props.actions.skillList();
  }

  handleSkillSelect(skillSlug) {
    this.props.router.push(`/skills/${skillSlug}`);
  }

  renderSkills(skills) {
    return map(skills, skill => (
      <ListItem
        key={skill.id}
        primaryText={skill.name}
        onTouchTap={() => this.handleSkillSelect(skill.slug)}
      />
    ));
  }

  render() {
    const { skills, actions, addModalParameters } = this.props;
    const tags = {};

    if (skills.isLoading || skills.list.length < 1) {
      return <Loading />;
    }

    return (
      <div>
        <List>
          {this.renderSkills(skills.list)}
        </List>
        <FloatingActionButton
          style={styles.addButton}
          onClick={() => actions.showAddSkillModal(true)}
        >
          <ContentAdd />
        </FloatingActionButton>
        <AddSkillsModal actions={actions} parameters={addModalParameters} tagsOptions={tags} />
      </div>
    );
  }
}

styles = {
  addButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
  },
};

Skills.propTypes = {
  actions: React.PropTypes.shape({
    skillList: React.PropTypes.func.isRequired,
  }).isRequired,
  skills: React.PropTypes.shape({
    isLoading: React.PropTypes.bool.isRequired,
    list: React.PropTypes.array.isRequired,
  }).isRequired,
  router: routerShape.isRequired,
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

export default Skills;
