<template>
  <section class="py-[30px] px-4 lg:px-10 max-w-7xl">
    <div v-for="item in likes" :key="item.id">
        <p>{{item.content}}</p>
    </div>
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
    // const url = '' + postId
    console.log(postId + ' ');

    const getLikes = async() => {
        for(let i = 0; postId[i]; i++) {
            axios('http://localhost:3000/posts/' + postId[i]).then(response =>{
                console.log(response.data);

                response.data = likes.value

                console.log('likes array' + ' ' + likes);
                
            })
        }
        
        
    }
    getLikes()
    console.log(likes);

    return {
        likes
    }
    }

}
</script>

<style>

</style>