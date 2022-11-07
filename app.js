"use strict";

//? Custom
const { rootDir, port, hostname } = require("./utils/config");
const serveStatics = require("./utils/serveStatic");
const getUrl = require("./utils/getUrl");
//? Core
const path = require("node:path");
//? NPM
const chalk = require("chalk");
const express = require("express");

//* binding
const app = express();

//! config
app.set("views", path.join(rootDir, "views"));
app.set("view engine", "ejs");

//! middleware
app.use(express.urlencoded({ extended: false }));
serveStatics(app);
app.use(getUrl);

//! routes
app.use(require("./routes/root"));
app.use(require("./routes/error")); //* 404

app.listen(port, hostname, () => {
    console.log(
        `-> Server is running on ${chalk.green(
            `${hostname}:${port} || localhost:${port}`
        )}`
    );
    console.log(
        `-> Welcome to ${chalk.bold.red(`PasswordManager`)} web application`
    );
});
