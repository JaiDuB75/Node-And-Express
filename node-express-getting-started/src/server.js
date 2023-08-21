const { PORT = 5000 } = process.env; // Set the variable PORT to be equal to whatever value is found inside of process.env or default to 5000.
const app = require("./app"); // Requirer the Express application that you exported

const listener = () => console.log(`Listen on Port ${PORT}!`); // function will run when the server successfully starts
app.listen(PORT, listener); // The listen() methid on your Express application is what runs the server.
                            // It takes two arguments: port number and a function
                            // The PORT variable defines where your server is running, and the listener() function will get called as soon as the server has successfully started.