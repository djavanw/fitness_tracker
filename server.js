const express = require("express");
const mongoose = require("mongoose");

const apiRoute = require("./routers/apiRoute");
const viewRoute = require("./routers/viewRoute");

// Logger middleware
const morgan = require("morgan");

const PORT = process.env.PORT || 3070

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/fitness_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

// Make the routes
app.use(apiRoute);
app.use(viewRoute);

app.listen(PORT, () => {
    console.log(`The server is UP and running on port number ${PORT}`)
});