/* eslint-disable */
import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import generate from '../../testUtils/fixtures';
import * as SkillActions from '../SkillActions';
import nock from 'nock';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import config from '../../../config';

describe('Skill Actions', () => {

  describe('Dispatch Actions', () => {
    const middlewares = [thunk];
    const store = configureStore(middlewares)();
    const dispatch = store.dispatch;

    afterEach(() => {
      store.clearActions();
      nock.cleanAll();
    });

    it('should call the dispatcher for skillList', () => {
      const path = '';

      const httpResponse = generate('skill', 15);
      const requestCall = nock(config.skills_api_url).get(path).reply(200, httpResponse);

      const expectedActions = [
        { type: SkillActions.SKILL.FETCH.START },
        { type: SkillActions.SKILL.FETCH.SUCCESS, skills: httpResponse }
      ];

      return dispatch(SkillActions.skillList()).then(() => {
        expect(requestCall.isDone()).to.be.true;
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });

  });

});
