import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SignupView from '@/views/SignupView.vue'
import LoginView from '@/views/LoginView.vue'
import UserFeedView from '@/views/UserFeedView.vue'
import SingleBlogView from '@/views/SingleBlogView.vue'
import WriteBlogsView from '@/views/WriteBlogsView.vue'
import BookMarksView from '@/views/BookMarksView.vue'
import ProfileView from '@/views/ProfileView.vue'
import store from '@/store/index';


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/feed',
    name: 'feed',
    component: UserFeedView,
    beforeEnter: (to, from) => {
      // ...
      const signedIn = store.state.authUser.username
      console.log('beforeEnter log' + ' ' + signedIn);
      if(signedIn == null) return { name: 'login' }
    }
  },
  {
    path: '/feed/:id',
    name: 'blog',
    component: SingleBlogView,
    props: route => ({
      id: route.params.id
    }),
  },
  {
    path: '/writeblog',
    name: 'writeview',
    component: WriteBlogsView,
    beforeEnter: (to, from) => {
      // ...
      const user = store.state.authUser
      console.log('beforeEnter log' + ' ' + user);
      if(user.username == null) return { name: 'login' }
      else if(user.roles == 'user') return { name: 'feed' } 
    }
  },
  {
    path: '/bookmarks',
    name: 'bookmarks',
    component: BookMarksView,
    props: true
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: ProfileView,
    props: route => ({
      id: route.params.id
    }),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
