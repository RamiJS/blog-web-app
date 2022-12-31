<template>
  <section class="p-[32px] hidden xl:block min-w-[400px] max-w-[400px]">
    <div class="flex flex-col gap-8">
        <div v-if="!signedIn" class="flex flex-row items-center gap-5">
            <router-link to="/signup" class="w-[260px] px-6 py-2 my-4 text-base font-medium text-center text-white rounded-full bg-purple focus:outline-none focus:ring focus:ring-violet-300">
            Get Started
          </router-link>
            <router-link to="/login" class="capitalize text-black-100/50">Login</router-link>
        </div>
        <div class="rounded-full w-full flex flex-row bg-white px-4 border-[1px] border-[#ddd]" :class="{'mt-5': signedIn}">
          <img class=" left-3 top-3" src="@/assets/icons/searchIcon.svg" alt="search icon">
          <input 
            placeholder="Search other articles, writers" 
            class="w-full px-4 py-2 rounded-full outline-none text-black-100" 
            type="text"
          >
        </div>
        <UserDetails v-if="route.params.id" />
        <Recommended />
        <SidebarFooter />
    </div>
  </section>
</template>

<script>
import { useRoute } from 'vue-router';
import { useStore } from 'vuex'
import SidebarFooter from '@/components/SidebarFooter.vue'
import Recommended from '@/components/Recommended.vue'
import UserDetails from './UserDetails.vue'
import { ref } from '@vue/reactivity';
export default {
components: { SidebarFooter, UserDetails, Recommended}
,

computed: {
    signedIn() {
      const store = useStore()
      const signedIn = store.state.authUser.username;
      return signedIn !== null
    }
  },
setup() {
  const route = useRoute() 
  const store = useStore()


  return {
    route,
    store,
  }
}


}
</script>

<style>

</style>