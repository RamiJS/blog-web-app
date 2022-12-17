<template>
  <section class="py-[30px] px-4 lg:px-10 max-w-7xl">
    <h1 class="text-3xl font-bold text-black-300">Your Bookmarks:</h1>
    <router-link v-for="blog in likes" :key="blog.id" @click="sendParam" :to="{ name: 'blog', params: { id: blog._id } }" class="flex flex-row gap-2 my-6 lg:gap-8">
        <div class="h-[150px] w-[120px] lg:w-[200px] lg:h-[180px] flex-shrink-0">
            <img class="object-cover h-full" :src="blog.image" alt="">
        </div>
                
        <div class="flex flex-col gap-1 lg:gap-3">
            <div class="flex flex-row items-center gap-2 lg:gap-4">
                <img class="w-6 rounded-full" :src="blog.postedBy.image" alt="">
                <p class="text-sm capitalize text-black-100">{{blog.postedBy.username}}</p>
            </div>
            <h3 class="text-sm font-bold capitalize text-black-300 lg:text-2xl">
                {{blog.title}}
            </h3>
            <p class="text-xs text-black-100/70 lg:text-lg">{{blog.brief}}</p>
            <div class="flex flex-row items-center gap-1 lg:gap-4">
                <p class="text-xs text-black-100/70 lg:text-sm">{{blog.createdAt.split('T')[0].split('-')[2] + ', ' +blog.createdAt.split('T')[0].split('-')[0]}}</p>
                <p class="px-2 py-1 text-xs bg-black-100/10 place-self-start rounded-xl text-black-100/70 lg:text-sm">Life Style</p>
            </div>
        </div>
        </router-link>
  </section>
</template>

<script>
import { useStore } from 'vuex'
import axios from 'axios'
import { ref } from '@vue/reactivity';
export default {

    setup() {
    const store = useStore();
    const likes = ref([''])

    const postId = store.state.authUser.likes

    const sendParam = async () => {
        try {
            await store.dispatch('getBloggerDetails', {
                id: props.blog._id
            })
            console.log('SINGLE BLOG COMPONENT' + props.blog._id);
        } catch(err) {
            console.log(err);
        }
    }

    // const url = '' + postId
    console.log(postId + ' ');

    // const getLikes = async() => {
    //     for(let i = 0; postId[i]; i++) {
    //         axios('http://localhost:3000/posts/' + postId[i]).then(response =>{
    //             console.log(response.data);

    //             likes.value = response.data 

    //             console.log('likes array' + ' ' + likes);
                
    //         })
    //     }
        
        
    // }

    const getLikes = async() => {
        await axios(`http://localhost:3000/${store.state.authUser.id}/likes`)
        .then(res => {
            console.log(res.data);
            likes.value = res.data
        })
    }
    getLikes()
    
    return {
        likes,
        sendParam
    }
    }

}
</script>

<style>

</style>