<template>
    <div class="users">
        <router-link
            v-for="user in users"
            :key="user.id"
            tag="a"
            :to="{ name: 'profile', params: {id: user.id} }"
            class="users_item"
        >
            <span class="users_item_id">ID: {{ user.id }}</span>
            <div class="users_item_splitter"></div>
            <span class="users_item_name">Name: {{ user.name }}</span>
        </router-link>

        <nav class="users_pagination">
            <router-link
                v-for="n in pagesCount"
                :key="n"
                :to="'/'"
                class="users_pagination_link"
                @click.prevent="getUsers(n-1)"
            >{{ n }}</router-link>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'UsersView',

    data() {
        return {
            users: [],
            itemsCount: 5,
            pagesCount: 1
        }
    },
    methods: {
        getUrl(page) {
            return `https://test-js.alef.dev/users?page=${page}&count=${this.itemsCount}`
        },

        async getUsers(page = 0) {
            try {
                const response = await fetch(this.getUrl(page))
                const result = await response.json()

                this.users = []
                this.users.push(...result.data)
            } catch (error) {
                console.log('Request error!')
            }
        },

        async getPagesCount() {
            try {
                const response = await fetch('https://test-js.alef.dev/users?count=1000')
                const result = await response.json()
                this.pagesCount = result.data.length / this.itemsCount
            } catch (error) {
                console.log('Request error!')
            }
        }
    },
    mounted() {
        this.getPagesCount()
        this.getUsers()
    }
}
</script>
