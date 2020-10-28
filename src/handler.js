const App = () => {
	let methods = [];
	const method_obj = (name = '', parameters = {}, handler = () => {}) => {
		return {
			name,
			parameters,
			handler,
		};
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

	const post = (method, params = [], handler) => methods.push(method_obj(method, params, handler));

	const match = (req, res = response) => {
		if (!requestPathValidator(req)) return res.send({ code: 404, result: 'Not Found: Missing Method' });
		const methodMatch = methodValidator(req, methods);
		if (!methodMatch)
			return res.send({ code: 404, result: `Not Found: ${req.pathInfo !== '' ? req.pathInfo + ' Is Not Recognized' : 'Method Is Not Recognized'}` });
		if (!parameterValidatorAll(req, methodMatch)) return res.send({ code: 400, result: 'Bad Request: Invalid Parameter(s)' });
		if (!parameterValidatorRequired(req, methodMatch)) return res.send({ code: 400, result: 'Bad Request: Required Parameter(s) Missing' });
		if (!parameterValidatorEmpty(req)) return res.send({ code: 400, result: 'Bad Request: Empty Parameter(s)' });
		if (!parameterValidatorType(req, methodMatch)) return res.send({ code: 400, result: 'Bad Request: Wrong Parameter(s) Type' });
		methodMatch.handler.apply(null, [req, res]);
	};

	const requestPathValidator = (request) => {
		// check if request object has a method field
		return request.hasOwnProperty('pathInfo');
	};
	const methodValidator = (request, methods) => {
		// check if request method is included in available methods
		// get the method object from methods array
		return methods.some((method) => method.name === request.pathInfo) ? methods.find((method) => method.name === request.pathInfo) : false;
	};
	const parameterValidatorAll = (request, methodMatch) => {
		// check if method parameters includes all request parameters
		return Object.keys(request.parameter).every((item) => methodMatch.parameters.find((param) => param.name === item));
	};
	const parameterValidatorRequired = (request, methodMatch) => {
		// check if all required parameters are included in request parameters
		return methodMatch.parameters.filter((item) => item.required == true).every((item) => Object.keys(request.parameter).includes(item.name));
	};
	const parameterValidatorEmpty = (request) => {
		const keys = Object.keys(request.parameter);
		return keys.every((key) => {
			return request.parameter[key] !== '';
		});
	};

	const parameterValidatorType = function (request, methodMatch) {
		return methodMatch.parameters.every((param) => {
			let reqParamType = typeof request.parameter[param.name];
			return param.type === reqParamType;
		});
	};

	const listen = () => {
		return (request, res = response) => {
			match(request);
			return res.end();
		};
	};
	return { post, listen };
};

function create() {
	return () => {
		return App();
	};
}