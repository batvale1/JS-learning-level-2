const app = new Vue({
    el: '#app',
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => this.$refs.error.setError(error));
        },
        postJson(url, data) {
            return fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setError(error));
        },
        putJson(url, data) {
            return fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setError(error));
        }
    },
})