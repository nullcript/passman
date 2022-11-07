"use strict";

const path = require("node:path");
const { rootDir } = require("../utils/config");
const PassMan = require("../model/model");

const express = require("express");
const router = express.Router();

//************************* / route
router.get("/", (req, res) => {
    res.render("index", {
        title: "PassMan",
        pageTitle: "home",
    });
});

//************************* /add route
router
    .route("/add")
    .get((req, res) => {
        res.render("add", {
            pageTitle: "add",
        });
    })
    .post((req, res) => {
        let newPass = new PassMan(req.body);
        newPass.save();
        res.redirect("/add");
    });

//************************* /remove route
router
    .route("/remove")
    .get((req, res) => {
        res.render("remove", {
            pageTitle: "remove",
        });
    })
    .post((req, res) => {
        PassMan.remove(req.body.passID);
        res.redirect("/remove");
    });

//************************* /list route
router.route("/list").get(async (req, res) => {
    let data = await PassMan.fetchAll();
    res.render("list", {
        pageTitle: "list",
        data,
    });
});

module.exports = router;
