import React, { Component } from 'react';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
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
    return Object.keys(skills.list).map(skill =>
      <ListItem
        key={skills.list[skill].id}
        primaryText={skill}
        onTouchTap={() => this.handleSkillSelect(skills.list[skill].slug)}
      />
    );
  }

  render() {
    const { skills, actions, addModalParameters } = this.props;
    const tags = {};

    if (skills.isLoading || skills.list === null) {
      return <Loading />;
    }

    return (
      <div>
        <List>
            {this.renderSkills(skills)}
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

Skills.propTypes = {
  actions: React.PropTypes.object.isRequired,
  skills: React.PropTypes.object.isRequired,
  router: React.PropTypes.object.isRequired,
  addModalParameters: React.PropTypes.object.isRequired,
};

styles = {
  addButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
  },
};

export default Skills;
