<template>
    <div>
        <div class="border-b border-black-100/30 dark:border-gray-700">
            <ul class="flex flex-row justify-around items-center -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                <li
                class="transition ease-in-out mr-2 w-full hover:bg-black-100/10 cursor-pointer text-black-100/70 hover:text-black-100 duration-300"
                :class="{active: title == selectedTitle}"
                v-for="title in tabTitles"
                :key="title"
                @click="selectedTitle = title"
                >
                    <p 
                    class="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:border-gray-300 dark:hover:text-gray-300 group"
                    >
                    {{title}}
                </p>
                </li>
            </ul>
        </div>
        <slot />
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { provide } from '@vue/runtime-core'

export default {
    setup(props, {slots}) {
        const tabTitles = ref(slots.default().map((tab) => tab.props.title))
        const selectedTitle = ref(tabTitles.value[0])

        provide("selectedTitle", selectedTitle)

      



    return {
        tabTitles,
        selectedTitle
    }
    
    }

}
</script>

<style scoped>
.active {
    color: rgb(49 49 49);
    border-bottom: 2px solid rgb(94, 140, 239);;
}
</style>