<template>
<div class="container">
  <h1>Post Details</h1>
  <div v-if="doc">
      <div class="post-grid">
          <div class="left-grid">
              <div class="left-container">
              <div class="pic-container">
                  <img :src="doc.imageUrl">
              </div>
              <h2>{{doc.title}}</h2>
              <p>{{doc.description}}</p>
              <span>created by: {{doc.userName}}</span>
              <button v-if="ownerShip" @click="handleDelete" class="delete-btn">Delete Post</button>
              </div>
          </div>
          <div class="right-grid">
              <p v-if="!doc.comments.length">there is no comments yet</p>
              <div class="comment-section">
              <div class="comments">
                  <div v-for="comment in doc.comments" :key="comment.id">
                      <div class="single-comment">
                          <div>
                      <h4>{{comment.userName}}:</h4>
                      <h5>{{comment.comment}}</h5>
                          </div>
                          <div>
                              <span @click="deleteComment(comment.id)" v-if="user.uid === comment.userId" class="material-icons del">delete</span>
                          </div>
                      </div>
                  </div>
              </div>
              <Comments :id='id' :doc='doc'/>
              </div>
          </div>

      </div>

  </div>
</div>
  
</template>

<script>
import { computed, onMounted, onUpdated, ref } from 'vue'
import {db} from '../firebase/config'
import useDelete from '../composition/deleteDoc'
import useStorage from '../composition/storage'
import { useRouter } from 'vue-router'
import getUser from '../composition/getUser'
import Comments from '../components/Comments'
export default {
    components:{Comments},
    props:['id'],
    setup(props) {
        const {user} = getUser()
        const router = useRouter()
        const {deleteImg} = useStorage()
        const doc = ref(null)
        const {deleteDoc} = useDelete()

        db.collection('gallery').doc(props.id).onSnapshot(snap=>{
            doc.value = snap.data()
        })
        const handleDelete = async()=>{
            await deleteImg(doc.value.filePath)
            await deleteDoc(props.id)
            router.push({name:'Gallery'})
        }

        const ownerShip = computed(()=>{
            return doc.value && user.value && user.value.uid === doc.value.userId
        })

        const deleteComment = async(id)=>{
            const comments = doc.value.comments.filter(comment=> comment.id != id)
            await db.collection('gallery').doc(props.id).update({comments})

        }
        
        
        


        return{doc,handleDelete,ownerShip,deleteComment,user}
    }

}
</script>

<style >

.post-grid{
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
}
.pic-container{
    width: 100%;
    overflow: hidden;
}
.left-container{
    padding: 2px;
    background-color: #F06543;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.398);
    text-align: center;
    line-height: 1.1;
    border-radius: 5px;
    width: 100%;
}
.left-grid p {
    margin: .5rem 0;
}
span{
    color: white;
}
.right-grid p{
    text-align: center;
    
    
}

.delete-btn{
display: block;
margin: auto;
width: 100%;
margin: .5rem 0;
}
.comments{
    background: rgba(255, 127, 80, 0.768);
    width: 100%;
    margin: 0 auto;
    overflow: auto;
    height: 250px;
}
.single-comment{
    display: flex;
    margin: .5rem 0;
    padding: 0 3px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px dotted rgba(0, 0, 0, 0.44);
}
.single-comment h4{
    margin-right: .5rem;
    opacity: .8;
    display: inline;
}
.single-comment h5{
    display: inline;
}
.del{
    cursor: pointer;
}
.comment-section{
     width: 440px;
     margin: auto;
}


</style>