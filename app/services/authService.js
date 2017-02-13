import _ from 'lodash';
import { toastr } from 'react-redux-toastr';
import config from '../../config';
import * as UserActions from '../actions/UserActions';
import httpClient from './httpClient';
import authHelper from '../helpers/authHelper';

class AuthService {

  constructor(dispatch) {
    this.dispatch = dispatch;
  }

  init() {
    const firebaseConfig = {
      apiKey: config.firebaseApiKey,
      authDomain: config.firebaseAuthDomain,
      databaseURL: config.firebaseDatabaseURL,
      storageBucket: config.firebaseStorageBucket,
    };
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged(user => this.onAuthStateChanged(user));
  }

  onAuthStateChanged(user) {
    if (user) {
      const userProviderData = _.head(user.providerData);
      const userId = userProviderData.uid;
      this.dispatch(UserActions.startLoginProcess());
      this.getUserById(userId).then(unleashUser => {
        if (unleashUser) {
          this.dispatch(UserActions.userLogin(unleashUser));
          toastr.success('', `Welcome ${unleashUser.fullName}, unleash your potential today!`);
        } else {
          this.registerTheUser(userProviderData);
        }
      }).catch(() => {
        toastr.error('', 'There was a problem with the server, please try again.');
      });
    } else {
      this.dispatch(UserActions.userLogout());
    }
  }

  getUserById(userId) {
    return httpClient.get(config.profiles_api_url)
      .then(result => _.find(result.Items, ['id', userId]))
      .catch(exception => toastr.error('', exception));
  }

  registerTheUser(userProviderData) {
    const newUser = authHelper.setUpUnleashUser(userProviderData);
    return httpClient.post(config.profiles_api_url, newUser)
      .then(() => this.getUserById(newUser.id))
      .then(unleashUser => {
        if (unleashUser) {
          this.dispatch(UserActions.userLogin(unleashUser));
        } else {
          this.dispatch(UserActions.userLogout());
        }
      })
      .catch(() => toastr.error('', 'There was a problem registering the user.'));
  }

  static userLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    return firebase.auth().signInWithPopup(provider)
    .catch(() => {
      // Trigger when the user close the choose account modal.
    });
  }

  static userLogout() {
    return firebase.auth().signOut();
  }
}

export default AuthService;
