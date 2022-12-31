<template>
  <section class="w-full">
    <ul class="grid grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-2 xl:grid-cols-3 xl:grid-rows-2 gap-10">
        <li v-for="blog in blogs" :key="blog._id" class="flex flex-col justify-center">
            <router-link class="flex flex-row items-center gap-5 text-sm" :to="{ name: 'profile', params: { id: blog.postedBy._id }}">
                <img class="w-8 h-8 rounded-full" :src="blog.image" alt="user image">
                {{ blog.postedBy.username }}
            </router-link>
            <router-link :to="{ name: 'blog', params: { id: blog._id }}" class="text-black-200 font-bold text-lg py-3">
                {{blog.title}}
            </router-link>
            <span class="text-black-100/70 text-sm">Nov 8 . 2 min read</span>
        </li>
    </ul>
  </section>
</template>

<script>
import { ref } from '@vue/reactivity';
export default {

    setup() {
        const blogs = ref('')

        const getBlogs = async () => {

        await fetch('http://localhost:3000/posts')
        .then((res) => res.json())
        .then((data) => (blogs.value = data))
        .catch((err) => console.log(err));

       

        }
        getBlogs()

        return { 
            blogs
        }
    }

}
</script>

<style>

</style>