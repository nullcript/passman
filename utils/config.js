"use strict";

const path = require("node:path");
const fse = require("fs-extra");

const rootDir = path.dirname(require.main.filename);
const port = process.env.PORT | 3000;
const hostname = "127.0.0.1";

const getDataFromDB = async (filePath) => {
    try {
        let data = await fse.readFile(filePath, "utf8");
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

const saveDataToDB = async (filePath, data, text) => {
    try {
        await fse.writeFile(filePath, JSON.stringify(data, null, 4));
        console.log(text);
    } catch (err) {
        console.log("Error while saveDataToDB");
    }
};

const getDataFromDB_cbf = (filePath, callback) => {
    fse.readFile(filePath, "utf8", (err, data) => {
        if (err) callback([]);
        callback(JSON.parse(data));
    });
};

const saveDataToDB_cbf = (filePath, data) => {
    fse.writeFile(filePath, JSON.stringify(data, null, 4), (err) => {
        if (err) throw err;
        console.log("saveDataToDB successful");
    });
};

module.exports = {
    rootDir,
    port,
    hostname,
    getDataFromDB,
    saveDataToDB,
    getDataFromDB_cbf,
    saveDataToDB_cbf,
};
