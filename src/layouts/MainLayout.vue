<template>
    <div class="main">
        <router-link
            class="main_link"
            to="/"
            exact
        >
            <img src="@/assets/images/logo.png" alt="logo" class="main_logo" width="75">
        </router-link>

        <div class="content">
            <router-view />
        </div>
    </div>
</template>