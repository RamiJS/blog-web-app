<template>
  <footer class="w-full">
      <div class="w-full flex flex-row gap-3">
        <router-link v-for="item in footerItems" :key="item.item"  to="" class="font-sm text-black-100/60">
            {{item.title}}
        </router-link>
      </div>
  </footer>
</template>

<script>
export default {
    setup() {
        const footerItems = [{title: 'about us'}, {title:'blog'}, {title:'terms'}, {title:'privacy'}, {title:'FAQ'}]

        return { footerItems }
    }

}
</script>

<style>

</style>