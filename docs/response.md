# Response

## Methods

| Method                                | Return type | Brief description            |
| :------------------------------------ | :---------- | :--------------------------- |
| [code\(code\)](response.md#code-code) | Object      | Sets HTTP code.              |
| [send\(mess\)](response.md#send-mess) | Object      | Sets HTTP result message.    |
| [end\(\)](response.md#end)            | Object      | Returns the Response Object. |

## Detailed documentation

### code\(code\)

Sets the HTTP response code to the Response Object.

```javascript
// This code return the response object with the code 200
app.get('test', [{ name: 'message', type: 'string', required: true }], (req, res) => {
	res.code(200);
});
```

#### Parameters

| Name | Type   | Description                    |
| :--- | :----- | :----------------------------- |
| code | Number | The code of the HTTP response. |

### send\(mess\)

Adds the result message of the Response Object. If the Response object code is null, then it adds the response code 200.

```javascript
// This code return the response object with the result message "Hello World"
app.get('test', [{ name: 'message', type: 'string', required: true }], (req, res) => {
	res.send('Hello World');
});
```

#### Parameters

| Name | Type   | Description                                  |
| :--- | :----- | :------------------------------------------- |
| mess | String | The result message returned on HTTP request. |

### end\(\)

This method is used by[`app.listen()`](wa-api-handler.md#listen)method and returns a [Content service](https://developers.google.com/apps-script/guides/content) [`TextOutput`](https://developers.google.com/apps-script/reference/content/text-output)object, that has JSON MIME type.

{% hint style="danger" %}
You cannot use this method, this method is used only by`app.listen()`method!
{% endhint %}

Code sample:

{% code title="handler.js" %}

```javascript
...

end: () => {
			const response_obj = {
				ok: this.res_ok,
				code: this.res_code,
				result: this.res_result,
			};
			return ContentService.createTextOutput(JSON.stringify(response_obj)).setMimeType(ContentService.MimeType.JSON);
		}

...
```

{% endcode %}

### Response Object

The response object is used to return the information about the request to the caller.

#### Constructor

```javascript
{
    "ok": <true/false>,
    "code": <Number>,
    "result": <String>
}
```

#### Parameters

| Name   | Type    | Description                |
| :----- | :------ | :------------------------- |
| ok     | Boolean | The request success state. |
| code   | Number  | HTTP code response.        |
| result | String  | Response message.          |
