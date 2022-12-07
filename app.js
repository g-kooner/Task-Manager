/*
setup express server
if port already running :
lsof -i tcp:3000
kill -9 PID
*/
require("./db/connect");
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
//use the secret env variables need a npm package dotenv
require("dotenv").config();

//It parses incoming requests with JSON payloads
app.use(express.json());
//serves up public html files to view
app.use(express.static("./public"));

//routes
/*
summary of all routes 
conventions
REST API (PATTERN FOR HTTP REQUESTS) APPROACH FOR ROUTES CONTROLLER THAT PERFORM THESE SET OF TASKS (CRUD OPERATIONS ON OUR DATA)
app.get('/api/v1/tasks')  -get all the tasks
app.post('/api/v1/tasks/id')  -create new tasks
app.get('/api/v1/tasks/:id')  -get a single task
app.patch('/api/v1/tasks/:id')  -update tasks
app.delete('/api/v1/tasks/:id') -delete task 
*/

//pass in our own router
app.use("/api/v1/tasks", tasks);
//if url route requested doesnt match anything
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

//connect to db
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
