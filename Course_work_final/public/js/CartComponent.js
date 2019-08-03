Vue.component('cart', {
    props: ['detail_cart'],
    data(){
        return {
            showCart: false,
            cartItems: [],
            amount: 0
        }
    },
    methods: {
        addProduct(product, quantity = 1){
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                if (product.quantity) {
                    quantity = +quantity - product.quantity;
                }
                this.$parent.putJson(`api/cart/${find.id_product}`, {quantity: quantity})
                    .then(data => {
                        if (data.result) {
                            this.amount += (+find.price * quantity);
                            find.quantity+=quantity;
                        }
                    })
            } else {
                let prod = Object.assign({quantity: quantity}, product);
                this.$parent.postJson(`api/cart/`, prod)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.push(prod);
                            this.amount += (+prod.price * quantity);
                        }
                    })
            }
        },
        remove(product){
            if (product.quantity > 1) {
                this.$parent.putJson(`api/cart/${product.id_product}`, {quantity: -1})
                    .then(data => {
                        if (data.result) {
                            this.amount -= +product.price;
                            product.quantity--;
                        }
                    })
            } else {
                this.$parent.deleteJson(`api/cart/delete/${product.id_product}`, product)
                    .then(data => {
                        if(data.result){
                            this.amount -= +product.price;
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        }
                    })
            };
        },
    },
    mounted(){
        this.$parent.getJson("api/cart")
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                    this.amount = data.amount;
                }
            });
    },
    template: `

                <div v-if="!detail_cart" class="cart_block__flex">
                    <p v-if="!cartItems.length">Cart is empty</p>
                    <cart-item 
                        v-for="item of cartItems" 
                        v-if="!detail_cart"
                        :key="item.id_product"
                        :cart-item="item"
                        :detail_cart="false"
                        @remove="remove"></cart-item>
                    <div v-if="cartItems.length" class="cart_block__total">
                        <h3>TOTAL</h3>
                        <h3>\${{amount}}</h3>
                    </div>
                    <div v-if="cartItems.length" class="cart_block__actions">
                        <a href="checkout.html" class="cart_block__actions_action">checkout</a>
                        <a href="shopping_cart.html" class="cart_block__actions_action">go to cart</a>
                    </div>
                </div>
                
                <div v-else>
                    <h1 v-if="!cartItems.length">Cart is empty</h1>
                    <div v-else class="shopping_cart__product_info container">
                        <h6 class="shopping_cart__element">Product Details</h6>
                        <h6 class="shopping_cart__element">unite Price</h6>
                        <h6 class="shopping_cart__element">Quantity</h6>
                        <h6 class="shopping_cart__element">shipping</h6>
                        <h6 class="shopping_cart__element">Subtotal</h6>
                        <h6 class="shopping_cart__element">ACTION</h6>
                    </div>    
                    <div class="container">
                        
                        <cart-item
                            v-for="item of cartItems" 
                            :key="item.id_product"
                            :cart-item="item"
                            :detail_cart="true"
                            @addProduct="addProduct"
                            @remove="remove"></cart-item>      
                        <div class="shopping_cart__footer">
                            <div class="shopping_cart__footer__section">
                                <h4 class="shopping_cart__footer__section__header">Shipping Address</h4>
                                <input type="text" class="shopping_cart__footer__section__address" placeholder="Bangladesh">
                                <input type="text" class="shopping_cart__footer__section__address" placeholder="State">
                                <input type="text" class="shopping_cart__footer__section__address" placeholder="Postcode / Zip">
                            </div>
                            <div class="shopping_cart__footer__section">
                                <h4 class="shopping_cart__footer__shipping__header">coupon  discount</h4>
                                <p class="shopping_cart__footer__section__coupon">Enter your coupon code if you have one</p>
                                <input type="text" class="shopping_cart__footer__section__address" placeholder="State">
                                <a href="#" class="apply_btn">Apply coupon</a>
                            </div>
                            <div class="shopping_cart__footer__section">
                                <p>Sub total <span>\${{amount}}</span></p>
                                <h4 class="shopping_cart__footer__shipping__header">GRAND TOTAL <span>\${{amount}}</span></h4>
                                <a href="#" class="button">proceed to checkout</a>
                            </div>
                        </div>      
                    </div>
                </div>
                
                `
});

Vue.component('cart-item', {
    props: ['cartItem','detail_cart'],
    methods: {
        onlyPositive: function (event) {
                event.target.value = event.target.value.replace(/\D|^0/g,'');
                if (event.target.value === "") event.target.value = '1';
                event.preventDefault();
        }
    },
    template: `<div v-if="!detail_cart" class="cart_block__product" >
                    <div class="cart_block__left_side">
                        <div class="cart_block__img">
                            <a href="single.html"><img :src="cartItem.img" alt="product"></a>
                        </div>
                        <div class="cart_block__description">
                            <a href="single.html"><h5 class="cart_block__description_item cart_block__description_header">{{cartItem.product_name}}</h5></a>
                            <div class="cart_block__description_item cart_block__description_rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                            </div>
                            <p class="cart_block__description_item cart_block__description_inquiry">{{cartItem.quantity}}  x  \${{cartItem.price}}</p>
                        </div>
                    </div>
                    <div class="cart_block__right_side">
                        <p class="cart_block__right_side_p" @click="$emit('remove', cartItem)"><i class="fas fa-times-circle"></i></p>
                    </div>
            </div>
            
            <div v-else class="shopping_cart__product_info container">
                <div class="shopping_cart__element">
                    <div class="shopping_cart__product_cart">
                        <div class="catalog__productcart_wraping">
                            <a class='product_img' href="single.html"><img :src="cartItem.img" alt="product_img"></a>
                        </div>
                    </div>
                    <div class="shopping_cart__properties">
                        <a href="single.html" class="shopping_cart__product_name">{{cartItem.product_name}}</a>
                        <p class="shopping_cart__product_property">Color:<span class="shopping_cart__product_property_value">Red</span></p>
                        <p class="shopping_cart__product_property">Size:<span class="shopping_cart__product_property_value">XII</span></p>
                    </div>
                </div>
                <p class="shopping_cart__element">\${{cartItem.price}}</p>
                <form class="shopping_cart__element" action="#" @change.prevent.stop="$emit('addProduct', cartItem, $event.target.value)">
                    <input type="text" @keyup="onlyPositive($event)" :value="cartItem.quantity">
                </form>
                <p class="shopping_cart__element">free</p>
                <p class="shopping_cart__element">\${{cartItem.quantity * cartItem.price}}</p>
                <span class="shopping_cart__element" @click="$emit('remove', cartItem)"><i class="fas fa-times"></i></span>
            </div>`,
});