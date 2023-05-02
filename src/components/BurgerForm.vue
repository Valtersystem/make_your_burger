<template>
  <div>
    <Message :msg="msg" :color="color" v-show="msg" />
    <div>
      <form id="burger-form" @submit="validation">
        <div class="input-container">
          <label for="neme">Name</label>
          <input
            type="text"
            id="name"
            v-model="name"
            placeholder="Type your name"
          />
        </div>

        <div class="input-container">
          <label for="bread">Bread:</label>
          <select name="bread" id="bread" v-model="bread">
            <option value="" selected disabled>Select bread</option>
            <option v-for="bread in breads" :key="bread.id" :value="bread.tipo">
              {{ bread.tipo }}
            </option>
          </select>
        </div>

        <div class="input-container">
          <label for="meat">Meat:</label>
          <select name="meat" id="meat" v-model="meat">
            <option value="" selected disabled>Select meat</option>
            <option v-for="meat in meats" :key="meat.id" :value="meat.tipo">
              {{ meat.tipo }}
            </option>
          </select>
        </div>

        <div id="opcionais-container" class="input-container">
          <label id="options-title" for="options">Optional:</label>
          <div
            class="checkbox-container"
            v-for="opcional in dataoptions"
            :key="opcional.id"
          >
            <input
              type="checkbox"
              name="options"
              v-model="options"
              :value="opcional.tipo"
            />
            <span>{{ opcional.tipo }}</span>
          </div>
        </div>
        <div class="input-container">
          <input type="submit" value="Create Burger" class="submit-btn" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Message from "./Message.vue";
export default {
  name: "BurgerForm",
  data() {
    return {
      breads: null,
      meats: null,
      dataoptions: null,
      name: null,
      bread: null,
      meat: null,
      options: [],
      status: "requested",
      msg: null,
      color: null,
    };
  },
  methods: {
    async getIngredients() {
      const req = await fetch("https://json-server-make-your-burger.vercel.app/ingredientes");
      const data = await req.json();

      this.breads = data.breads;
      this.meats = data.meats;
      this.dataoptions = data.opcionais;
    },
    validation(e) {
      e.preventDefault();
      if (!this.name || !this.bread || !this.options || !this.meat) {
        (this.msg = `Please fill in all fields`), (this.color = "red");
        setTimeout(() => (this.msg = ""), 3000);
      } else {
        this.createBurger();
      }
    },
    async createBurger() {
      const data = {
        name: this.name,
        meat: this.meat,
        bread: this.bread,
        options: Array.from(this.options),
        status: "requested",
      };

      const dataJson = JSON.stringify(data);
      const req = await fetch("https://json-server-make-your-burger.vercel.app/burgers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dataJson,
      });

      const res = await req.json();

      // Colocar uma mensagem de sistema
      this.msg = `Order Nº ${res.id} placed successfully`;
      this.color = "blue";

      //Limpar mensagem de sistema
      setTimeout(() => (this.msg = ""), 3000);

      // Limpor os campos
      this.name = "";
      this.meat = "";
      this.bread = "";
      this.options = [];
    },
  },

  components: {
    Message,
  },
  mounted() {
    this.getIngredients();
   
  },
};
</script>

<style scoped>
#burger-form {
  max-width: 400px;
  margin: 0 auto;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  margin-bottom: 15px;
  color: #222;
  padding: 5px 10px;
  border-left: 4px solid #fcba03;
}

input,
select {
  padding: 5px 10px;
  width: 100%;
}

#opcionais-container {
  flex-direction: row;
  flex-wrap: wrap;
}

#options-title {
  width: 100%;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  width: 50%;
  margin-bottom: 20px;
}

.checkbox-container span,
.checkbox-container input {
  width: auto;
}

.checkbox-container span {
  margin-left: 6px;
  font-weight: bold;
}

.submit-btn {
  background-color: #222;
  color: #fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}

.submit-btn:hover {
  background-color: transparent;
  color: #222;
}
</style>