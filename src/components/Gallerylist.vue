<template>
<div class="container">
    <div class="search-nav">
        <h2>Posts</h2>
        <form class="flex-search">
        <label>Search</label>
        <input class="search" type="text" v-model="postSearch">   
        </form>
    </div>
  <div class="grid-gallery">
  <div v-for="doc in filter" :key="doc.id">
      <router-link :to="{name:'Details',params: {id:doc.id}}">
      <div class="single-post">
          <div class="img-container">
              <img :src="doc.imageUrl">
              <div class="desciption">
                  <span>Description</span>
                  <p>{{doc.description}}</p>
              </div>
          </div>
          <div class="post-details">
              <h3>{{doc.title}}</h3>
              <span>Created By : <span class="username">{{doc.userName}}</span></span>
              <p>{{doc.comments.length}} comments</p>
          </div>
      </div>
      </router-link>
  </div>
  </div>
</div>
</template>

<script>
import { computed, ref } from 'vue'
export default {
    props:['documents'],
    setup(props) {
        const postSearch = ref('')

        const filter = computed(()=>{
            if(props.documents){
                return props.documents.filter(doc=>{
                    return doc.title.match(postSearch.value)
                })
            }
        })
       

        return{postSearch,filter}
    }
}
</script>

<style>
.search-nav{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.search-nav h2{
    color: white;
}

.flex-search{
    display: flex;
    align-items: center;
}

.search{
    width: 100px;
    padding: 0;
    display: inline;
    margin-left: 1rem;
}
.container{
    padding: 1.5rem;
}
.grid-gallery{
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap: 2rem;
}
img{
    width: 100%;
    height: 100%;
    display: block;
}
.img-container{
    width: 100%;
    height: 200px;
    overflow: hidden;
    position: relative;
}
.desciption{
    position: absolute;
    bottom: 0;
    right: 0;
    height: 0;
    width: 100%;
    background-color: #58bc82d7;
    transition: all .3s ease-in-out;
    text-align: center; 
}
.desciption span{
    background: #F06543;
    padding: .2rem;
    border-radius: 5px;
    margin:.5rem 0;
    display: inline-block;
   font-weight: 300;
   font-size: 15px;
}
.desciption p {
    color: #273043 ;
    line-height: 1.2;
    font-size: small;
    display: block;
}
.single-post:hover .desciption{
    height: 70%;
}
.post-details{
    text-align: center;
    line-height: 1.5;
    padding: 2px 0;
}
.single-post{
    background-color: #F06543;
    padding: 2px;
    border-radius: 5px;
    cursor: pointer;
    transition: all .3s ease-in-out;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.248);
}
.single-post:hover{
    transform: scale(1.1);
    color: white;
}
.container h1{
  text-align: left;
  margin-bottom: 1rem;
  color: white;

}
.username{
    color: white;
}
a{
    color: inherit;
}
</style>