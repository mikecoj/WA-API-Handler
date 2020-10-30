const App = () => {
	let methods = [];
	let req = {};
	const method_obj = (type = '', name = '', parameters = {}, handler = () => {}) => {
		return {
			type,
			name,
			parameters,
			handler,
		};
	};
	const requestParser = (request) => {
		const type = request.hasOwnProperty('postData') ? 'POST' : 'GET';
		const path = request.hasOwnProperty('pathInfo') ? request.pathInfo : null;
		const query = request.hasOwnProperty('postData') ? request.postData.contents : request.queryString;
		const params = jsonParser(request.parameter);
		const method = path == null && params.hasOwnProperty('method') ? params.method : path;
		req = { type, path, query, params, method };
	};
	const jsonParser = (object) => {
		let objParsed = {};
		for (const [key, value] of Object.entries(object)) {
			try {
				objParsed[key] = JSON.parse(value);
			} catch (err) {
				objParsed[key] = value;
			}
		}
		return objParsed;
	};
	const response = {
		res_ok: false,
		res_code: null,
		res_result: null,
		code: (code = 404) => {
			code === 200 ? (this.res_ok = true) : (this.res_ok = false);
			this.res_code = code;
			return response;
		},
		send: (mess = '') => {
			if (typeof mess === 'string') {
				if (this.res_code == null) {
					this.res_ok = true;
					this.res_code = 200;
				}
				this.res_result = mess;
			} else if (typeof mess === 'object') {
				mess.code === 200 ? (this.res_ok = true) : (this.res_ok = false);
				this.res_code = mess.code;
				this.res_result = mess.result;
			}
			return response;
		},
		end: () => {
			const response_obj = {
				ok: this.res_ok,
				code: this.res_code,
				result: this.res_result,
			};
			return ContentService.createTextOutput(JSON.stringify(response_obj)).setMimeType(ContentService.MimeType.JSON);
		},
	};

	const post = (method, params = [], handler) => methods.push(method_obj('POST', method, params, handler));
	const get = (method, params = [], handler) => methods.push(method_obj('GET', method, params, handler));

	const handle = (request, res) => {
		requestParser(request);
		if (match(req, res)) {
			const methodMatch = methods.find((method) => method.name === req.method);
			methodMatch.handler.apply(null, [req, res]);
		}
	};

	const match = (req, res) => {
		if (req.method == null) {
			res.send({ code: 404, result: 'Not Found: Missing Method' });
			return false;
		}
		if (!methodValidator(req, methods)) {
			res.send({ code: 404, result: `Not Found: ${req.method !== '' ? req.method + ' Is Not Recognized' : 'Unrecognized Method'}` });
			return false;
		}

		const methodMatch = methods.find((method) => method.name === req.method);
		if (!parameterValidatorAll(req, methodMatch)) {
			res.send({ code: 400, result: 'Bad Request: Invalid Parameter(s)' });
			return false;
		}
		if (!parameterValidatorRequired(req, methodMatch)) {
			res.send({ code: 400, result: 'Bad Request: Required Parameter(s) Missing' });
			return false;
		}
		if (!parameterValidatorEmpty(req)) {
			res.send({ code: 400, result: 'Bad Request: Empty Parameter(s)' });
			return false;
		}
		if (!parameterValidatorType(req, methodMatch)) {
			res.send({ code: 400, result: 'Bad Request: Wrong Parameter(s) Type' });
			return false;
		}
		return true;
	};

	const methodValidator = (request, methods) => {
		// check if request method is included in available methods
		const methodByType = methods.filter((method) => method.type === request.type);
		return methodByType.some((method) => method.name === request.method);
	};
	const parameterValidatorAll = (request, methodMatch) => {
		// check if method parameters includes all request parameters
		const reqParams = Object.keys(request.params).filter((item) => item !== 'method');
		return reqParams.every((item) => methodMatch.parameters.find((param) => param.name === item));
	};
	const parameterValidatorRequired = (request, methodMatch) => {
		// check if all required parameters are included in request parameters
		return methodMatch.parameters.filter((item) => item.required == true).every((item) => Object.keys(request.params).includes(item.name));
	};
	const parameterValidatorEmpty = (request) => {
		const keys = Object.keys(request.params);
		return keys.every((key) => {
			return request.params[key] !== '';
		});
	};

	const parameterValidatorType = (request, methodMatch) => {
		const params = Object.keys(request.params).filter((item) => item !== 'method');
		return params.every((param) => {
			const reqParamType = typeof request.params[param];
			const methodParam = methodMatch.parameters.find((item) => item.name === param);
			return methodParam.type === reqParamType;
		});
	};

	const listen = () => {
		return (req, res = response) => {
			handle(req, res);
			return res.end();
		};
	};
	return { get, post, listen };
};

function create() {
	return () => {
		return App();
	};
}
