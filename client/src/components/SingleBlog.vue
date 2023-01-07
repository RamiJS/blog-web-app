<template>
        <router-link @click="sendParam" :to="{ name: 'blog', params: { id: blog._id } }" class="flex flex-col md:flex-row gap-5 md:gap-2 my-6 lg:gap-8 px-5">
            
            <div class="h-[150px] w-full md:w-[200px] md:h-[180px] flex-shrink-0 md:my-auto">
                <img class="object-cover h-full w-full" :src="blog.image" alt="">
            </div>
                
            <div class="flex flex-col gap-2 md:gap-3">
                <div class="flex flex-row items-center gap-2 md:gap-4">
                    <img class="w-6 rounded-full" :src="blog.postedBy.image" alt="">
                    <p class="text-sm capitalize text-black-100">{{blog.postedBy.username}}</p>
                </div>
                <h3 class="text-sm font-bold capitalize text-black-300 md:text-2xl">
                    {{blog.title}}
                </h3>
                <p class="text-xs text-black-100/70 md:text-md">{{blog.brief}}</p>
                <div class="flex flex-row items-center gap-1 md:gap-4">
                    <p class="text-xs text-black-100/70 md:text-sm">{{blog.createdAt.split('T')[0].split('-')[2] + ', ' +blog.createdAt.split('T')[0].split('-')[0]}}</p>
                    <p class="px-2 py-1 text-xs bg-black-100/10 place-self-start rounded-xl text-black-100/70 md:text-sm">Life Style</p>
                </div>
            </div>
            
        </router-link>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
export default {
    props: ['blog']
   ,

   setup(props) {
    const store = useStore();

   
    console.log(props.blog);
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



    return {
        sendParam
    }
   }


}
</script>

<style>

</style>