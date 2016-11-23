import { expect } from 'chai';
import fetchHelper from '../fetchHelper';

describe('Fetch Helper', () => {
  it('should add POST method, set the headers and stringify the body', () => {
    const parameters = {
      name: 'Unleash',
      password: '123456-ABCDE'
    };
    const expectedObject = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(parameters)
    };
    expect(fetchHelper.postOptions(parameters)).to.deep.equal(expectedObject);
  });

  it('should add POST method, set the headers and the url encoded to the body', () => {
    const parameters = {
      name: 'Unleash',
      password: '123456-ABCDE'
    };
    const expectedObject = {
      method: 'POST',
      headers: {
        Accept: 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'name=Unleash&password=123456-ABCDE'
    };
    expect(fetchHelper.urlEncodedPostOptions(parameters)).to.deep.equal(expectedObject);
  });
});
