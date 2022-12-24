<template>
  <section class="py-[30px] px-4 lg:px-10 w-7xl max-w-7xl">
    <div v-if="blogs.length">
      <div v-for="blog in blogs" :key="blog._id">
        <SingleBlog
        :blog="blog"
        />
      </div>
    </div>
  </section>
</template>

<script>
import SingleBlog from '@/components/SingleBlog.vue';
import axios from 'axios'
import { ref } from '@vue/reactivity';

export default {
    components: { SingleBlog },

    setup() {
        const blogs = ref('')

        const getBlogs = async () => {

                await fetch('http://localhost:3000/posts')
                .then((res) => res.json())
                .then((data) => (blogs.value = data))
                .catch((err) => console.log(err));
     
                console.log(blogs.value[0]);
           
        }
        getBlogs()


        return { blogs }
    }
    
}
</script>

<style>

</style>