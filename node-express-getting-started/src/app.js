const express = require("express"); // Require the Express Package and Assign it to a variable. 
const app = express(); // The Express package exports a function. 
                       // When you invoke that function, you get a new Express application and assign it to a variable.

const morgan = require("morgan"); // Required to use Morgan's logging 

app.use(morgan("dev")); //Put this before every middleware function

const middleware = (req, res, next) => {
    //req parameter stands for request: Information and methods related to the incoming request will be stored in this object.
    //res paramerter stands for response: This object has information and methods related to sending back a response from the server.
    //next parameter: When called, will tell Express that this middleware function is complete. It will then go on to the next piece of middleware.
};

    //Responsive Middleware: 
    const sayHello = (req, res, next) => {
        //return next(); //Will skip the code below and allow the sayHello2 to run  
        console.log("First");
        next(); 
        //res.send("Hello 1!"); //displays Hello on screen as a response 
        //res.send("Done.")
    }

    const sayHello2 = (req, res, next) => {
        console.log("Second"); 
        //res.send("Hello 2!"); //displays Hello on screen as a response 
        res.send("Done.");
    }


    //Nonresponsive Middleware: 
/*     const logging = (req, res, next) => {
        console.log("A request is being made!"); //Logs message in the command line
        next();
      }; */


      //app.use(logging); //uses the middleware function logging 
      app.use(sayHello); // uses the middleware function sayHello
      app.use(sayHello2); // Wont Render because of the earlier Responsive Function

module.exports = app; // Export the Express application to be used in the server.js file. 