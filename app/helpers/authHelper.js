import words from 'lodash/words';

const parseEmail = email => email.match(/^([^@]*)@/)[1];

const setUpUnleashUser = userProviderData => ({
  id: userProviderData.uid,
  fullName: userProviderData.displayName,
  isAdmin: false,
  picture: userProviderData.photoURL,
  firstName: words(userProviderData.displayName)[0],
  lastName: words(userProviderData.displayName)[1],
  email: userProviderData.email,
  username: parseEmail(userProviderData.email),
});

export default {
  parseEmail,
  setUpUnleashUser,
};
