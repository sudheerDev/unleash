import forOwn from 'lodash/forOwn';

const postOptions = (body) => ({
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
});

const urlEncodedPostOptions = (body) => {
  const formData = [];

  forOwn(body, (value, key) => {
    const encodedKey = encodeURIComponent(key);
    const encodedValue = encodeURIComponent(value);
    formData.push(`${encodedKey}=${encodedValue}`);
  });

  const requestBody = formData.join('&');

  return {
    method: 'POST',
    headers: {
      Accept: 'application/json, application/xml, text/plain, text/html, *.*',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: requestBody,
  };
};

export default {
  postOptions,
  urlEncodedPostOptions
};
