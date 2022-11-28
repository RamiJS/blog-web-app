<template>
    <section class="max-w-[700px]">
        
            <router-link @click="sendParam" :to="{ name: 'blog', params: { id: blog._id } }" class="flex flex-row my-6 gap-2 lg:gap-8">
            
                    <div class="h-[150px] w-[120px] lg:w-[200px] lg:h-[180px] flex-shrink-0">
                        <img class="h-full object-cover" :src="blog.image" alt="">
                    </div>
                
                    <div class="flex flex-col gap-1 lg:gap-3">
                        <div class="flex flex-row items-center gap-2 lg:gap-4">
                            <img class="w-6 rounded-full" :src="blog.postedBy.image" alt="">
                            <p class="text-black-100 capitalize text-sm">{{blog.postedBy.username}}</p>
                        </div>
                        <h3 class="text-black-300 capitalize text-sm lg:text-2xl font-bold">
                            {{blog.title}}
                        </h3>
                        <p class="text-black-100/70 text-xs lg:text-lg">{{blog.brief}}</p>
                        <div class="flex flex-row items-center gap-1 lg:gap-4">
                            <p class="text-black-100/70 text-xs lg:text-sm">{{blog.createdAt.split('T')[0].split('-')[2] + ', ' +blog.createdAt.split('T')[0].split('-')[0]}}</p>
                            <p class="bg-black-100/10 place-self-start px-2 py-1 rounded-xl text-black-100/70 text-xs lg:text-sm">Life Style</p>
                        </div>
                    </div>
            
        </router-link>
            
    </section>
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