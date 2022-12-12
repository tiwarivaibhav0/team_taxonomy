// Get and Post Methods
export const __get = (url:any, headers:any={}) => {
    return fetch(url, {
      headers: headers,
    }).then((res) => res.json());
  };
  
  export const __post = (url:any, headers:any={}, payload?:object,) => {
    return fetch(url, {
      method: "POST",
      headers: headers,
      body:JSON.stringify(payload),
    }).then((res) => res.json());
  };