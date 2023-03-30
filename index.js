const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const PORT = 8000;
const mongoose = require("mongoose");

const app = express();
const router = require("./router");



app.listen(PORT, async () => {
    console.log(`server up on port ${PORT}`);
});
mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(router);
console.log(process.env.MONGODB_URL)