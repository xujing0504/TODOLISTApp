export async function apiCall(
  endpoint,
  { method, body, label = "", ...customConfig } = {}
) {
  const headers = { "Content-Type": "application/json" };
  const config = {
    method: method,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  let data;
  try {
    const response = await fetch(endpoint, config);
    data = method === "GET" ? await response.json() : undefined;
    return {
      status: response.status,
      data,
    };
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
}

apiCall.get = function (endpoint, customConfig = {}) {
  return apiCall(endpoint, { ...customConfig, method: "GET" });
};

apiCall.post = function (endpoint, body, customConfig = {}) {
  return apiCall(endpoint, { ...customConfig, method: "POST", body });
};

apiCall.put = function (endpoint, body, customConfig = {}) {
  return apiCall(endpoint, { ...customConfig, method: "PUT", body });
};

apiCall.delete = function (endpoint, label, customConfig = {}) {
  return apiCall(endpoint, { ...customConfig, method: "DELETE", label });
};
