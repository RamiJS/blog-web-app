<template>
  <section class="flex flex-col lg:py-[30px] lg:px-10 w-full ">
    <div class="relative self-start pb-16">
      <img class="w-screen h-52" src="@/assets/images/banner.jpg" alt="banner">
      <img class="w-[124px] h-[124px] absolute bottom-2 left-5 rounded-full" :src="store.state.authUser.image" alt="">
    </div>

    <div class="flex flex-row justify-between gap-5 px-6 py-5 items-center">
        <div class="flex flex-row gap-5">
          <p class="text-black-100/80">Following: <span class="text-black-100">200</span></p>
          <p class="text-black-100/80">Followers: <span class="text-black-100">1350</span></p>
        </div>
      <div>
        <button class="bg-purple py-2 px-5 rounded-full text-white">
          Follow
        </button>
      </div>
    </div>
   
    <TabsWrapper>
      <Tab title="Blogs" >
        <div v-for="blog in blogs" :key="blog._id">

          <SingleBlog
          :blog="blog"
          />
     
        </div>
      </Tab>
      <Tab title="Bookmarks">
        <div v-for="blog in bookmarks" :key="blog._id">

        <SingleBlog
        :blog="blog"
        />

        </div>
      </Tab>
    </TabsWrapper>

  </section>
</template>

<script>
import { useStore } from 'vuex'
import Tab from '@/components/Tab.vue'
import TabsWrapper from '@/components/TabsWrapper.vue'
import {useRoute} from "vue-router";
import axios from 'axios';
import { ref } from '@vue/reactivity';
import SingleBlog from '@/components/SingleBlog.vue'
export default {
  components: {Tab, TabsWrapper, SingleBlog},

  setup() {


    
    const route = useRoute();
    const id = route.params.id;
    console.log('The id is: ' + id);
    const store = useStore();
    const blogs = ref('')
    const bookmarks = ref('')


    const getBlogs = async()=>{
      await axios.get(`http://localhost:3000/${id}/posts`)
    .then((res) => {
      blogs.value = res.data
    })
    }
    getBlogs()

    const getBookmarks = async()=>{
      await axios.get(`http://localhost:3000/${id}/likes`)
    .then((res) => {
      bookmarks.value = res.data
    })
    }
    getBookmarks()
    


      return {
        store,
        blogs,
        bookmarks
      }

  }


}
</script>

<style>

</style>