const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        basketUrl: '/getBasket.json',
        products: [],
        cart: [],
        goodsToDisplay: [],
        imgCatalog: 'https://placehold.it/200x150',
        searchLine: "",
        isVisibleCart: false,
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error));
        },
        addProduct(product){
            let find = this.cart.find(el => el.id_product === product.id_product);
            if(find){
                find.quantity++;
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.cart.push(prod);
            }
        },
        removeProduct(product) {
            if(product.quantity > 1) {
                product.quantity--;
            } else {
                this.cart.splice(this.cart.indexOf(product), 1);
            }
        },
        toggleVisibilityOfTheCart() {
            this.isVisibleCart = !this.isVisibleCart;
        },
        filterGoods(event) {
            event.preventDefault();
            if (this.searchLine) {
                this.products.forEach(el => el.product_name.toLowerCase().indexOf(this.searchLine.toLowerCase()) !== -1 ? el.isInvisible = false : el.isInvisible = true);
            } else {
                this.products.forEach(el => el.isInvisible = false);
            }
        },
    },
    mounted(){
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    el.isInvisible = false;
                    this.products.push(el);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    el.isInvisible = false;
                    this.products.push(el);
                }
            })
        this.getJson(`${API + this.basketUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cart.push(el);
                }
            })
    }
});



