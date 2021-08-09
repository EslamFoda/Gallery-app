<template>
  <nav>
      <router-link :to="{name:'Gallery'}">
          <div class="logo-flex">
          <img src="@/assets/logo.png">
           <h1>GalleryApp</h1>
          </div>
      </router-link>
      <div v-if="!user">
          <router-link class="btn" :to="{name:'Login'}">Sign in</router-link>
          <router-link class="btn" :to="{name:'Signup'}">Sign up</router-link>
      </div>
      <div v-else>
          <router-link class="btn" :to="{name:'Create'}">Create Post</router-link>
          <button class="btn" @click="handle">Sign out</button>
          <span v-if="user" class="userName">logged in as {{user.displayName}}</span>
      </div>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router'
import getUser from '../composition/getUser'
import useSignout from '../composition/signOut'
export default {
    setup(props) {
        const router = useRouter()
        const {user} = getUser()
        const {signout} = useSignout()
        const handle = async()=>{
            await signout()
            router.push({name:'Login'})

        }



        return{user,handle}
    }

}
</script>

<style>
nav{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem .5rem;
    background-color: #F06543;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.282);
}
a{
    text-decoration: none;
    color: white;
}
.btn{
    margin-right: 1rem;
}
.userName{
    color: white;
    margin-right: 1rem;
}
nav img{
    height: 50px;
    width: 50px;
    margin-right: 1rem;
}
.logo-flex{
    display: flex;
    align-items: center;
}
</style>