const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

const app = new Vue({
    el: '#app',
    data: {
        userSearch: '',
        error: [],
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => {
                    if (!result.ok) {
                        let errorMessage = `Url: ${url} Status: ${result.status} Description: ${result.statusText}`;
                        if (this.error.indexOf(errorMessage) === -1) {
                            this.error.push(errorMessage);
                        }
                    } else {
                        return result.json()
                    }
                });
        },
    },
});