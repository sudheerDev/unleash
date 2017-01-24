import { get } from 'lodash';

const errorCodes = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  410: 'Gone',
  fallback: 'Unrecognized Error'
};

const errorMsg = {
  401: 'Oops! You are not logged in!',
  403: 'Oops! You do not have permissions to view this page!',
  404: 'Oops! You have come to the wrong link!',
  fallback: 'Oops! There was a problem with your request.'
};

function getErrorCode(code) {
  return get(errorCodes, code, errorCodes.fallback);
}

function getErrorMsg(code) {
  return get(errorMsg, code, errorMsg.fallback);
}

export {
  getErrorCode,
  getErrorMsg
};
