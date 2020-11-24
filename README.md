# WA-API-Handler

WA-API-Handler it's a Google App Script mini-library that helps to implement a REST API using Google Web App Deployment.
Inspired by [**Express.js**](https://expressjs.com/)

## Requirements

This mini-library uses **V8 Runtime** features. Make sure that your Google App Script project runs on **V8 Runtime** as well.

## Full Documentation

See the [Wiki](https://github.com/mikecoj/WA-API-Handler/wiki) for full documentation, examples and other information.

See the [GitBook](https://mikecoj.gitbook.io/wa-api-handler/) full documentation.

## Installation

There are two ways of installation:

- By adding the library as a dependency in the [`appsscript.json`](https://developers.google.com/apps-script/concepts/manifests) manifest file,
- By using the project key of the library.

---

### As Library Dependency

1. Open the script project in the Apps Script editor.
2. Select **View** > **Show project manifest.**

In the manifest file [`appsscript.json`](https://developers.google.com/apps-script/manifest, 'Manifest structure'), add the following JSON code:

```JSON
...

"dependencies": {
    "libraries": [
        {
            "userSymbol": "WAAPIHandler",
            "libraryId": "1IIS-a35WBSW7-EoaDXn7eR7rVDu3a_2UXMjQTgje1s19c9t07cKe7NnH",
            "version": "9"
        }
    ]
},

...

"runtimeVersion": "V8"
```

### Using Project Key

1. Open the script project in the Apps Script editor.
2. Select **Resources** > **Libraries...**
3. Add the project key `MGt8lWqnUOuuEinn9P7aMWDKJ-XLPX7pf` in the **Find a Library** input field and click **Select**.
4. Select the last version of the library in the **Version** field.

## Usage

### Initialization

```javascript
const handler = WAAPIHandler.create();
const app = handler();
```

### Methods Declaration

**app.get(METHOD, [parameter object], callback)**

Routes HTTP GET requests to the specified method or path with the specified callback functions.

**app.post(METHOD, [parameter object], callback)**

Routes HTTP POST requests to the specified method or path with the specified callback functions.

Example:

```javascript
app.get('test', [{ name: 'message', type: 'string', required: true }], (req, res) => res.send(req.params.message));
```

### Listening

**app.listen()**

This method needs to be assigned to a variable named **doGet/doPost.**
Returns a function that runs every time **doGet/doPost** is called.

```javascript
const doGet = doPost = app.listen();
```

## Deployment

Deploy the script as a [Webb App](https://developers.google.com/apps-script/guides/web), and use the web app URL as your API URL.

## Hello world example

Create a new Google App Script project and add the following code:

```javascript
const handler = WAAPIHandler.create();
const app = handler();

app.get('test', [{ name: 'message', type: 'string', required: true }], (req, res) => {
	res.send(req.params.message);
});

const doGet = doPost = app.listen();
```

Deploy the code as a Web App.

Open your browser and access one of the two links below:

`https://script.google.com/macros/s/<webapp_key>/exec?method=test&message=Hello%20World`

`https://script.google.com/macros/s/<webapp_key>/exec/test?message=Hello%20World`

Response:

```JSON
{
    "ok": true,
    "code": 200,
    "result": "Hello World"
}
```

## License

[MIT](LICENSE)
