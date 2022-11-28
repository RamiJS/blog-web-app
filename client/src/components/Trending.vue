<template>
  <section class="w-full">
    <ul class="grid grid-cols-3 grid-rows-2 gap-10">
        <li v-for="trend in trending" :key="trend.index" class="flex flex-col justify-center">
            <router-link class="flex flex-row items-center gap-5 text-sm" to="">
                <img class="w-8 h-8 rounded-full" :src="trend.img" alt="user image">
                {{ trend.author }}
            </router-link>
            <router-link to="" class="text-black-200 font-bold text-lg py-3">
                {{trend.title}}
            </router-link>
            <span class="text-black-100/70 text-sm">{{trend.date}} . {{trend.time}} min read</span>
        </li>
    </ul>
  </section>
</template>

<script>
export default {

    setup() {
        const trending = [
            {img: 'http://place-puppy.com/200x200', author: 'pleasant Netflix Tech', title: 'Why we suck', date: 'Nov 27', time: '1',},
            {img: 'http://place-puppy.com/200x200', author: 'darkness Netflix Shows', title: 'Why we suck', date: 'Nov 8', time: '2',},
            {img: 'http://place-puppy.com/200x200', author: 'tower Netflix Movies', title: 'Why we suck and how we got to this', date: 'Nov 15', time: '8',},
            {img: 'http://place-puppy.com/200x200', author: 'whole Netflix Tech', title: 'Why we suck', date: 'Nov 5', time: '7',},
            {img: 'http://place-puppy.com/200x200', author: 'government Netflix Movies', title: 'Why we suck', date: 'Nov 25', time: '4',},
            {img: 'http://place-puppy.com/200x200', author: 'shine Netflix Shows', title: 'Why we suck', date: 'Nov 2', time: '8',},
        ]
        return { 
            trending
        }
    }

}
</script>

<style>

</style>