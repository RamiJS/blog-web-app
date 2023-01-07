<template>
   <section class="w-full flex flex-col">
       <form @submit.prevent="sendComment" class="flex flex-row gap-3 items-center">
            <img class="w-8 h-8 rounded-full" :src="store.state.authUser.image" alt="user profile img">
            <div class="flex flex-row w-full border-b border-black-100/30 p-3">
                <input v-model="comment" class="border-none outline-none w-full" type="text" placeholder="Add your thoughts here...">
            </div>
            <button class="w-14 h-12 flex justify-center items-center rounded-full bg-purple">
                <img class="w-8" src="@/assets/icons/sendIcon.svg" alt="send icon">
            </button>
        </form>

        <div class="flex flex-col py-12 gap-10">
            <div v-for="user in comments" :key="user._id" class="flex flex-row gap-4">
             
                    <img class="w-10 h-10 rounded-full" :src="user.postedBy.image" alt="">
            
                <div class="flex flex-col gap-3">
                    <p class="font-medium capitalize">{{ user.postedBy.username }}</p>
                    <p>
                        {{ user.comment }}
                    </p>
                </div>
            </div>
        </div>
   </section>
</template>

<script>
  import axios from 'axios'
  import { ref } from '@vue/reactivity';
  import { useRoute } from 'vue-router';
  import { useStore } from 'vuex';
export default {
   setup(){
    const route = useRoute()
    const uri = `http://localhost:3000/${route.params.id}/comments`
    const postUri = `http://localhost:3000/${route.params.id}/comment`
    const comments = ref('')
    const store = useStore();
    const comment = ref('')

    const getComments = async() =>{
        try {
        const res = await axios.get(uri)
        comments.value = await res.data
        // console.log(comments);
        } catch(err) {
            console.log(err);
        }
    }
    getComments()

    const config = {
        headers: {
        "Content-Type": "multipart/form-data"
        },
        withCredentials: true
        }

    const sendComment = async() => {
        try {
            await axios.post(
            postUri, 
            {
                comment: comment.value
            }
            ).then(response => {
                console.log(response);
            }) 
        } catch(err) {
            console.log(err);
        }
    }

    return {
        store,
        comments,
        comment,
        sendComment
    }
   }
}
</script>

<style>

</style>