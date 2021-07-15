<template>
  <div id="app">
    <Navbar></Navbar>
    <Main></Main>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Navbar from "@/components/navbar.vue";
import Main from "@/components/main.vue";
import Footer from "@/components/footer.vue";

@Component({
  components:{
    Navbar,
    Main,
    Footer,
  }
})
export default class App extends Vue {}
</script>

<style>
html,body,#app{
    height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    /* Global variables */
    --green:#009245;
    --red:#ed1c24;
    --blue:#0071bc;
    --white:#fff;
}
/* Generic */
button{
    cursor: pointer;
}
</style>
