<template>
  <section class="p-[32px] bg-red hidden xl:block">
    <ul class="flex flex-col">
        <li class="pb-[164px]">
            <router-link to="/">
                <img class="w-[36px] h-[36px]" src="@/assets/logos/logo.svg" alt="website logo">
            </router-link>
        </li>
        <li v-for="item in navItems" :key="item.index" class="py-6 mx-auto">
            <router-link :to="item.href" class="hover:text-purple text-black-100/70 transition duration-300 ease-in-out">
                <component 
                  :is="item.icon"
                  class="w-[36px] h-[36px]"
                  >
                </component>
            </router-link>
        </li>
        <li v-if="isAdmin" class="py-6 mx-auto">
            <a href="" class="hover:text-purple text-black-100/70 transition duration-300 ease-in-out">
                <component
                :is="PencilSquareIcon"
                class="w-[36px] h-[36px]"
                >
                </component>
            </a>
        </li>
    </ul>
  </section>
</template>

<script>
import { HomeIcon, BookmarkIcon, PencilSquareIcon, BellIcon } from '@heroicons/vue/24/outline'
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex'
export default {
    setup(){
        const store = useStore();


        const navItems = [
            {title: "Home", icon: HomeIcon, href: '/feed'},
            {title: "Notification", icon: BellIcon, href: '/#'},
            {title: "Bookmarks", icon: BookmarkIcon, href: '/#'},
            // {title: "Create a blog", icon: PencilSquareIcon, href: '/#'},
        ]

        const isAdmin = computed(() =>{
            return store.state.authUser.roles == 'admin'
        })

        return { navItems, store, PencilSquareIcon, isAdmin }
    }


}
</script>

<style>

</style>