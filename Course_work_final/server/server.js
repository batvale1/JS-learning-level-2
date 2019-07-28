const express = require("express");
const fs = require("fs");
const cart = require("./cartRouter");
const app = express();

app.use(express.json());
app.use("/", express.static("public"));
app.use("/api/cart", cart);

app.get("/api/products/:count", (req, res) => {
    fs.readFile("server/db/products.json", "utf8", (err, data) => {
        if (err) {
            res.send({result: 0, text: "Error!"});
        } else {
            if (req.params.count === undefined) {
                res.send(data);
            } else {
                let dataToReturn = JSON.parse(data);
                dataToReturn = dataToReturn.splice(0, +req.params.count);
                dataToReturn = JSON.stringify(dataToReturn);
                res.send(dataToReturn);
            }
        }
    })
});



app.listen(3000, () => console.log("server started...."));