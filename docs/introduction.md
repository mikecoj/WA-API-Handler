---
description: >-
  WA-API-Handler it's a Google App Script  helper class that helps to implement a
  REST API using Google Web App Deployment.
---

# Introduction

## Requirements

WA-API-Handler uses **V8 Runtime** features. Make sure that your Google App Script project runs on **V8 Runtime** as well.

## Installation

WA-API-Handler can be installed in two ways.

- By adding the library as a dependency in the [`appsscript.json`](https://developers.google.com/apps-script/concepts/manifests) manifest file,
- By using the project key of the library.

### Library Dependency

1. Open the script project in the Apps Script editor.
2. Select **View** &gt; **Show project manifest.**

In the manifest file [`appsscript.json`](https://developers.google.com/apps-script/manifest,), add the following JSON code:

```javascript
{
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
}
```

### Using Project Key

1. Open the script project in the Apps Script editor.
2. Select **Resources** &gt; **Libraries...**
3. Add the project key `MGt8lWqnUOuuEinn9P7aMWDKJ-XLPX7pf` in the **Find a Library** input field and click **Select**.
4. Select the last version of the library in the **Version** field.

## Usage

### Initialization

```javascript
const handler = WAAPIHandler.create();
const app = handler();
```

### Methods Declaration

**`app.get()`**

Defines a GET HTTP method and routes it to the specified method with the specified callback function.

```javascript
/* This code defines a method named "test",
containing a required parameter "message"
and sends back the value of "message" parmeter as a response.
*/
app.get('test', [{ name: 'message', type: 'string', required: true }], (req, res) => res.send(req.params.message));
```

### Listening

**`app.listen()`**

Returns a function that runs every time **doGet/doPost** is called.

```javascript
const doGet = app.listen();
```

## Example

Create a new Google App Script project and add the following code:

```javascript
const handler = WAAPIHandler.create();
const app = handler();

app.get('test', [{ name: 'message', type: 'string', required: true }], (req, res) => {
	res.send(req.params.message);
});

const doGet = (doPost = app.listen());
```

Deploy the code as a Web App.

Open your browser and access one of the two links below:

[`https://script.google.com/macros/s/<webapp_key>/exec?method=test&message=Hello%20World`](https://script.google.com/macros/s/<webapp_key>/exec?method=test&message=Hello%20World)\`\`

[`https://script.google.com/macros/s/<webapp_key>/exec/test?message=Hello%20World`](https://script.google.com/macros/s/<webapp_key>/exec/test?message=Hello%20World)\`\`

You should get the following response:

```text
{
    "ok": true,
    "code": 200,
    "result": "Hello World"
}
```
