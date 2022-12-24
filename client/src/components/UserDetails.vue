<template>
    <section class="w-full py-4 flex flex-col gap-5">
        <div class="flex flex-row items-center justify-between">
            <div class="flex flex-row items-center gap-5">
                <img class="w-20 h-20 rounded-full" :src="store.state.postedByDetails.postedBy.image" alt="">
                <div class="flex flex-col">
                    <p class="text-base font-medium text-black-100 capitalize">{{store.state.postedByDetails.postedBy.username}}</p>
                    <p class="text-sm text-black-300/50">2.5k follower</p>
                </div>
            </div>
            <img class="w-6 h-6 " src="@/assets/icons/dotsVertical.svg" alt="dots icon">
        </div>
    <p class="text-sm text-black-300/50">
        {{store.state.postedByDetails.postedBy.status}}
    </p>
    <button class="bg-purple py-2 px-5 rounded-full text-white self-start">Follow</button>
   </section>
 </template>
 
 <script>
 import axios from 'axios'
 import { reactive, ref } from '@vue/reactivity'; 
import { onMounted } from 'vue';
 import { useStore } from 'vuex'
 export default {
    
 
setup() {

    const store = useStore()
    
        
       const blog = reactive({
           title: store.state.postedByDetails.title,
           content: '',
           brief: '',
           image: '',
           createdAt: '', 
           comments: '', 
           likedBy: [],
           postedBy: ''

       })
  
   

     
         return { blog, store }
     }
     
 }
 </script>
 
 <style>
 
 </style>