const cart = require("./cart");
const fs = require("fs");
const logActions = require("./logActions");

const actions = {
    add: cart.add,
    change: cart.change,
    deleteProduct: cart.deleteProduct,
}

const handler = (req, res, action, file) => {
    fs.readFile(file, "utf8", (err, data) => {
        if (err) {
            res.send({result: 0, text: "Error!"});
        } else {
            let found = JSON.parse(data).contents.find(el => el.id_product === +req.params.id);
            if (!found) {
                found = req.body;
            }
            let newCart = actions[action](JSON.parse(data), req);
            fs.writeFile(file, newCart, (err) => {
                if (err) {
                    res.send({result: 0, text: "Error!"});
                } else {
                    logActions(action, found);
                    res.send({result: 1, text: "Successful!"})
                }
            })
        }
    })
}

module.exports = handler;