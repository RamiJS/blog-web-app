<template>
  <div class="home w-full">

    <HomeNav class="py-6 px-8 sm:px-6 lg:px-[250px]" />

    <FirstSection class="px-8 sm:px-6 lg:px-[250px]" />

    <Trending class="py-10 px-8 sm:px-6 lg:px-[250px]" />

    <Footer class="py-10 px-8 sm:px-6 lg:px-[250px]" />

    <!-- <div v-if="data.length">
      <div v-for="item in data" :key="item.id">
       <SingleBlog 
        :item="item"
       />
      </div>
    </div> -->
  </div>
</template>

<script>
import SingleBlog from '@/components/SingleBlog.vue'
import { ref } from '@vue/runtime-core'
import HomeNav from '@/components/HomeNav.vue'
import FirstSection from '@/components/HomeComponents/FirstSection.vue'
import Trending from '../components/Trending.vue'
import Footer from '../components/HomeComponents/Footer.vue'
export default {
  name: '',
  components: {
    SingleBlog,
    HomeNav,
    FirstSection,
    Trending,
    Footer,
},

  setup() {
    const data = ref('')

    // const getData = async () => {
    //     const res = await axios.get('http://localhost:3000/blogs')
    //     data.value = res.data
    //     console.log(data.value);
    // }
    // getData()

    return { data }
  }
}
</script>
