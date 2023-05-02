<template>
  <div class="relative">
    <Navbar :logo="logo_src" :alt="app_name" />
      <router-view />
  </div>
</template>


<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      logo_src: "/img/logo.png",
      app_name: "Make Your Burger",
    };
  },
};
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap');

html, body, #app {
  height: 100%;
}

* {
  font-family: 'Roboto Condensed', sans-serif;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.main-container {
  margin: 50px;
  min-height: 250px;
  padding: 2rem;
}

h1 {
  text-align: center;
  font-size: 42px;
  margin-bottom: 30px;
  color: #222;
}

select {
  appearance: auto !important;
}

.relative{
  position: relative;
}
</style>
