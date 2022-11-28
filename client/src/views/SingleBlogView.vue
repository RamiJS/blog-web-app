<template>
     <section class="py-[50px] px-[120px] w-full">
        <div class="flex flex-col max-w-[700px] ">
            <div class="flex flex-row justify-between items-center gap-5">
                <div class="flex flex-row gap-5 items-center">
                    <img class="w-14 h-14 rounded-full" :src="blog.postedBy.image" alt="user img" />
                    <div class="flex flex-col">
                        <p class="text-base text-black-100">{{blog.postedBy.username}}</p>
                        <p class="text-sm text-black-100/70">{{blog.createdAt.split('T')[0].split('-')[2] + ', ' +blog.createdAt.split('T')[0].split('-')[0]}}</p>
                    </div>
                </div>
                <div class="flex flex-row gap-3">
                    <button><img class="w-5 h-5" src="@/assets/icons/report.svg" alt=""></button>
                    <button><img class="w-5 h-5" src="@/assets/icons/shareLink.svg" alt=""></button>
                    <button><img class="w-5 h-5" src="@/assets/icons/bookmark.svg" alt=""></button>
                </div>
            </div>
            <div class="py-12">
                <h1 class="text-black-300 text-4xl font-bold first-letter:uppercase">{{blog.title}}</h1>
                <p class="text-2xl text-black-100/70 py-3">{{blog.brief}}</p>
                <img class="w-full py-3" :src="blog.image" alt="">
                <p class="text-xl text-black-100 py-7">
                    {{blog.content}}
                </p>
            </div>
        </div>
    </section>
  </template>
  
  <script>
  import axios from 'axios'
  import { ref } from '@vue/reactivity';
import { useRoute } from 'vue-router';
  
  export default {
      props: ['id'],
  
      setup() {
        const route = useRoute()
          const uri = "http://localhost:3000/posts/" + route.params.id

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
  
  
          return { blog }
      }
      
  }
  </script>
  
  <style>
  
  </style>