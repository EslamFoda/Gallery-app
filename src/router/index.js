import { createRouter, createWebHistory } from 'vue-router'
import Gallery from '../views/Gallery.vue'
import Login from '../components/Login.vue'
import Signup from '../components/Signup.vue'
import Create from '../components/Createpost.vue'
import Details from '../components/Details.vue'
import {projectAuth} from '../firebase/config'



const requireAuth = (to,from,next)=>{
 let user = projectAuth.currentUser
 if(!user){
   next({name:'Login'})
 }else{
   next()
 }
}

const requireNoAuth = (to,from,next)=>{
  let user = projectAuth.currentUser
  if(user){
    next({name:'Gallery'})
  }else{
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Gallery',
    component: Gallery,
    beforeEnter: requireAuth
  },
  {
    path:'/login',
    name:'Login',
    component:Login,
    beforeEnter:requireNoAuth
  },
  {
    path:'/signup',
    name:'Signup',
    component:Signup
  },
  {
    path:'/create',
    name:'Create',
    component:Create,
    beforeEnter: requireAuth
  },
  {
    path:'/details/:id',
    name:'Details',
    component:Details,
    props:true,
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
