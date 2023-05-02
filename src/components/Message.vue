<template>
  <div class="message-container" v-bind:class="bgColor" >
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    msg: String,
    color: String
  },
  data() {
    return {
     
    };
  },
  computed:{
    bgColor(){
       return `bgcolor-${this.color}`;
    }
  }
};
</script>


<style scoped>
.message-container {
  color: #004085;
  background-color: #cce5ff;
  border: 2px solid #b8daff;
  border-radius: 5px;
  padding: 10px;
  max-width: 400px;
  margin: 30px auto;
}

.bgcolor-red{
  background-color: #ff0000;
  color: white;
}
</style>