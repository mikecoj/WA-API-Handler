# WA-API-Handler

## Methods

<table>
  <thead>
    <tr>
      <th style="text-align:left">Method</th>
      <th style="text-align:left">Return type</th>
      <th style="text-align:left">Brief description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><a href="wa-api-handler.md#get-method-params-callback">get(method, [params], callback)</a>
      </td>
      <td style="text-align:left">void</td>
      <td style="text-align:left">Defines HTTP GET methods.</td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="wa-api-handler.md#post-method-params-callback">post(method, [params], callback)</a>
      </td>
      <td style="text-align:left">void</td>
      <td style="text-align:left">Defines HTTP POST methods.</td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="wa-api-handler.md#listen">listen()</a>
      </td>
      <td style="text-align:left">function</td>
      <td style="text-align:left">
        <p>Return a function that handles</p>
        <p>HTTP GET/POST requests.</p>
      </td>
    </tr>
  </tbody>
</table>

## Detailed documentation

### get\(method, \[params\], callback\)

Routes HTTP GET requests to the specified method or path with the specified callback functions.This method is similar to the [post\(\)](wa-api-handler.md#post-method-params-callback) method

```javascript
// This code defines a new api GET method, nammed "test"
// Returns back the content of parameter "message"
app.get('test', [{ name: 'message', type: 'string', required: true }], (req, res) => {
	res.send(req.params.message);
});
```

#### Parameters

| Name     | Type     | Description                                                           |
| :------- | :------- | :-------------------------------------------------------------------- |
| method   | String   | The name for the GET method.                                          |
| params   | Array    | The array of [parameter objects](wa-api-handler.md#parameter-object). |
| callback | Function | The callback function of the method.                                  |

### post\(method, \[params\], callback\)

Routes HTTP POST requests to the specified method or path with the specified callback functions.This method is similar to the [get\(\) ](wa-api-handler.md#get-method-params-callback)method

```javascript
// This code defines a new api POST method, nammed "test"
// Returns back the content of parameter "message"
app.post('test', [{ name: 'message', type: 'string', required: true }], (req, res) => {
	res.send(req.params.message);
});
```

#### Parameters

| Name     | Type     | Description                          |
| :------- | :------- | :----------------------------------- |
| method   | String   | The name for the POST method.        |
| params   | Array    | The array of parameter objects.      |
| callback | Function | The callback function of the method. |

### listen\(\)

Returns a function that runs every time **doGet** or **doPost** are invoked whenever a HTTP request is made.

{% hint style="info" %}
This method needs to be assigned to a variable named **doGet/doPost.**
{% endhint %}

```javascript
/* 
This code defines the 'test" method and assign to the doGet variable the handler
function
*/
app.get('test', [{ name: 'message', type: 'string', required: true }], (req, res) => {
	res.send(req.params.message);
});

const doGet = app.listen();
```

> More about the **doGet/doPost** functions, please visit the link: [https://developers.google.com/apps-script/guides/web](https://developers.google.com/apps-script/guides/web)

### Parameter Object

The parameter object is used for defining the method's parameter\(s\), as well as for validation of the HTTP request parameter\(s\).

#### Constructor

`{ name: <String>, type: <String>, required: <true/false> }`

#### Properties

| Name     | Type    | Description                                                                               |
| :------- | :------ | :---------------------------------------------------------------------------------------- |
| name     | String  | The name of the parameter.                                                                |
| type     | String  | The parameter data type.                                                                  |
| required | Boolean | Set to **false** if the parameter is optional, and **true** if the parameter is required. |
