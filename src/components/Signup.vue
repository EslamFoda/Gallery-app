<template>
  <form class="main-form" @submit.prevent="handleSubmit">
      <h1>Sign up</h1>
      <input type="text" required placeholder="Name" v-model="displayName">
      <input type="email" placeholder="Email" required v-model="email">
      <input type="password" placeholder="Password" required v-model="password">
      <button v-if="isPending" disabled>Loading..</button>
      <button v-else>Sign up</button>
      <div class="error">{{error}}</div>
  </form>
</template>

<script>
import { ref } from 'vue'
import useSignup from '../composition/signup'
import { useRouter } from 'vue-router'
export default {
    setup(props) {
        const {signup,error,isPending} = useSignup()
        const router = useRouter()
        const email = ref('')
        const password = ref('')
        const displayName = ref('')
        const handleSubmit = async()=>{
            await signup(email.value,password.value,displayName.value)
            if(!error.value){
                router.push({name:'Gallery'})
            }
        }

        return{email,password,displayName,handleSubmit,isPending,error}
        
    }

}
</script>

<style>

</style>