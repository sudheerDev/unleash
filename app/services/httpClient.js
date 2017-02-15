const errorPages = [401, 403, 404];

function handleResponse(res) {
  return Promise.all([res])
    .then(([response]) => {
      if (response.status < 200 || response.status >= 300) {
        if (errorPages.includes(response.status)) {
          location.href = `/error/${response.status}`;
          return response.json();
        }
        const error = new Error(response.json().message);
        error.body = response.json();
        throw error;
      }

      let responseBody = {};
      if (response.status !== 204) {
        responseBody = response.json();
      }

      return responseBody;
    });
}

function prepareRequestBody(method, data) {
  const options = {
    method,
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
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
  delete: (uri, data) => fetch(uri, prepareRequestBody('DELETE', data)).then(handleResponse),
};

export default HttpClient;
