<template>
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-5 w-screen h-screen">
  
        <div class="flex flex-col justify-evenly items-center">
          <div class="flex flex-col justify-center">
            <img class="w-64 h-auto" src="@/assets/logos/coloredLogo.svg" alt="">
            <p class="normal-case text-2xl pt-6 text-black-100/50 self-center">Log into your account</p>
          </div>
          <div>
            <form @submit.prevent="handleSubmit" class="flex flex-col">
            <label for="email" class="capitalize text-black-100 text-xl">email</label>
            <input v-model="email" type="text" for="email" class="w-64 sm:w-80 p-3 my-4 border-black-100/30 border-2 rounded-md focus:outline-none focus:ring focus:ring-violet-300" placeholder="blogoty@gmail.com">
            <label for="password" class="capitalize text-black-100 text-xl">password</label>
            <input v-model="password" type="text" for="password" class="w-64 sm:w-80 p-3 my-4 border-black-100/30 border-2 rounded-md focus:outline-none focus:ring focus:ring-violet-300" placeholder="6+ characters" >
            <button class="bg-purple p-3 my-4 text-white text-base font-medium rounded-full focus:outline-none focus:ring focus:ring-violet-300">Login</button>
          </form>
          </div>
          <div>
            <p class="text-base text-black-100/50">Haven’t signed up yet? <router-link to="/signup" class="text-purple underline decoration-1">Sign up</router-link></p>
          </div>
        </div>
  
  
        <div class="relative col-span-2 h-screen hidden xl:block">
          <div class="h-screen w-full bg-gradient-to-tr from-lightblue via-pink to-purple opacity-80 absolute"></div>
          <div class="h-screen w-full  absolute flex flex-col justify-center px-[136px]">
            <h2 class="text-white text-6xl font-medium">
              Blogging is a conversation, <br />
              not a code.
              </h2>
            <p class="text-white text-xl pt-[40px] leading-relaxed tracking-widest">
              “It should feel genuinely good to earn income from your blog – you should be driven by a healthy ambition to succeed. If your blog provides genuine value, you fully deserve to earn income from it.”
            </p>
            <p class="text-white text-xl pt-[40px] leading-relaxed tracking-widest">
              -  Steve Pavlina
            </p>
          </div>
          <img class="h-screen w-full object-cover" src="@/assets/images/signupImage.png" alt="signup image">
        </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useStore } from 'vuex';

  export default {
    setup(){
      const store = useStore();

      const email = ref('')
      const password = ref('')


      const handleSubmit = async () => {
        try {
          await store.dispatch('login', {
            email: email.value,
            password: password.value
          })
        } catch(err) {
          console.log(err);
        }
      }


 return { 
  handleSubmit, 
  email, 
  password
}

    }
  }
  </script>
  
  <style>
  
  </style>