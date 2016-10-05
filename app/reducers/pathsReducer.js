/**
 * Unleash | pathsReducer.js
 * @author X-Team 2016 <http://www.x-team.com>
 * @author Kelvin De Moya <kelvin.demoya@x-team.com>
 */

import { PATHS } from '../actions/PathsActions';

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
    default:
      return paths;
  }
}

export default pathsReducer;
