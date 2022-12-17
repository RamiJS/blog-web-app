import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SignupView from '@/views/SignupView.vue'
import LoginView from '@/views/LoginView.vue'
import UserFeedView from '@/views/UserFeedView.vue'
import SingleBlogView from '@/views/SingleBlogView.vue'
import WriteBlogsView from '@/views/WriteBlogsView.vue'
import BookMarksView from '@/views/BookMarksView.vue'
import ProfileView from '@/views/ProfileView.vue'

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
    name: 'UserFeed',
    component: UserFeedView
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
  },
  {
    path: '/bookmarks',
    name: 'bookmarks',
    component: BookMarksView,
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
