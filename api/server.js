const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/authRoute");

const app = express();

app.use(express.json());
app.use(cors({origin:'*'}));

mongoose.connect('mongodb+srv://root:root@cluster0.i09me.mongodb.net/TestDatabase?retryWrites=true&w=majority')
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
