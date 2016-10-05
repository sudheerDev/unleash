import React, { Component } from 'react';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

class CurratedPaths extends Component {
  componentDidMount() {
    this.props.actions.fetchCurratedPaths();
  }

  render() {
    const { curratedPaths: { list } } = this.props;
    return (
      <List>
        {list.map(curratedPath => (
          <ListItem
            key={curratedPath.id}
            primaryText={curratedPath.name}
          />
        ))}
      </List>
    );
  }
}

CurratedPaths.propTypes = {
  actions: React.PropTypes.object.isRequired,
  curratedPaths: React.PropTypes.object.isRequired
};

export default CurratedPaths;
