const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv").config();
const authRoute = require("./routes/authRoute");

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_DB_URL)
.then(() => {
    console.log("Connected to the Database");
});

app.get('/', (req, res) => {
    res.send("Hello User!");
});

app.use('/api', authRoute);

let PORT = 3300;

app.listen(PORT, () => {
    console.log(`Server Started on Port: ${PORT}`);
});
