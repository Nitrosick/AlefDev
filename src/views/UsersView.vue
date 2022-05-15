<template>
    <div class="users">
        <div v-for="user in users" :key="user.id" class="users_item">
            <span class="users_item_id">ID: {{ user.id }}</span>
            <div class="users_item_splitter"></div>
            <span class="users_item_name">Name: {{ user.name }}</span>
        </div>

        <nav class="users_pagination">
            <router-link
                to="/"
                class="users_pagination_link"
            >1</router-link>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'UsersView',

    data() {
        return {
            users: [],
            count: 5
        }
    },
    computed: {
        async getPagesCount() {
            try {
                const response = await fetch('https://test-js.alef.dev/users?count=1000')
                const result = await response.json()
                return result.data.length / this.count
            } catch (error) {
                console.log('Request error!');
                return 0
            }
        }
    },
    methods: {
        getUrl() {
            let page = 0

            if (this.$route.query.page) {
                page = this.$route.query.page
            }
            if (this.$route.query.count) {
                this.count = this.$route.query.count
            }

            return `https://test-js.alef.dev/users?page=${page}&count=${this.count}`;
        },

        async getUsers() {
            try {
                const response = await fetch(this.getUrl())
                const result = await response.json()
                this.users.push(...result.data)
            } catch (error) {
                console.log('Request error!');
            }
        }
    },
    mounted() {
        this.getUsers()
    }
}
</script>
