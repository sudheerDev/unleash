/**
 * Unleash | pathsReducer.js
 * @author X-Team 2016 <http://www.x-team.com>
 * @author Kelvin De Moya <kelvin.demoya@x-team.com>
 */

import { PATHS } from '../actions/PathsActions';
import _ from 'lodash';

function updatePath(paths, updatedPath) {
  return _.map(paths, (path) => {
    const shouldUpdate = path.id === updatedPath.id;
    return shouldUpdate ? Object.assign(path, updatedPath) : path;
  });
}

function pathsReducer(paths = [], action) {
  Object.freeze(paths);

  switch (action.type) {
    case PATHS.FETCH.SUCCESS:
      return action.paths;
    case PATHS.FETCH.FAILURE:
      return [];
    case PATHS.CREATE.SUCCESS:
      return action.paths;
    case PATHS.CREATE.FAILURE:
      return paths;
    case PATHS.UPDATE.SUCCESS:
      return updatePath(paths, action.paths);
    case PATHS.UPDATE.FAILURE:
      return paths;
    default:
      return paths;
  }
}

export default pathsReducer;
