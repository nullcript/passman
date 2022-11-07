"use strict";

const { getDataFromDB, saveDataToDB, rootDir } = require("../utils/config");
const { gtj } = require("../utils/jalali");

const { v4: uuidv4 } = require("uuid");
const fs = require("fs-extra");

const path = require("path");

const filePath = path.join(rootDir, "data/db.json");

class PassMan {
    constructor({ username, password, comment }) {
        let d = new Date();
        this.username = username;
        this.password = password;
        this.comment = comment;
        this.id = uuidv4();
        this.date = `${gtj(
            d.getFullYear(),
            d.getMonth() + 1,
            d.getDate()
        )} | ${d.toLocaleTimeString()}`;
    }
    async save() {
        try {
            let data = await getDataFromDB(filePath);
            data.push(this);
            await saveDataToDB(filePath, data, "Data saved successfully");
        } catch (err) {
            console.log("Error while save()");
        }
    }

    static async remove(id) {
        try {
            let data = await getDataFromDB(filePath);
            let filterdData = data.filter((v) => v.id !== id.trim());
            if (filterdData.length === data.length) {
                console.log("passID doesn't exist");
            } else {
                await saveDataToDB(
                    filePath,
                    filterdData,
                    "Data removed successfully"
                );
            }
        } catch (err) {
            console.log("Error while remove()");
        }
    }

    static async fetchAll() {
        try {
            let data = await getDataFromDB(filePath);
            return data;
        } catch (err) {
            console.log("Error while fetchAll()");
        }
    }
}

module.exports = PassMan;
