const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3070

const app = express();

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

app.listen(PORT, () => {
    console.log(`The server is UP and running on port number ${PORT}`)
});