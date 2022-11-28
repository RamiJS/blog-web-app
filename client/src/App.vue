<template>
  <main class="mx-auto" :class="{'max-w-[1507px]': condition}">
    <Navbar v-if="condition" />
    
    <div class="container-lg flex flex-row justify-center xl:justify-between mx-auto" > <!--:class="{'px-[124px]': condition}"-->
      <Sidebar v-if="condition" /> 
      <router-view />
      <RightSidebar v-if="condition" />
    </div>
  </main>
</template>


<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import RightSidebar from './components/RightSidebar.vue'

export default {
  components: { Navbar, Sidebar, RightSidebar },

  computed: {
    condition() {
      const currentRoute = this.$route.name;
      return currentRoute !== 'home' && currentRoute !== 'signup' && currentRoute !== 'login'
    }
  },

  setup() {
    
  }
}

</script>

<style>

</style>
