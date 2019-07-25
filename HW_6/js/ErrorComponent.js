Vue.component('me_errors', {
    template: `<div class="errors"> 
                   <error
                   v-for="el of $root.error"
                   :key="el"
                   :error="el"           
                   ></error> 
               </div>`,
});

Vue.component('error', {
    props: ['error'],
    template: `<p>There was an error on getting data from the server. Error description: {{error}}</p>`,
});