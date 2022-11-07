"use strict";

const express = require("express");
const path = require("node:path");
const { rootDir } = require("./config");

const serveStatics = (app) => {
    app.use(express.static(path.join(rootDir, "public")));
    app.use(express.static(path.join(rootDir, "node_modules/bootstrap/dist")));
    app.use(express.static(path.join(rootDir, "node_modules/font-awesome")));
};

module.exports = serveStatics;
