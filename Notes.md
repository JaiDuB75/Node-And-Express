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
    }
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
|-----------|----------------|
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