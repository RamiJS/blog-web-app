<template>
    <section class="w-full py-4 flex flex-col">
        <div class="flex flex-row">
            <img class="w-12 h-12" :src="blog.image" alt="">
            <div class="flex flex-col">
                <p>{{store.state.postedByDetails.postedBy.username}}</p>
            </div>
        </div>
        <div>

        </div>
   </section>
 </template>
 
 <script>
 import axios from 'axios'
 import { reactive, ref } from '@vue/reactivity'; 
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
 import { useStore } from 'vuex'
 export default {
    
 
setup() {

    const route = useRoute()
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