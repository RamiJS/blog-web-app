<template>
  <section class="flex flex-col gap-5">
    <h2 class="text-lg font-bold pb-2">More from Blogoty:</h2>
    <router-link v-for="article in articles.slice(0, 3)" :key="article._id" :to="{ name: 'blog', params: { id: article._id } }" class="flex flex-row gap-5">
        <img :src="article.image" class="w-16 h-16" alt="">
        <div class="flex flex-col">
            <div class="flex flex-row gap-3">
                <img :src="article.postedBy.image" class="w-6 h-6 rounded-full" alt=""/>
                <p>{{article.postedBy.username}}</p>
            </div>
            <p>{{article.title}}</p>
        </div>
    </router-link>

  </section>
</template>

<script>
import {useStore} from 'vuex'
import { Axios } from 'axios'
import { ref } from '@vue/reactivity';
export default {
setup() {
    
    const store = useStore();
    const axios = new Axios()
   const articles = ref('')

const getBlogs = async () => {

await fetch('http://localhost:3000/posts')
.then((res) => res.json())
.then((data) => (articles.value = data))
.catch((err) => console.log(err));

console.log('article', ' ',articles);

}
getBlogs()

    return {
        store,
        articles
    }
}
}
</script>

<style>

</style>