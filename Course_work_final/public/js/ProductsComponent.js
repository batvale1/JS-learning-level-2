Vue.component('products', {
    props: ['show_count'],
    data(){
        return {
            products: [],
        }
    },
    mounted(){
        console.log(this.show_count);
        this.$parent.getJson(`/api/products/${this.show_count === undefined ? 0 : this.show_count}`)
            .then(data => {
                for (let el of data) {
                    el.price = (+el.price).toFixed(2);
                    this.products.push(el);
                }
            })
    },
    template: `<div class="catalog__products">
           <product 
           v-for="(el,index) of products" 
           :key="el.id_product"
           :product="el"></product>
        </div>`
});

Vue.component('product', {
    props: ['product'],
    template: `<div class="catalog__productcart">
                    <div class="catalog__productcart_wraping">
                        <a class='product_img' href="single.html"><img :src="product.img" alt="product_img"></a>
                        <p class="active_product" @click="$root.$refs.cart.addProduct(product)"><i class="fas fa-shopping-cart"></i>&nbsp;Add to Cart</p>
                    </div>
                    <a class='product_short_desc' href="single.html">{{product.product_name}}</a>
                    <span class="catalog_price">\${{product.price}}</span>
                </div>`
})