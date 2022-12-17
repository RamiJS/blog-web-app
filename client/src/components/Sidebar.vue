<template>
  <section class="p-[32px] bg-red hidden xl:block">
    <ul class="flex flex-col">
        <li class="pb-[164px]">
            <router-link to="/">
                <img class="w-[36px] h-[36px]" src="@/assets/logos/logo.svg" alt="website logo">
            </router-link>
        </li>
        <li v-for="item in navItems" :key="item.index" class="py-6 mx-auto">
            <router-link :to="item.href" class="transition duration-300 ease-in-out hover:text-purple text-black-100/70">
                <component 
                  :is="item.icon"
                  class="w-[36px] h-[36px]"
                  >
                </component>
            </router-link>
        </li>
        <li v-if="isAdmin" class="py-6 mx-auto">
            <router-link to="/writeblog" class="transition duration-300 ease-in-out hover:text-purple text-black-100/70">
                <component
                :is="PencilSquareIcon"
                class="w-[36px] h-[36px]"
                >
                </component>
            </router-link>
        </li>
        <li class="py-6 mx-auto">
            <Menu>
    <MenuButton>
        <img class="w-[36px] h-[36px]" :src="store.state.authUser.image" alt="">
    </MenuButton>
    <MenuItems>
      <MenuItem>
        <router-link to="/feed" >
          Account settings
        </router-link>
        <router-link to="/feed" class='ui-active:bg-blue-500'>
          Account settings
        </router-link>
      </MenuItem>
      
    </MenuItems>
  </Menu>
        </li>
    </ul>
  </section>
</template>

<script>
import { HomeIcon, BookmarkIcon, PencilSquareIcon, BellIcon } from '@heroicons/vue/24/outline'
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
export default {
    component: {Menu, MenuButton, MenuItems, MenuItem},
    setup(){
        const store = useStore();


        const navItems = [
            {title: "Home", icon: HomeIcon, href: '/feed'},
            {title: "Notification", icon: BellIcon, href: '/#'},
            {title: "Bookmarks", icon: BookmarkIcon, href: '/bookmarks'},
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