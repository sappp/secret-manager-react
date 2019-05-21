export const getAllSecrets = async () => {
  return fetch(`https://secret-manger-api.herokuapp.com/secrets`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  }).then(res => {
    let json;
    try {
      json = res.json();
    } catch (e) {
      json = e;
    }
    return json;
  });
};

export const getSecret = async (id) => {
  return fetch(`https://secret-manger-api.herokuapp.com/secrets/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  }).then(res => {
    let json;
    try {
      json = res.json();
    } catch (e) {
      json = e;
    }
    return json;
  });
};

export const addSecret = async (secert) => {
  return fetch(`https://secret-manger-api.herokuapp.com/secrets`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: secert.name,
      allowExport: false,
      text: secert.text,
    })
  }).then(res => {
    let json;
    try {
      json = res.json();
    } catch (e) {
      json = e;
    }
    return json;
  });
};

export const updateSecret = async (secert) => {
  return fetch(`https://secret-manger-api.herokuapp.com/secrets/${secert.id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: secert.name,
      allowExport: false,
      text: secert.text,
    })
  }).then(res => {
    let json;
    try {
      json = res.json();
    } catch (e) {
      json = e;
    }
    return json;
  });
};

export const deleteSecret = async (id) => {
  return fetch(`https://secret-manger-api.herokuapp.com/secrets/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  }).then(res => {
    let json;
    try {
      json = res.json();
    } catch (e) {
      json = e;
    }
    return json;
  });
};
