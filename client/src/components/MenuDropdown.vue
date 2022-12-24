<script setup>
import { ref }  from 'vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { PencilIcon, DocumentDuplicateIcon, UserCircleIcon} from "@heroicons/vue/24/outline"
import { ChevronDownIcon, } from '@heroicons/vue/20/solid'
import { useStore } from 'vuex'

const store = useStore();

const options = [
    {label: "profile", href: `/profile/${store.state.authUser.id}`, icon: PencilIcon},
    {label: "sign out", href: "", icon: DocumentDuplicateIcon},
]


</script>

<template>
     <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton class="relative items-center justify-center ">
          <UserCircleIcon class="w-[36px] h-[36px] text-black-100/70 m-auto"
          aria-hidden="true"
          />
          <ChevronDownIcon
            class="absolute -bottom-2 w-5 h-5 left-6 text-black-100/70 hover:text-black-100"
            aria-hidden="true"
          />
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute left-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="px-1 py-1">
           
            <MenuItem v-for="item in options"
           :key="item.index"
            as="template"
            
            >
            <router-link
              :to="item.href"
              class="flex items-center w-full px-2 py-2 text-sm rounded-md text-black-100 ui-active:bg-purple ui-active:text-white group"
              >
              <component
                :is="item.icon"
                class="w-5 h-5 mr-2 text-violet-400 ui-active:text-white"
                >
                </component>
              
                {{item.label}}
              </router-link>
            </MenuItem>
          </div>
          

          
        </MenuItems>
      </transition>
    </Menu>
</template>