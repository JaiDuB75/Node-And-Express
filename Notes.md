# Node and Express

## Project Configuration

Servers send information back to clients like your browser. This information could be text to read or it could be something more complicated, like credentials.

### What is Express?

Express is a minialist web framework for Node.js. Web frameworks are tools and software make building applications for the web easier.

```powershell
npm init -y // Creates a node package

npm install express@4 //installs the express web framework
```

### File Structure

Servers can be very complex so it is important to plan out the file structure of the server.

**Recommend:** You create a src folder inside the project that will hold app.js and server.js

The app.js file is where you will configure your Express application.
The server.js file is where you will run your Express application.

### The Express Application

The Following code **Initializes** an Express application:

```js
const express = require("express"); // Require the Express Package and Assign it to a variable.
const app = express(); // The Express package exports a function.
// When you invoke that function, you get a new Express application and assign it to a variable.

module.exports = app; // Export the Express application to be used in the server.js file.
```

### The Server File

The following code, when run, will allow your server to listen on the specified port.

```js
const { PORT = 5000 } = process.env; // Set the variable PORT to be equal to whatever value is found inside of process.env or default to 5000.
const app = require("./app"); // Requirer the Express application that you exported

const listener = () => console.log(`Listening on Port ${PORT}!`); // function will run when the server successfully starts
app.listen(PORT, listener); // The listen() methid on your Express application is what runs the server.
// It takes two arguments: port number and a function
// The PORT variable defines where your server is running, and the listener() function will get called as soon as the server has successfully started.
```

### Starting and Stopping

Inorder to run the server run the following command from your root directory:

```node
node ./src/server.js
```

You can also run the server by modifiying the package.json file.

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node src/server.js" //Add this statment, Allows you to run npm start to start the server
  },
```

### Running Multiple Servers

You can't runn multiple servers on the same port so you have to change the port when starting a new server.

This code runs the server on Port 4999:

```node
PORT=4999 npm start
```

### Make changes to your server

Once your server is running, it will not pick up any new changes that you make to it unless you restart it.

### The Nodemon Package

Each time that you make a change to your server, you have to start and stop it once again. Manually starting and stopping your server every time that you want to make changes to it would significantly slow down your development process.

The nodemon package will watch for any changes that happen to your server and automatically reload it for you.

To install the nodemon package run the following code:

```node
npm i nodemon --save-dev
```

Add nodemon to a script:

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },

...

  "devDependencies": {
    "nodemon": "^3.0.1" //Added when installing nodemon
  }

```

Use the follong command to run nodemon

```node
npm run dev
```

## Application-level Middleware

In this lesson, you will learn about an Express concept called application-level middleware. This concept will allow you to potentially configure every request coming in or going out of your server.

### What is Middleware?

The Milldleware refers to tasks that happen in-between Request from the client and Response from the server. **(In this context!)**

Example of Middleware Pipeline:

1. A request is made to the server for checking account details.

2. The request enters the first piece of middleware: logging. At this step, nothing more happens than a simple log() statement describing the request.

3. Check for user credentials. Depending on whether or not the user is logged in, the server will respond differently.

4. If the user is logged in, you respond with the requested information. If they aren't logged in, you respond with an error. You only respond once.

Steps two and three above act as middleware. They act on the request (in this example, logging) and help determine its outcome (in this example, checking for credentials).

### Express middleware parameters

In Express, middleware is represented through functions. The function will always have a similar function signature:

```js
//@ app.js

const middleware = (req, res, next) => {
  //Middleware function body
  //req parameter stands for request: Information and methods related to the incoming request will be stored in this object.
  //res paramerter stands for response: This object has information and methods related to sending back a response from the server.
  //next parameter: When called, will tell Express that this middleware function is complete. It will then go on to the next piece of middleware.
};
```

### Responsive Middleware

```js
//Responsive Middleware:
const sayHello = (req, res, next) => {
  res.send("Hello!"); //displays Hello on screen as a response
};
```

This middleware uses the send() method that comes on the res object. Calling send() in this way will send back the string to the client.

### Nonresponsive Middleware

```js
//Nonresponsive Middleware:
const logging = (req, res, next) => {
  console.log("A request is being made!"); //Logs message in the command line
  next();
};
```

This middleware doesn't respond. That is, it doesn't send a response back to the client. Instead, all it does is print to the console before moving on to the next piece of middleware.

### Creating Application-level Middleware

Attached to your Express application (app) is a method called use(). This method will allow you to attach middleware to the pipeline. You can use your middleware functions by doing the following:

```js
app.use(logging); //uses the middleware function logging
app.use(sayHello); // uses the middleware function sayHello
```

**Nonresponcive Middleware functions should be called first (Before the Responsive Middleware function)**

### The Morgan Package

The morgan package is a small logging package that will print useful information to your terminal window on each request.

```node
npm i morgan
```

```js
const morgan = require("morgan"); // Required to use Morgan's logging

app.use(morgan("dev")); //Put this before every middleware function
```

## Building Routes

So far, you have been sending requests to your server via a single URL: http://localhost:5000. But in the real world, users can visit different URLs to get different kinds of information from a website.

### What are Routes?

A route (or a path) is the part of the URL that comes after the domain name.

### Express Routes

Up until now, you have used the `app.use()` method to build middleware to handle requests. Express also has other methods to handle requests that correspond to the request's HTTP verb.

| HTTP Verb | Express Method |
| --------- | -------------- |
| DELETE    | `app.delete()` |
| GET       | `app.get()`    |
| POST      | `app.post()`   |
| PUT       | `app.put()`    |

