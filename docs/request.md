# Request

## Request Object

When an HTTP GET or POST request is made, Apps Script runs `doGet(e)`, respectively `doPost(e)` functions. In both cases, the `e` argument represents an event parameter that can contain information about request parameters. The application uses a parser to transform the `e` argument into a custom request object, allowing it to handle the requests much easier.

#### Constructor

```javascript
{
    type: "GET/POST",
    path: <String>,
    query: <String>,
    params: <Object>,
    method: <String>
}
```

#### Properties

| Name   | Type   | Description                                                                                    |
| :----- | :----- | :--------------------------------------------------------------------------------------------- |
| type   | String | Type of the HTTP request method.                                                               |
| path   | String | URL route path. By default is null.                                                            |
| query  | String | The URL parameters query string.                                                               |
| params | Object | The object were the kays are the name of the parameter and properties are the assigned values. |
| method | String | The API method.                                                                                |
