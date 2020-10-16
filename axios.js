const base_url = "https://jsonplaceholder.typicode.com";
const headerElem = document.getElementById("header");
const dataElem = document.getElementById("data");
dataElem.style.height = "400px";
dataElem.style.overflow = "auto";
const configElem = document.getElementById("config");


function showOutput(res) {
	headerElem.innerHTML = JSON.stringify(res.headers, null, 2);
	dataElem.innerHTML = JSON.stringify(res.data, null, 2);
	configElem.innerHTML = JSON.stringify(res.config, null, 2);
}

function getApiUrl(endPoint) {
	return base_url + endPoint;
}

function getAxiosPromise(method, endPoint, config) {
	return axios({
		method: method.toUpperCase(),
		url: getApiUrl(endPoint),
		...config
	});
}

function apiRequest(method, endPoint, config) {
	axios({
		method: method.toUpperCase(),
		url: getApiUrl(endPoint),
		...config,
	})
	.then(res => {
		console.log(res);
		showOutput(res);
	})
	.catch(err => console.error(err));
}

// --- GET
// apiRequest("get", "/posts", { params: { _limit: 5 } }); 

// --- POST
// apiRequest("post", "/posts", { data: { name: "Mohamed Salah", team: "Liverpool" } });

// --- Performing multiple concurrent requests
function multipleConcurrentRequests() {
	const axiosPostsPromise = getAxiosPromise("get", "/posts", {});
	const axiosTodosPromise = getAxiosPromise("get", "/todos", {});

	// Promise.resolve(axiosPostsPromise).then(res => showOutput(res));

	Promise.all([axiosPostsPromise, axiosTodosPromise])
	.then(results => {
		const posts = results[0];
		const todos = results[1];
		showOutput(posts);
	});
}
// multipleConcurrentRequests();

// --- axios API
function customConfig() {
	const config = {
		method: "GET",
		url: getApiUrl("/todos"),
		params: {
			_limit: 10,
		}
	}
	axios(config).then(res => showOutput(res)).catch(err => console.error(err));
}

// --- Creating an instance
function instanceMethods() {
	const axiosInstance = axios.create({
		baseURL: base_url,
		timeout: 1000,
		headers: { "X-Custom-Header": "foobar" },
	});
	axiosInstance.get("posts").then(res => showOutput(res)).catch(err => console.error(err));
}

// --- Config Defaults
function configDefaults() {
	const instance = axios.create({
		baseURL: base_url,
	});
	instance.defaults.headers.common["Authorization"] = "sometoken";
	instance.defaults.timeout = 2500;
	// --- Config order of precedence
	// Config will be mergerd with an order of precedence.
	instance({
		url: "todos",
		method: "get",
		timeout: 5,
	})
	.then(res => console.log(res))
	.catch(err => console.error(err));
}
// configDefaults();

// --- Interceptors
function interceptors() {
	// You can intercept requests or responses before they are handled by then or catch.
	// --- Add a request interceptor
	const myRequestInterceptor = axios.interceptors.request.use(function(config) {
		console.log(`${config.method} request sent to ${config.url}`);
	}, function(error) {
		return Promise.reject(error);
	});
	// --- Add a response interceptor
	const myResponseInterceptor = axios.interceptors.response.use(function(response) {
		console.log(response);
	}, function(error) {
		return Promise.reject(error);
	});
	// --- remove an interceptor
	function removeInterceptor() {
		axios.interceptors.request.eject(myRequestInterceptor);
		axios.interceptors.response.eject(myResponseInterceptor);
	}
	removeInterceptor();
	apiRequest("get", "/todos", {});
}
// interceptors();

// --- Handling Errors
function handlingErrors() {
	axios.get("/asfas")
	.catch(err => {
		if (err.response) {
			console.log(err.response);
		} else if (err.request) {
			// The request was made but no response was received
			console.log(err.request);
		} else {
			console.log("Error", err.message);
		}
		// Using toJSON you get an object with more information about the HTTP error.
		console.log(err.toJSON());
	});
}
// handlingErrors();

// --- Cancellation
function cancellation() {
	// You can cancel a request using a cancel token
	// * The axios cancel token API is based on the withdrawn cancelable promises proposal
	const CancelToken = axios.CancelToken;
	const source = CancelToken.source();
	axios.get(getApiUrl("/todos"), {
		cancelToken: source.token,
	})
	.then(res => console.log(res))
	.catch(function(thrown) {
		if (axios.isCancel(thrown)) {
			console.log("Request canceled", thrown.message);
		} else {
			// handle error
		}
	});
	// conditional to cancel the request
	if (true) {
		source.cancel("Operation canceled by the user.");
	}
}
// cancellation();

// --- Browser
function browser() {
	// In a browser, you can use the URLSearchParams API as follows
	const params = new URLSearchParams();
	params.append("_limit", 5);
	axios.get(getApiUrl("/posts"), params)
	.then(res => console.log(res))
	.catch(err => console.error(err));
	// !Note that URLSearchParams is not supported by all browsers.
}
browser();