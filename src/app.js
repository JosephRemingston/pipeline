const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
var {connectDB} = require("./database/catalog.js");
var { roles, category } =  require("../src/utils/logentries.js");


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
    console.log("Connect to mongodb");
}).catch((err) => {
    console.log(`connection error ${err}`);
})
app.get("/", (req, res) => {
    res.json("server");
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
