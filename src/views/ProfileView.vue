<template>
    <div class="profile">
        <span class="profile_name">Name: {{ userName }}</span>
        <div class="profile_roles">
            <span class="profile_roles_title">Roles:</span>
            <ul>
                <li
                    v-for="role in userRoles"
                    :key="role"
                    class="profile_roles_item"
                >
                    <span>{{ role }}</span>
                    <button
                        class="profile_roles_delete"
                        @click="deleteRole(userId, role)"
                    >
                        X
                    </button>
                </li>
            </ul>
        </div>
        <form action="#" class="profile_add_role">
            <select
                name="role"
                id="role"
                @change="selectRole($event)"
            >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <input
                id="add_role"
                type="submit"
                value="Add"
                @click.prevent="addRole(userId, selectedRole)"
            >
        </form>
    </div>
</template>

<script>
export default {
    name: 'ProfileView',

    data() {
        return {
            userId: this.$route.params.id,
            userName: null,
            userRoles: null,
            selectedRole: 1
        }
    },
    methods: {
        async getUserInfo(id) {
            try {
                const response = await fetch(`https://test-js.alef.dev/user/${id}`)
                const result = await response.json()

                this.userName = result.data.name
                this.userRoles = null
                this.userRoles = result.data.roles
            } catch (error) {
                console.log('Request error!')
            }
        },

        async request(method, id, role) {
            try {
                const response = await fetch(`https://test-js.alef.dev/user/${id}/role/${role}`, {method: method})

                if (response.status == 200) {
                    this.getUserInfo(id)
                } else {
                    console.log('Request error!')
                }
            } catch (error) {
                console.log('Request error!')
            }
        },

        selectRole(event) {
            this.selectedRole = event.target.value
        },

        deleteRole(id, role) {
            this.request('DELETE', id, role)
        },

        async addRole(id, role) {
            this.request('POST', id, role)
        }
    },
    mounted() {
        if (this.userId) {
            this.getUserInfo(this.userId)
        } else {
            throw new Error('404')
        }

    }
}
</script>
