<template>
<section class="w-screen bg-sky py-20  grid grid-rows-1 xl:grid-rows-1 grid-cols-1 xl:grid-cols-2 gap-5">
    <div class="flex flex-col items-start justify-center">
        <h1 class="text-5xl md:text-8xl font-medium text-black-200">
            Be Curious
        </h1>
        <p class="text-black-100 text-lg xl:text-2xl py-2">
            Discover stories, thinking, and expertise <br /> from writers on any topic.
        </p>
        <router-link to="/" class="text-white py-3 px-12 bg-black-200 rounded-full text-md xl:text-xl font-medium my-10">Discover Articles</router-link>
    </div>

    <div class="flex justify-center xl:justify-end order-first xl:order-last">
        <img class="w-64 md:w-auto" src="@/assets/images/FirstSecIllustration.svg" alt="illustration">
    </div>
</section>
</template>

<script>
export default {

}
</script>

<style>

</style>