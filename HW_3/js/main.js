const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open('GET', url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4) {
//             if(xhr.status !== 200) {
//                 console.log('error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

let getRequest = url => {
    return fetch(url)
        .then(result => result.json())
        .catch(error => console.log(error));
}

class Products {
    constructor(container=`.products`){
        this.container = container;
        this.data = [];
        this.allProduct = [];
        this._getProducts()
            .then(() => this._render());
    }
    calcSum(){
        // let result = 0;
        // for (let el of this.allProduct){
        //     result += el.price;
        // }
        // // console.log(result);
        // return result
        //return this.allProduct.reduce((accum, item) => accum + item.price, 0);
        return getRequest(`${API}/catalogData.json`)
            .then(data => console.log(data.reduce((accum, item) => accum + item.price, 0)));
    }
    _getProducts(){
        return getRequest(`${API}/catalogData.json`)
            .then(data => {
                this.data = [...data];
            })
    }
    _render(){
        const block = document.querySelector(this.container);
        for (let el of this.data) {
            const product = new ProductItem(el);
            this.allProduct.push(product);
            block.insertAdjacentHTML('beforeend', product.render())
        }
        let buttons = document.getElementsByClassName("buy-btn");
        for (let btn of buttons) {
            btn.addEventListener("click", () => {
                cart.addProductToCart(btn.dataset.idx);
            })
        }
    }
}

class ProductItem {
    constructor(el, img='https://placehold.it/200x150'){
        this.product_name = el.product_name;
        this.id_product = el.id_product;
        this.price = el.price;
        this.img = img;
    }
    render() {
            return `<div class="product-item">
                 <img src="${this.img}" alt="${this.product_name}">
                 <div class="desc">
                     <h3>${this.product_name}</h3>
                     <p>${this.price}</p>
                     <button class="buy-btn" data-idx = ${this.id_product}>Купить</button>
                 </div>
             </div>`
    }
}

/////////////// ЗАДАНИЕ 1
class Cart {
    constructor(container = `.wrapCart`){
        // this.some // что-то лежит
        this.container = container;
        this.data = []; //ответ с сервера, который будет содержать информацию о добавленных в корзину товарах на различных страницах нашего сайта
        this.contents = []; //текущий состав корзины товаров, подлежащих рендеру.
        this.amount = 0;
        this.countGoods = 0;
        this._getCart()
            .then(() => this._render());
    }
    init() {
        //делаем сначала fetch, потом может плюшки какие-то, а потом через render выводим корзину
    }
    _getCart() {
        //формирование списка товаров, подлежащих отображению в корзине
        return getRequest(`${API}/getBasket.json`)
            .then(data => {
                this.data = [...data.contents];
                this.amount = data.amount;
                this.countGoods = data.countGoods;
            })
    }
    _render() {
        //рендер корзины товаровами, например при клике по корзине или при наведении на нее может быть
        const block = document.querySelector(this.container);
        while (block.children.length > 1) {
            block.removeChild(block.lastChild);
        }
        //очищаем состав корзины при каждом обновлении и заполняем
        this.contents = [];
        for (let el of this.data) {
            const cartItem = new CartItem(el);
            this.contents.push(cartItem);
            block.insertAdjacentHTML('beforeend', cartItem.render())
        }
        //навешиваем обработчики на увеличение товара
        let buttonsIncrease = document.getElementsByClassName("cart-increase-product");
        for (let btn of buttonsIncrease) {
            btn.addEventListener("click", () => {
                this.addProductToCart(btn.dataset.idx);
            })
        }
        //навешиваем обработчики на уменьшение товара
        let buttonsDecrease = document.getElementsByClassName("cart-decrease-product");
        for (let btn of buttonsDecrease) {
            btn.addEventListener("click", () => {
                this.takeOffProductFromCart(btn.dataset.idx);
            })
        }
        //навешиваем обработчики на удаление товара
        let buttonsDelete = document.getElementsByClassName("cart-delete-product");
        for (let btn of buttonsDelete) {
            btn.addEventListener("click", () => {
                this.deleteProductFromCart(btn.dataset.idx);
            })
        }
        //собираем подвал корзины
        block.insertAdjacentHTML('beforeend',
            this._showBottom()
        )
        //меняем заголовок корзины при каждом чихе
        document.getElementById("btn-cart").innerText = `Корзина (${this.countGoods})`;
    }

    _showBottom() {
        return `<div class="cart-block">
                <p class="cart-p cart-bottom">TOTAL</p>
                <p class="cart-quantity cart-bottom">${this._getQuantity()}</p>
                <p class="cart-price cart-bottom">-</p>
                <p class="cart-sum cart-bottom">${this._getSum()}</p>
            </div>`;
    }
    _getSum() {
        let sum = 0;
        this.contents.map(x => sum += (x.price * x.quantity));
        this.amount = sum;
        return sum;
    }
    _getQuantity() {
        let quantity = 0;
        this.contents.map(x => quantity += x.quantity);
        this.countGoods = quantity;
        return quantity;
    }
    addProductToCart(id) {
        //ищем среди contents корзины товар. Если находим его там, то увеличиваем его количество на 1, если нет, то добавляем новый экземпляр CartItem в корзину. В любом случае после этого делаем перерендер корзины для отображения верной инфы.
        //пробегаемся по всем элементам в contents корзины
        let elementFound = false;
        for (let element of this.data) {
            //смотрим есть ли такой id
            if (element.id_product == id) {
                element.quantity += 1;
                elementFound = true;
                break;
            };
        }
        if (!elementFound) {
            for (let element of products.allProduct) {
                if (element.id_product == id) {
                    this.data.push(new CartItem(element));
                }
            }
        }
        cart._render();
    }
    takeOffProductFromCart(id) {
        //ищем среди корзины товар. Если находим его там, то увеличиваем его уменьшаем на 1, а если количество текущее 1, то удаляем весь блок. В любом случае после этого делаем перерендер корзины для отображения верной инфы.
        for (let element of this.data) {
            //смотрим есть ли такой id
            if (element.id_product == id) {
                if (element.quantity === 1) {
                    this.data.splice(this.data.indexOf(element),1);
                } else {
                    element.quantity -= 1;
                }
                break;
            };
        }
        cart._render();
    }
    deleteProductFromCart(id) {
        //удаляем полностью текущий товар из корзины
        for (let element of this.data) {
            //смотрим есть ли такой id
            if (element.id_product == id) {
                this.data.splice(this.data.indexOf(element),1);
                break;
            };
        }
        cart._render();
    }
    onHover() {
        //разворачивает корзину при наведении на странице на html элемент корзины
    }
    isEmpty() {
        //возвращает пустая или нет
    }
    clearCart() {
        //очищает всю корзину
    }
    confirm() {
        //переходим к оформлению заказа
    }
}

class CartItem {
    constructor(el){
        this.id_product = el.id_product; //id товара
        this.product_name = el.product_name; //название товара
        this.price = el.price; //цена товара
        this.quantity = el.quantity || 1; //количество товара
    }
    render() {
        return `<div class="cart-block">
                <p class="cart-p">${this.product_name}</p>
                <p class="cart-quantity">${this.quantity}<span class="cart-decrease-product" data-idx=${this.id_product}>-</span><span class="cart-increase-product" data-idx=${this.id_product}>+</span><span class="cart-delete-product" data-idx=${this.id_product}>x</span></p>
                <p class="cart-price">${this.price}</p>
                <p class="cart-sum">${this._getSum()}</p>
            </div>`
    }
    _getSum() {
        return this.price * this.quantity;
    }
}

const products = new Products();
const cart = new Cart();
products.calcSum();
