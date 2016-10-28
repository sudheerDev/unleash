import React, { Component } from 'react';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import _ from 'lodash';

class CuratedPaths extends Component {
  componentDidMount() {
    this.props.actions.fetchCuratedPaths();
  }

  renderPaths(paths) {
    return _.map(paths, path => (
      <ListItem
        key={path.id}
        primaryText={path.name}
      />
    ));
  }

  render() {
    const { curatedPaths: { list } } = this.props;
    return (
      <List>
        {this.renderPaths(list)}
      </List>
    );
  }
}

CuratedPaths.propTypes = {
  actions: React.PropTypes.object.isRequired,
  curatedPaths: React.PropTypes.object.isRequired
};

export default CuratedPaths;
