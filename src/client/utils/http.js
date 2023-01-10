const request = async params => {
  const { method = 'GET', url, headers = { 'Content-Type': 'application/json' }, body } = params;

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await window.fetch(url, config);

  return parseResponse(response);
};

const parseResponse = async response => {
  const { status, ok } = response;

  let data = {};
  if (ok) {
    data = (await response.json()) || {};
  }

  return {
    status,
    data,
  };
};

const get = async (url, headers) => {
  const response = await request({
    url,
    headers,
  });
  return response.data;
};

const post = async (url, headers, body) => {
  const response = await request({
    method: 'POST',
    url,
    headers,
    body,
  });

  return response.data;
};

const put = async (url, headers, body) => {
  const response = await request({
    method: 'PUT',
    url,
    headers,
    body,
  });

  return response.data;
};

const patch = async (url, headers, body) => {
  const response = await request({
    method: 'PATCH',
    url,
    headers,
    body,
  });

  return response.data;
};

const deleteRequest = async (url, headers) => {
  const response = await request({
    method: 'DELETE',
    url,
    headers,
  });

  return response.data;
};

export default {
  get,
  post,
  put,
  patch,
  delete: deleteRequest,
};
