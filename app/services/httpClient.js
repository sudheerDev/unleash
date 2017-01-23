const errorPages = [401, 403, 404];

function handleResponse(res) {
  return Promise.all([res, res.json()])
    .then(([response, json]) => {
      if (response.status < 200 || response.status >= 300) {
        if (errorPages.includes(response.status)) {
          // TODO: create error page
          // location.href = `/error/${response.status}`;
          return json;
        }
        const error = new Error(json.message);
        error.body = json;
        throw error;
      }
      return json;
    });
}

function prepareRequestBody(method, data) {
  const options = {
    method,
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  return options;
}

const HttpClient = {
  get: uri => fetch(uri, { credentials: 'same-origin' }).then(handleResponse),
  post: (uri, data) => fetch(uri, prepareRequestBody('POST', data)).then(handleResponse),
  put: (uri, data) => fetch(uri, prepareRequestBody('PUT', data)).then(handleResponse),
  delete: (uri, data) => fetch(uri, prepareRequestBody('DELETE', data)).then(handleResponse)
};

export default HttpClient;
