<template>
  <form class="main-form" @submit.prevent="handleSubmit">
      <h1>Create Post</h1>
      <input type="text" placeholder="title" required v-model="title">
      <textarea placeholder="Description" required v-model="description"></textarea>
      <label>choose image</label>
      <input @change="change" type="file">
      <button v-if="isPending" disabled>loading...</button>
      <button v-else>Post</button>
      <div class="error">{{fileError}}</div>
  </form>
</template>

<script>
import { ref } from 'vue'
import useStorage from '../composition/storage'
import useDocument from '../composition/useDocument'
import getUser from '../composition/getUser'
import {timestamp} from '../firebase/config'
import { useRouter } from 'vue-router'
export default {
    setup(props) {
        const router = useRouter()
        const isPending = ref(false)
        const {user} = getUser()
        const {error,addDocs,docId} = useDocument()
        const {url,filePath,uploadImg} = useStorage() 
        const title = ref('')
        const description = ref('')
        const fileError = ref(null)
        const file = ref(null)
        const handleSubmit = async()=>{
            isPending.value = true
            if(!fileError.value){
                isPending.value = true
                await uploadImg(file.value)
                await addDocs({
                    title: title.value,
                    description: description.value,
                    userId: user.value.uid,
                    userName: user.value.displayName,
                    filePath: filePath.value,
                    comments:[],
                    imageUrl: url.value,
                    createdAt: timestamp()
                })
                isPending.value = false
                router.push({name:'Details',params:{id:docId.value}})

            }
            isPending.value = false
        }


        const types = ['image/jpeg','image/png']



        const change = (e)=>{
            fileError.value = null
            let selected = e.target.files[0]
            if(selected && types.includes(selected.type)){
                file.value = selected
                 fileError.value = null
            } else {
                fileError.value = 'please select jpeg or png img'
            }
        }



        return{title,description,handleSubmit,change,fileError,isPending}
        
    }

}
</script>

<style>
label{
    display: block;
    text-align: left;
}

</style>