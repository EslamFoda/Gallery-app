<template>
  <form @submit.prevent="handleSubmit" class="comments-form">
      <input type="text" required v-model="comment">
      <span @click="handleSubmit" class="material-icons">send</span>
  </form>
</template>

<script>
import { ref } from 'vue'
import {db} from '../firebase/config'
import getUser from '../composition/getUser'
export default {
    props:['doc','id'],
    setup(props) {
     const {user} = getUser()
     const comment = ref('')
     const handleSubmit = async()=>{
         let newComment = {
             comment:comment.value,
             userName: user.value.displayName,
             id: Math.floor(Math.random()* 10000000000),
             userId: user.value.uid
         }
        await db.collection('gallery').doc(props.id).update({
             comments:[...props.doc.comments,newComment]
         })
         comment.value = ''

     }



     return{handleSubmit,comment}
 }
}
</script>

<style>
.comments-form{
    background: #F06543;
    min-height: 60px;
    padding: .3rem;
    text-align: center;
    border-radius: 5px;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.159);
    display: flex;
    align-items: center;
}
.comments-form span{
    cursor: pointer;
}
.comments-form input{
    padding: .3rem;
    margin-right: .5rem;
    margin: .1rem;
}

</style>