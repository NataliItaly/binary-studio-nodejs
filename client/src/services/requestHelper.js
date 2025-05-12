const apiUrl = "/api";

export const get = async (entityName, id = "") => {
  return await makeRequest(`${entityName}/${id}`, "GET");
};

export const post = async (entityName, body) => {
  return await makeRequest(entityName, "POST", body);
};

export const patch = async (entityName, id, body) => {
  return await makeRequest(`${entityName}/${id}`, "PATCH", body);
};

export const deleteReq = async (entityName, id) => {
  return await makeRequest(`${entityName}/${id}`, "DELETE");
};

const makeRequest = async (path, method, body) => {
  try {
    const url = `${apiUrl}/${path}`;
    const res = await fetch(url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: { "Content-Type": "application/json" },
    });

    const dataObj = await res.json();
    console.log(res);

    if (res.ok) {
      console.log(res);
      console.log(dataObj);
      return dataObj;
    }
    else {
console.log(dataObj?.message || 'Unknown error');

    alert(`${dataObj.message}`);
    return dataObj;
  } catch (err) {
    console.error(err);
  }
};
