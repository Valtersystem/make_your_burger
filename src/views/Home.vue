<template>
  <div>
    <Banner />
    <div class="main-container">
       <h1>How's your burger ?</h1>
      <BurgerForm />
    </div>
  </div>
</template>

<script>
import Banner from "../components/Banner.vue";
import BurgerForm from "../components/BurgerForm.vue";
import Footer from "../components/Footer.vue";


export default {
  name: "Home",
  components: {
    Banner,
    BurgerForm,
    Footer
  },
    mounted() {
    document.title = 'Home | Make your Burger'
  }

}
</script>

<style scoped>
@media (max-width: 480px){
   h1{
        font-size: 2em;
    }
}
</style>
