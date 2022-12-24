<template>
    <section class="py-[30px] px-4 lg:px-10 w-7xl max-w-7xl">
        <div class="flex flex-col">
            <div class="flex flex-row items-center justify-between gap-5">
                <div class="flex flex-row items-center gap-5">
                    <img class="rounded-full w-14 h-14" :src="blog.postedBy.image" alt="user img" />
                    <div class="flex flex-col">
                        <p class="text-base text-black-100">{{blog.postedBy.username}}</p>
                        <p class="text-sm text-black-100/70">{{blog.createdAt.split('T')[0].split('-')[2] + ', ' +blog.createdAt.split('T')[0].split('-')[0]}}</p>
                    </div>
                </div>
                <div class="flex flex-row gap-3">
                    <button><img class="w-5 h-5" src="@/assets/icons/report.svg" alt=""></button>
                    <button><img class="w-5 h-5" src="@/assets/icons/shareLink.svg" alt=""></button>
                    <button @click="addToBookmarks"><img class="w-5 h-5" src="@/assets/icons/bookmark.svg" alt=""></button>
                    <button @click="deletePost" v-if="store.state.postedByDetails.postedBy._id == store.state.authUser.id"><img class="w-5 h-5" src="@/assets/icons/trashIcon.svg" alt="trash icon"></button>
                  </div>
            </div>
            <div class="py-12">
                <h1 class="text-4xl font-bold text-black-300 first-letter:uppercase">{{blog.title}}</h1>
                <p class="py-3 text-2xl text-black-100/70">{{blog.brief}}</p>
                <img class="w-full py-3" :src="blog.image" alt="">
                <div 
                    class="text-xl text-black-100 py-7" 
                    v-html="blog.content">
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
import store from '@/store';
  export default {
      props: ['id'],
  
      setup() {
        const route = useRoute()
        const uri = "http://localhost:3000/posts/" + route.params.id

        const store = useStore();



        const blog = ref({
            title: '',
            content: '',
            brief: '',
            image: '',
            createdAt: '',
            comments: '',
            likedBy: [],
            postedBy: ''

        })

          const getBlogs = async () => {
  
                  await fetch(uri)
                  .then((res) => res.json())
                  .then((data) => {
                    blog.value.title = data.title
                    blog.value.content = data.content
                    blog.value.brief = data.brief
                    blog.value.image = data.image
                    blog.value.createdAt = data.createdAt
                    blog.value.comments = data.comments
                    blog.value.likedBy = data.likedBy
                    blog.value.postedBy = data.postedBy
                  })
                  .catch((err) => console.log(err));
       
                  console.log(blog.value.createdAt);
             
          }
          getBlogs()


          
          const config = {
            headers: {
            "Content-Type": "application/json"
            },
            withCredentials: true
           }

          const addToBookmarks = async () => {
            try {
            await axios.patch(`${uri}/like`, config)
            .then((res) => console.log(res))
            } catch(err) {
                console.log(err);
            }
          }

          const deletePost = async () => {
            axios.patch(uri + '/delete').then((res) => console.log(res))
          }
  
          return { 
            blog,
            addToBookmarks,
            deletePost,
            store
         }
      }
      
  }
  </script>
  
  <style>
  
  </style>