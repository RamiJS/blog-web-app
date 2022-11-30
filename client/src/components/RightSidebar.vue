<template>
  <section class="p-[32px] hidden xl:block max-w-[400px]">
    <div class="flex flex-col gap-8">
        <div class="flex flex-row items-center gap-5">
            <router-link to="/signup" class="
            bg-purple py-2 px-24 my-4 text-white text-base font-medium rounded-full focus:outline-none focus:ring focus:ring-violet-300
            ">
            Get Started
          </router-link>
            <router-link to="/login" class="capitalize text-black-100/50">Login</router-link>
        </div>
        <div class="rounded-full w-full flex flex-row bg-white px-4 border-[1px] border-[#ddd]">
          <img class=" left-3 top-3" src="@/assets/icons/searchIcon.svg" alt="search icon">
          <input 
            placeholder="Search other articles, writers" 
            class="py-2 px-4 rounded-full w-full outline-none text-black-100" 
            type="text"
          >
        </div>
        <UserDetails v-if="route.params.id" />
        <SidebarFooter />
    </div>
  </section>
</template>

<script>
import { useRoute } from 'vue-router';
import SidebarFooter from '@/components/SidebarFooter.vue'
import UserDetails from './UserDetails.vue'
export default {
components: { SidebarFooter, UserDetails}
,

setup() {
  const route = useRoute() 


  return {
    route
  }
}


}
</script>

<style>

</style>