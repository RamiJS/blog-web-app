<template>
  
    <div v-bind="containerProps" class="h-screen p-2 rounded w-full overflow-hidden">
      <div v-bind="wrapperProps" class="w-full mx-auto">
        <div v-for="{index, data} in list" :key="index" class="h-[180px] px-4 mb-4">
        <SingleBlog
        :blog="data"
        />
        </div>
      </div>
    </div>

</template>

<script setup>
import SingleBlog from '@/components/SingleBlog.vue';
import Testing from '@/components/Testing.vue';
import axios from 'axios'
import { ref } from '@vue/reactivity';
import { useVirtualList } from '@vueuse/core'
import { computed } from 'vue';


    


        const blogs = ref('')
        const {list, containerProps, wrapperProps} = useVirtualList(blogs, {
          itemHeight: 204
        })

        const getBlogs = async () => {

                await fetch('http://localhost:3000/posts')
                .then((res) => res.json())
                .then((data) => (blogs.value = data))
                .catch((err) => console.log(err));
     
                console.log(blogs.value[0], 'hh');
           
        }
        getBlogs()
       

    


</script>

<style>

</style>