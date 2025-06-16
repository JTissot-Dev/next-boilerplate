export const getFetcher = async (url: string, credentials?: boolean) => {
  return fetch(url, {
    method: "GET",
    credentials: credentials ? "include" : "omit",
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};

export const postFetcher = async (url: string, data: object) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};

export const putFetcher = async (url: string, data: object) => {
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};

export const patchFetcher = async (url: string, data: object) => {
  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};

export const deleteFetcher = async (url: string) => {
  return fetch(url, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};
