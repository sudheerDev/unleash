import React, { Component } from 'react';
import { routerShape } from 'react-router/lib/PropTypes';
import DefaultHero from '../assets/default_hero.jpg';

let styles = {};

class UserCard extends Component {
  handleProfileSelect(userId) {
    this.props.router.push(`/profiles/${userId}`);
  }

  render() {
    const { user } = this.props;
    // @TODO: (Kelvin De Moya) - Update after deciding if it should be checked here or by the API.
    const googleDefaultImage = 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg'; // eslint-disable-line
    const userUrl = user.picture === googleDefaultImage ? DefaultHero : user.picture || DefaultHero;

    return (
      <div className="user" onClick={() => this.handleProfileSelect(user.id)} style={styles.user}>
        <img style={styles.avatar} src={userUrl} alt={user.firstName} />
        <div style={styles.name}>{user.fullName}</div>
      </div>
    );
  }
}

UserCard.propTypes = {
  user: React.PropTypes.shape({
    id: React.PropTypes.string,
    picture: React.PropTypes.string,
    firstName: React.PropTypes.string,
    fullName: React.PropTypes.string,
  }).isRequired,
  router: routerShape.isRequired,
};

styles = {
  user: {
    width: '180px',
    position: 'relative',
    margin: '30px',
    cursor: 'pointer',
  },
  avatar: {
    width: '100%',
    height: '180px',
    borderRadius: '100px',
  },
  name: {
    position: 'absolute',
    width: '80%',
    backgroundColor: '#413c4f',
    margin: '0 auto',
    textAlign: 'center',
    bottom: 0,
    left: '5%',
    color: '#f3f2f6',
    padding: '10px',
    borderRadius: '5px',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '16px',
  },
};

export default UserCard;
