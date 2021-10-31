Vue.component('search', {
    data: {
        textSearch: '',
    },
    template: `
                <form action="#" class="search-form" @submit.prevent="$parent.filter(textSearch)">
                <input type="text" class="search-field" v-model="textSearch">
                <button class="btn-search" type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </form>
    `
});