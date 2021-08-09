<template>
  <form class="main-form" @submit.prevent="handleSubmit">
      <h1>Sign in</h1>
      <input type="email" placeholder="Email" required v-model="email">
      <input type="password" placeholder="Password" required v-model="password">
      <button v-if="isPending" disabled>loading..</button>
      <button v-else>Sign in</button>
      <div class="error">{{error}}</div>
  </form>
</template>

<script>
import { ref } from 'vue'
import useLogin from '../composition/login'
import {useRouter} from 'vue-router'
export default {
    setup(props) {
        const router = useRouter()
       
        const {error,login, isPending} = useLogin()
        const email = ref('')
        const password = ref('')
        const handleSubmit = async()=>{
            await login(email.value,password.value)
            if(!error.value){
                router.push({name:'Gallery'})
            }
        }




        return{email,password,handleSubmit,error,isPending}
        
    }

}
</script>

<style >
.main-form h1{
    margin: 1rem 0;
    color: #273043;
}
.main-form{
    background: #F06543;
    width: 350px;
    min-height: 270px;
    padding: 1rem;
    margin: 5rem auto;
    text-align: center;
    border-radius: 5px;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.159);
}
input,textarea{
    display: block;
    width: 100%;
    margin: 1.5rem 0;
    padding: .5rem;
    border: none;
    border-bottom: solid 2px #2c3e50;
    font-size: .9rem;
    font-weight: bold;
    color: #273043;
}
button, .btn{
    background-color: #273043;
    border: none;
    color: white ;
    padding: .5rem 1.7rem;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 5px;
}
button:hover,.btn:hover{
    opacity: .8;
}
button:disabled{
    cursor: not-allowed;
    opacity: .5;
}
.error{
    margin: 1rem 0;
    color: white;
    line-height: 1.5;
    font-size: 15px;
}
</style>