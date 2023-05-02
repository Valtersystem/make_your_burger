<template>
  <div>
    <div class="main-container">
      <h1>Manage orders:</h1>
      <Dashboard />
    </div>
  </div>
</template>

<script>
import Dashboard from "../components/Dashboard.vue";

export default {
  name: "Pedidos",
  components: {
    Dashboard,
  },
  mounted() {
    document.title = "Orders | Make your Burger";
  },
};
</script>

<style scoped>
@media (max-width: 480px) {
  h1 {
    font-size: 2em;
  }
}
@media (max-width: 380px) {
  h1 {
    font-size: 1.7em;
  }
}
</style>
