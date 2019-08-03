let add = (cart, req) => {
    cart.contents.push(req.body);
    cart.amount += +req.body.price;
    return JSON.stringify(cart, null, 4);
};

let change = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    let amount = cart.amount + req.body.quantity * (+find.price);
    cart.amount = amount;
    find.quantity += req.body.quantity;
    return JSON.stringify(cart, null, 4);
};

let deleteProduct = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    if (find.quantity > 1) {
        find.quantity--;
    } else {
        cart.contents.splice(cart.contents.indexOf(find), 1);
    }
    cart.amount -= +find.price;
    return JSON.stringify(cart, null, 4)
};

module.exports = {
    add,
    change,
    deleteProduct
};