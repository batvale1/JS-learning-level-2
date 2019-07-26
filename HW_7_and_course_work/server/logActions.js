const fs = require("fs");
const moment = require("moment");

const logActions = (action, product) => {
    const errorPath = "server/db/stats.json";
    let errorRecord = {
        action,
        product,
        date: moment().format('MMMM Do YYYY, h:mm:ss a')
    };
    let errors;
    fs.readFile(errorPath, "utf8", (err, data) => {
        errors = JSON.parse(data);
        errors.push(errorRecord);
        fs.writeFile(errorPath,JSON.stringify(errors, null, 4), err => {
            if (err) {
                console.log(err);
            }
        });
    });
};

module.exports = logActions;