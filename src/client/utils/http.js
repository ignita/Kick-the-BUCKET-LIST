class ResponseError extends Error {
  constructor(message, res) {
    super(message);
    this.response = res;
  }
}

const fetchRequest = async params => {
  const { method = 'GET', url, headers = { 'Content-Type': 'application/json' }, body } = params;

  let config = {
    method,
    headers,
  };

  if (body) {
    config.body = body;
  }

  const res = await fetch(url, config);

  if (!res.ok) {
    throw new ResponseError('bad fetch', res);
  }

  return {
    data: res.json(),
  };
};

const get = async (url, headers) => {
  try {
    const response = await fetchRequest({
      url,
      headers,
    });
    return response.data;
  } catch (err) {
    const { message, response } = err;
    console.log(message, response.status);
  }
};

const post = async (url, headers, body) => {
  try {
    const response = await fetchRequest({
      method: 'POST',
      url,
      headers,
      body,
    });

    return response.data;
  } catch (err) {
    const { message, response } = err;
    console.log(message, response.status);
  }
};

const put = async (url, headers, body) => {
  try {
    const response = await fetchRequest({
      method: 'PUT',
      url,
      headers,
      body,
    });

    return response.data;
  } catch (err) {
    const { message, response } = err;
    console.log(message, response.status);
  }
};

const patch = async (url, headers, body) => {
  try {
    const response = await fetchRequest({
      method: 'PATCH',
      url,
      headers,
      body,
    });

    return response.data;
  } catch (err) {
    const { message, response } = err;
    console.log(message, response.status);
  }
};

const deleteRequest = async (url, headers) => {
  try {
    const response = await fetchRequest({
      method: 'DELETE',
      url,
      headers,
    });

    return response.data;
  } catch (err) {
    const { message, response } = err;
    console.log(message, response.status);
  }
};

export default {
  get,
  post,
  put,
  patch,
  delete: deleteRequest,
};
