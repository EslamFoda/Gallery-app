<template>
  <div id="nav">
    <Navbar/>
  </div>
  <router-view/>
</template>

<script>
import Navbar from '../src/components/Navbar'
export default {
  components:{Navbar},
  setup(props) {
    
  }
  
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

*{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
body{
  background: #58BC82;
}

</style>