The following Route in Express that will respond with the text `OK` when you go the URL

```js
app.get("/ping", (req, res) => {
  res.send("OK");
});
```

## Query and Route Parameters

### Query Parameters

```
https://www.google.com/search?q=javascript
```

In the URL above the content after the search is the **query string**

A query string is text that comes at the end of a URL following a question mark ?. It provides additional information to the given route and can contain multiple query parameters. A query parameter is a key-value pair in a query string.The key and the value are strings separated by an equals sign =. In the above example, the query parameter key is q and the value is javascript.

Inside of the route function, you can access query parameters by using req.query. This object will be empty if there are no parameters; otherwise, it will be an object of key-value pairs.

```js
app.get("/songs", (req, res) => {
  const title = req.query.title;
  res.send(title);
});
```

The route function above creates a title variable that holds the title of the query string.

### Route Parameters

```
https://www.thinkful.com/blog/tag/software-engineering/
https://www.thinkful.com/blog/tag/data-science/
```

These URLs are similar except for the last part of the route. If you were to build routes like this in your Express code, would you have two separate routes?
Answer: It dedpends, It is possible to use two different routes to return different information, but it is also possible to just use one with route parameters. 

Route parameters give you access to parts of a URL by storing the value in a variable. This means that part of the route can be swapped out with another value and potentially work.

```js
const saySomething = (req, res) => {
  const greeting = req.params.greeting;
  const content = `${greeting}!`;
  res.send(content);
};

app.get("/say/:greeting", saySomething); //This route will display greeting 
                                         //If the URL changes to /say/ it will return a 404 error
```

### Putting It all together

Example Code: 

```js
const sayHello = (req, res) => {
  console.log(req.query);
  const name = req.query.name; 
  const content = name ? `Hello, ${name}!` : "Hello!";
  res.send(content);
}

const saySomething = (req, res) => {
  const greeting = req.params.greeting;
  const name = req.query.name;

  const content = greeting && name ? `${greeting}, ${name}!` : `${greeting}!`;
  res.send(content);
};

app.get("/say/:greeting", saySomething); //This route will display greeting 
                                         //If the URL changes to /say/ it will return a 404 error


app.get("/songs", (req, res) => {
  const title = req.query.title;
  res.send(title);
});
```

## Error Handling

You will be able to create an error handler for the case where a route doesn't exist. You'll also be able to create a general error handler that can be triggered through the next() function.

You actually already have all the tools available to you to build a custom handler for this kind of issue. Recall the following:

- Express uses a middleware pipeline to determine how it should respond. When a request comes in, it will look at every route that it can to search for a match.

- If you provide a function as the first argument in app.use() and Express passes over it when looking for a matching route, that function will be run.

To handle an error where the route cannot be found, you can just create a new piece of middleware. This middleware should be put after all of your routes and doesn't need a specific string argument.

Example of Middleware that returns a message if the route is not found: 

```js
// Not-found handler
app.use((req, res, next) => {
  res.send(`The route ${req.path} does not exist!`);
});
```

### Error Handler

One common error is that the user may attempt to go to a route that is missing. But there are many more problems that could arise. Express has a special and slightly odd way of creating an error handler. It is exactly the same as other middleware, except for one feature: it has an extra parameter.

Example of Middleware that returns an error if the route is missing: 

```js
// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.send(err);
});
```

The error-handler middleware only gets called in one of two cases:

1. When there is a problem in the application itself (for example, if you made a mistake in your code).

2. When you specifically trigger it using the next() function in a previous middleware function.

### Triggering the error handler

Earlier, you learned that using the next() function that's available inside each piece of middleware will move the request to the next part of the middleware pipeline. Calling next() with an argument will move the request to the next error handler.

```js
app.get("/states/:abbreviation", (req, res, next) => {
    const abbreviation = req.params.abbreviation;
    if (abbreviation.length !== 2) {
      next("State abbreviation is invalid.");
    } else {
      res.send(`${abbreviation} is a nice state, I'd like to visit.`);
    }
  });
```

## Router-level Middleware

By the end of this lesson, you will be able to filter incoming requests to routes with router-level middleware.

Many of the routes that you create will have similar constraints. Although you can build the same kind of constraints into multiple routes, it's helpful to abstract common functionality into router-level middleware.

These routes are very similar in many ways. For example, they both check for whether or not the inputted abbreviation route parameter is exactly two characters. Although the above code will work, your code will be cleaner and easier to maintain if you abstract away the duplicated code: 

```js
app.get("/states/:abbreviation", (req, res, next) => {
  const abbreviation = req.params.abbreviation;
  if (abbreviation.length !== 2) {
    next("State abbreviation is invalid.");
  } else {
    res.send(`${abbreviation} is a nice state, I'd like to visit.`);
  }
});

app.get("/travel/:abbreviation", (req, res, next) => {
  const abbreviation = req.params.abbreviation;
  if (abbreviation.length !== 2) {
    next("State abbreviation is invalid.");
  } else {
    res.send(`Enjoy your trip to ${abbreviation}!`);
  }
});
```

### Creating Router-level Middleware

This duplicate code problem can be solved by building router-level middleware. Router-level middleware involves using a middleware function for specific routes. The function looks like all other middleware functions.

Take a look at the function below, which abstracts out the check for the abbreviation length:

```js
const checkForAbbreviationLength = (req, res, next) => {
  const abbreviation = req.params.abbreviation;
  if (abbreviation.length !== 2) {
    next("State abbreviation is invalid.");
  } else {
    next();
  }
};
```

