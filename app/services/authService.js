import _ from 'lodash';
import { toastr } from 'react-redux-toastr';
import config from '../../config';
import UserActionCreator from '../actions/user/UserActionCreators';
import authHelper from '../helpers/authHelper';
import fetchHelper from '../helpers/fetchHelper';

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
      this.getUserById(userId).then(unleashUser => {
        if (unleashUser) {
          this.dispatch(UserActionCreator.userLogin(unleashUser));
          toastr.success('', `Welcome ${unleashUser.fullName}, unleash your potential today!`);
        } else {
          this.registerTheUser(userProviderData);
        }
      });
    } else {
      this.dispatch(UserActionCreator.userLogout());
    }
  }

  getUserById(userId) {
    return fetch(config.profiles_api_url).then(response => response.json()).then(result => {
      const user = _.find(result.Items, ['id', userId]);
      return user;
    })
    .catch(exception => {
      toastr.error('', exception);
    });
  }

  registerTheUser(userProviderData) {
    const newUser = authHelper.setUpUnleashUser(userProviderData);
    const parameters = fetchHelper.postOptions(newUser);
    return fetch(config.profiles_api_url, parameters).then(response => response.json()).then(() => {
      this.getUserById(newUser.id).then(unleashUser => {
        if (unleashUser) {
          this.dispatch(UserActionCreator.userLogin(unleashUser));
        } else {
          this.dispatch(UserActionCreator.userLogout());
        }
      });
    })
    .catch(() => {
      toastr.error('', 'There was a problem registering the user.');
    });
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
