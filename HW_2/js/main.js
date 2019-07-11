class Products {
    constructor(container=`.products`){
        this.container = container;
        this.data = [];
        this.allProduct = [];
        this.init();
    }
    init(){
        this._fetchProducts();
        this._render()
    }
    _fetchProducts(){
        this.data = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Keyboard', price: 200},
            {id: 3, title: 'Mouse', price: 47},
            {id: 4, title: 'Gamepad', price: 87},
            {id: 5, title: 'Chair', price: 187},
        ];
    }
    _render(){
        const block = document.querySelector(this.container);
        for (let el of this.data) {
            const product = new ProductItem(el);
            this.allProduct.push(product);
            block.insertAdjacentHTML('beforeend', product.render())
        }
    }
    totalSum() {
        let total = 0;
        this.data.forEach(function(element) {
            total += element.price;
        });
        return "The total is " + total;
    }
}

class ProductItem {
    constructor(el, img='https://placehold.it/200x150'){
        this.title = el.title;
        this.id = el.id;
        this.price = el.price;
        this.img = img;
    }
    render() {
            return `<div class="product-item">
                 <img src="${this.img}" alt="${this.title}">
                 <div class="desc">
                     <h3>${this.title}</h3>
                     <p>${this.price}</p>
                     <button class="buy-btn">Купить</button>
                 </div>
             </div>`
    }
}

/////////////// ЗАДАНИЕ 1
class Cart {
    constructor(container = `.cart`){
        // this.some // что-то лежит
        this.container = container;
        this.data = []; //ответ с сервера, который будет содержать информацию о добавленных в корзину товарах на различных страницах нашего сайта
        this.allProduct = []; //текущий состав корзины товаров, подлежащих рендеру.
    }
    init() {
        //делаем сначала fetch, потом может плюшки какие-то, а потом через render выводим корзину
    }
    fetch() {
        //формирование списка товаров, подлежащих отображению в корзине
    }
    render() {
        //рендер корзины товаровами, например при клике по корзине или при наведении на нее может быть
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
    constructor(el, img='https://placehold.it/150x100'){
        this.title = el.title; //название
        this.id = el.id; //id товара
        this.price = el.price; //цена товара
        this.img = img; // превью товара
        this.quantity = 0; //количество товара
    }
    increaseCartItem() {
        //увеличить количество данного товара на 1
    }
    decreaseCartItem() {
        //уменьшить количество данного товара на 1
    }
    deleteCartItem() {
        //удалить товар из корзины
    }
}

const products = new Products();

/////////////// ЗАДАНИЕ 2
console.log(products.totalSum());

////////////// ЗАДАНИЕ 3

class Gamburger {
    constructor(properties) {
        this.initialdata = properties; //сюда будем писать, что с формы получили
        this.properies = []; //сюда будем писать все опции, из чего будет составлен гамбургер, включая цену и калорийность опции
        this.buildGamburger();
    }

    buildGamburger() {
        //наполняем гамбургер опциями исходя из того, что навыбирали на форме.
        if (this.initialdata) {
            for (let el of this.initialdata) {
                const property = new Topping(el);
                if (!property.hasOwnProperty("toppingName")) {
                    continue;
                }
                this.properies.push(property);
            }
            this.showInformationAboutGamburger();
        }
    }

    showInformationAboutGamburger(whereToShow = "gamburger-result") {
        document.getElementById(whereToShow).innerHTML = `Гамбургер будет стоить ${this.getSum()} руб. и содержать ${this.getKkal()} ккал.`;
    }

    getSum() {
        let totalSum = 0;
        for (let el of this.properies) {
            totalSum += el.toppingPrice;
        }
        return totalSum;
    }

    getKkal() {
        let totalKkal = 0;
        for (let el of this.properies) {
            totalKkal += el.toppingKkal;
        }
        return totalKkal;
    }

}

class Topping{
    constructor(el) {
        let PropertyValues = this._getProperty(el);
        if (PropertyValues != undefined) {
            this.toppingName = PropertyValues.name; //имя топпинга
            this.toppingPrice = PropertyValues.price; //цена его
            this.toppingKkal = PropertyValues.kkal; // ккал его
        }
    }

    _getProperty(el) {
        //список возможных свойств и их значений, ибо базы данных нет и негде ничего получить, то руками набил возможные, где затем ищется нужное.
        let propertiesList = [
            {name: "Big", price: 100, kkal: 40},
            {name: "Small", price: 50, kkal: 20},
            {name: "Cheese", price: 10, kkal: 20},
            {name: "Salad", price: 20, kkal: 5},
            {name: "Potato", price: 15, kkal: 10},
            {name: "Seasoning", price: 15, kkal: 0},
            {name: "Мayonnaise", price: 20, kkal: 5}
        ]
        return propertiesList[propertiesList.findIndex(x => x.name == el)];
    }
}

function init() {
    //ставим обработчик, что будет срабатывать по кнопке "рассчитать", и при щелчке на который делаем новый экземпляр класса Humburger;
    document.getElementById("btn-calculate-gamburger").addEventListener("click", function () {
        let gamburgerSize = document.getElementById("gamburger-size").value;
        let gamburgerFilling = document.getElementById("gamburger-filling").value;
        let sprinkle = document.getElementById("Seasoning").checked ? document.getElementById("Seasoning").value : "";
        let mayonnaise = document.getElementById("Мayonnaise").checked ? document.getElementById("Мayonnaise").value : "";
        gamburger = new Gamburger([gamburgerSize, gamburgerFilling, sprinkle, mayonnaise]);
    })
}

let gamburger = new Gamburger();
init();