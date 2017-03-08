/**
 * Unleash | pathsReducer.js
 * @author X-Team 2016 <http://www.x-team.com>
 * @author Kelvin De Moya <kelvin.demoya@x-team.com>
 * @author Rubens Mariuzzo <rubens@x-team.com>
 */

import map from 'lodash/map';
import keyBy from 'lodash/keyBy';
import reject from 'lodash/reject';
import cloneDeep from 'lodash/cloneDeep';
import { PATHS } from '../actions/PathsActions';

/**
 * Create a new array as the result of merging matching objects in two given arrays.
 * @param  {array}  arrA       An array.
 * @param  {array}  arrB       An array.
 * @param  {String} [key='id'] The field used as the key to match elements.
 * @return {array}             The merge result.
 */
function merge(arrA, arrB, key = 'id') {
  const hash = keyBy(arrB, key);
  return map(arrA, item => Object.assign(item, hash[item[key]]));
}

/**
 * Remove given path from a list of paths
 *
 * @param {Array} pathsList - paths to filter
 * @param {String} pathId - Id of path to remove
 * @return {*}
 */
function removePath(pathsList, pathId) {
  return pathsList.filter(path => path.id !== pathId);
}

const initialState = {
  isLoading: false,
  list: [],
  goals: [],
};

function pathsReducer(state = initialState, action) {
  Object.freeze(state);
  const { paths, goal, errors = [] } = action;
  let goals;

  switch (action.type) {
    case PATHS.FETCH.START:
      return { ...state, errors, isLoading: true };
    case PATHS.FETCH.SUCCESS:
      return { ...state, errors, isLoading: false, list: paths };
    case PATHS.FETCH.FAILURE:
      return { ...state, errors, isLoading: false, list: [] };
    case PATHS.CREATE.START:
      return { ...state, errors, isLoading: true };
    case PATHS.CREATE.SUCCESS:
      return { ...state, errors, isLoading: false, list: paths };
    case PATHS.CREATE.FAILURE:
      return { ...state, errors, isLoading: false };
    case PATHS.UPDATE.START:
      return { ...state, errors, isLoading: true };
    case PATHS.UPDATE.SUCCESS:
      // The API return the affected path object.
      return { ...state, errors, isLoading: false, list: merge(state.list, [paths]) };
    case PATHS.UPDATE.FAILURE:
      return { ...state, errors, isLoading: false };
    case PATHS.REMOVE.START:
      return { ...state, errors, isLoading: true };
    case PATHS.REMOVE.SUCCESS:
      return { ...state, errors, isLoading: false, list: removePath(state.list, action.pathId) };
    case PATHS.REMOVE.FAILURE:
      return { ...state, errors, isLoading: false };
    case PATHS.UPDATE_GOAL.START:
      goals = cloneDeep(state.goals);
      goals.push(goal);
      return { ...state, errors, isLoading: false, goals };
    case PATHS.UPDATE_GOAL.SUCCESS:
      goals = reject(state.goals, ['id', goal.id]);
      // The API return an array of path objects in `paths`.
      return { ...state, errors, isLoading: false, list: merge(state.list, paths), goals };
    case PATHS.UPDATE_GOAL.FAILURE:
      goals = reject(state.goals, ['id', goal.id]);
      return { ...state, errors, isLoading: false, goals };
    default:
      return state;
  }
}

export default pathsReducer;
