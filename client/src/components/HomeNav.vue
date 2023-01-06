<template>
<nav class="sticky top-0 flex z-40 w-full flex-row justify-between items-center flex-shrink-0 bg-sky border-b-2 border-black-100/20 gap-2">
        <div>
           <img src="@/assets/logos/logoText.svg" class="min-w-[136px]" alt="website logo">
        </div>
        <div class="flex flex-row items-center">
            <ul class="flex flex-row" >
                <li v-for="item in nav" :key="item.index" class="capitalize text-black-200 text-[14px] mx-5 self-center hidden xl:flex">
                    <router-link to="/">{{item.label}}</router-link>
                </li>
                <li v-if="!isLoggedIn" class="capitalize text-black-200 text-[14px] mx-5 self-center hidden xl:flex">
                    <router-link to="/login">Sign in</router-link>
                </li>
                <li v-if="!isLoggedIn" class="capitalize text-white text-[14px] px-6 sm:px-12 py-2 bg-black-200 rounded-3xl sm:ml-5 text-center">
                    <router-link to="/signup"
                    class=""
                    >get started</router-link>
                </li>
                <li v-if="isLoggedIn" class="capitalize text-black-200 text-[14px] mx-5 self-center hidden xl:flex">
                    {{user}}
                </li>
            </ul>
        </div>
</nav>
</template>

<script>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
import axios from 'axios';

export default {

    setup() {
        const store = useStore();
        const user = store.state.authUser.username
        const isLoggedIn = ref(false)

        const nav = [
            {label: 'About us'},
            {label: 'join us'},
        ]

        // const isLoggedIn = computed(() =>{
        //     return store.state.authUser.username != null
        // })
    
        const checkLogin = async() => {
            try {
            const response = await axios.get('http://localhost:3000/checkSession')
            if (response.status === 200) {
                isLoggedIn.value = true
                console.log('user is signed in');
            }
            } catch (error) {
                console.log("Error: user is not signed in yet", error);
            }
        }
        checkLogin()
    
        return {
            nav,
            isLoggedIn,
            user,
            checkLogin
        }
    }
}
</script>

<style>

</style>