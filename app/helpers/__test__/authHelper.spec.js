/* eslint-disable */
import { expect } from 'chai';
import authHelper from '../authHelper';

describe('Auth Helper', () => {

  it('should parse the email to get the username', () => {
    expect(authHelper.parseEmail('unleash@x-team.com')).to.equal('unleash');
    expect(authHelper.parseEmail('unleash@gmail.com')).to.equal('unleash');
    expect(authHelper.parseEmail('unstoppable@x-team.com')).to.equal('unstoppable');
    expect(authHelper.parseEmail('unstoppable@yahoo.com')).to.equal('unstoppable');
    expect(authHelper.parseEmail('username@aol.com')).to.equal('username');
    expect(authHelper.parseEmail('company@nba.com')).to.equal('company');
  });

  it('should parse a Firebase provider user to an Unleasher User for register', () => {
    const firebaseProviderUser = {
      displayName: 'Unleash Developer',
      email: 'unleash@x-team.com',
      uid: '1234abcde',
      photoURL: 'http://unleash.com/photo.png',
    };
    const expectedObject = {
      id: '1234abcde',
      fullName: 'Unleash Developer',
      isAdmin: false,
      picture: 'http://unleash.com/photo.png',
      firstName: 'Unleash',
      lastName: 'Developer',
      email: 'unleash@x-team.com',
      username: 'unleash',
    };
    expect(authHelper.setUpUnleashUser(firebaseProviderUser)).to.deep.equal(expectedObject);
  });
});
