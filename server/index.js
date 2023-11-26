const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

const dataRoute = require('./routes/index');
const userRoute = require('./routes/user'); 
const { checkForAuthenticationCookie } = require("./middlewares/authentication");

mongoose.connect("mongodb://127.0.0.1:27017/SCM").then(e => console.log("MongoDB connected"));

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.use("/",dataRoute);
app.use("/user",userRoute);


const PORT = 8000;

app.listen(PORT, () => console.log(`Server started at PORT : ${PORT}`));