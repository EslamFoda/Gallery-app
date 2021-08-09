<template>
  <div class="home">
    <Gallerylist :documents='documents'/>
  </div>
</template>

<script>
import { ref } from 'vue'
import Gallerylist from '../components/Gallerylist'
import getDocuments from '../composition/getDocuments'
export default {
  components:{Gallerylist},
  setup(props) {
    const {documents} = getDocuments()
    
    return {documents}
  }
}
</script>
