# Axios

- Document here: https://github.com/axios/axios

## Syntax
- `axios(url[, config])`

## JSON.stringify(value[, replacer[, space]])
- replacer -> A function that alters the behavior of the stringfication process, or an array of String and Number that server as an allowist for selecting/filtering the properties of the value object to be included in the JSON string. If this value is null or not provided, all properties of the object are included in the resulting JSON string.

## axios API
- Requests can be made by passing the relevant config to axios.

## axios instance
- `axios.create({ <fonfig> })` => e.g. `const instance = axios.create({ baseURL: "url" })`
- `instance({ <config> })`

## live-server
- `live-server`
- docs: https://www.npmjs.com/package/live-server
- response
	1. config
	2. data
	3. headers
	4. request
	5. status
	6. statusText
- https://jsonplaceholder.typicode.com/todos?_limit=5 => apiUrl/endpoint?param1=value1&param2=value2
- `axios({ <config> })` => e.g. `axios({ method: "GET", url: "<url>", params: { _limit: 5, } })`
- or `axios.<method>(<url>, { <config> })`

## HTML
```html
   <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossorigin="anonymous"
    />
```

## jsonplaceholder
- link: https://jsonplaceholder.typicode.com/

## HTTP/HTTPS Request

### Headers
```Json
{
  "cache-control": "no-cache",
  "content-type": "application/json; charset=utf-8",
  "expires": "-1",
  "pragma": "no-cache"
}
```

## HTTP Methods

`example config: config = { timeout: 5000 }` => the max time (unit: ms) that we want to make request before it stop

### GET
- method: "GET", url: `url`, data: (no need), etc.

### POST
- method: "POST", url: `url`, data: { key1: val1, key2: val2 }

### UPDATE (PUT/PATCH)
- PUT => replace the entire resources
- PATCH => update it incrementally

### DELETE
- method: "DELET", url: `url`

### Simaltaneout Request
- let say we wanna get both /posts and /todos at the same time
- we could make a request to get a /posts and inside the .then we could make another request to get a /todos
- `axios.all([<array of requests>])` => e.g. `axios.all([axios.get(url1, {}), axios.get(url2, {})])`
```JavaScript
 axios.all([
    axios.get(getApiUrl("/todos")),
    axios.get(getApiUrl("/posts"))
  ])
  .then(res => {
    console.log(res[0]);
    console.log(res[1]);
    showOutput(res[1]);
  })
  .catch(err => console.error(err));

// OR (BOTH ARE SAME)

axios.all([
    axios.get(getApiUrl("/todos")),
    axios.get(getApiUrl("/posts"))
  ])
  .then(axios.spread((todos, posts) => showOutput(posts)))
  .catch(err => console.error(err));
```

## CUSTOM HEADERS
- authentication with json web token
- validate login and get token
- then send token in a header to access protected route


## INTERCEPTING REQUESTS & RESPONSES
```JavaScript
axios.interceptors.request.use(config => {
  console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`);
  return config;
}, error => {
  return Promise.reject(error);
});
```

## Transfrom response
- transform your request or response

## JWT (Json Web Token)
- link: https://jwt.io/

## Alogithms
- HS256, ...