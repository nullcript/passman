"use strict";
const path = require("node:path");

const express = require("express");
const app = express();

const fullUrl = (req) => {
    return new URL(
        path.join(`${req.protocol}://${req.get("host")}${req.originalUrl}`)
    );
};

app.use((req, res, next) => {
    req.getUrl = fullUrl(req);
    return next();
});

module.exports = app;
