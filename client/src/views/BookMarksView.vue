<template>
  <section class="flex flex-col lg:py-[30px] lg:px-10 w-full ">
    <h1 class="text-3xl font-bold text-black-300">Your Bookmarks:</h1>
    <div v-for="blog in bookmarks" :key="blog._id">

        <SingleBlog
        :blog="blog"
        />

    </div>
  </section>
</template>

<script>
import { useStore } from 'vuex'
import axios from 'axios'
import { ref } from '@vue/reactivity';
import SingleBlog from '@/components/SingleBlog.vue'
export default {
    components: { SingleBlog },
    setup() {
    const store = useStore();
    const bookmarks = ref([''])

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
            bookmarks.value = res.data
        })
    }
    getLikes()
    
    return {
        bookmarks,
        sendParam
    }
    }

}
</script>

<style>

</style>