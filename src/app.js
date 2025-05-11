const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
var {connectDB} = require("./database/catalog.js");
var { roles, category } =  require("../src/utils/logentries.js");
var database = "not connected";

const app = express();


app.use(express.json());
app.use(
    cors({
        origin: "*",
        credentials: true,
        methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectDB().then(() => {
    database = "connected";
    console.log("Connect to mongodb");
}).catch((err) => {
    console.log(`connection error ${err}`);
})
app.get("/", (req, res) => {
    res.json("server" + database);
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});