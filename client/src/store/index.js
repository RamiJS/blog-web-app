import { Axios } from 'axios'
import { createStore } from 'vuex'
const axios = new Axios()
import router from "@/router"

export default createStore({
  state: {
    authUser: { username: null, email: null, roles: null, likes: null,},
    postedByDetails: {title: '', content: '', brief: '', image: '', createdAt: '', comments: '', likedBy: '', postedBy: ''}
  },
  getters: {
  },
  mutations: {
    setUser(state, payload) {
      state.authUser.username = payload.username
      state.authUser.email = payload.email
      state.authUser.roles = payload.roles
      state.authUser.likes = payload.likes
      console.log(state.authUser);
    },
    setBlogDetails(state, payload) {
      state.postedByDetails.postedBy = payload.postedBy
      state.postedByDetails.content = payload.content
      state.postedByDetails.title = payload.title
      state.postedByDetails.brief = payload.brief
      state.postedByDetails.image = payload.image
      state.postedByDetails.createdAt = payload.createdAt
      state.postedByDetails.comments = payload.comments
      state.postedByDetails.likedBy = payload.likedBy
    }


  },
  actions: {
    async signup(context, { username, email, password}) {
try {
      const res = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({username: username, email: email, password: password})
      })
      const data = await res.json()
      if(res.status >= 200 && res.status < 300) {
        context.commit('setUser', data)
        console.log(data);
        router.push('/feed')

      } else {
        throw new Error('something went wrong')
      }
    } catch(err) {
      console.log(err.message);
      console.log('err');
    }
    },

    async login(context, { email, password }){
      try {
       const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ email: email, password: password})
       })
       const data = await res.json()
       if(res.status >= 200 && res.status < 300) {
        context.commit('setUser', data)
        router.push('/feed')
       } else {
        throw new Error('something went wrong')
       }
      } catch (err) {
        console.log(err.message);
      }
    },

    async getBloggerDetails(context, { id }) {
     try {
      const res = await fetch ("http://localhost:3000/posts/" + id)
      const data = await res.json()
      context.commit('setBlogDetails', data)
      console.log('data is' + data.title);
      throw Error('SOMETHING WENT WRONG')
     } catch(err) {
      console.log('ERR 404 ' + err.message);
     }

    }

  },
  modules: {
  }
})
