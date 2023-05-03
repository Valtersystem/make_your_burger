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
import axios from "axios";
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
    getIngredients() {
      axios
        .get("https://json-server-make-your-burger.vercel.app/ingredientes")
        .then((response) => {
          this.breads = response.data.breads;
          this.meats = response.data.meats;
          this.dataoptions = response.data.opcionais;
        })
        .catch((error) => {
          console.log(error);
        });
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
    createBurger() {
      const data = {
        name: this.name,
        meat: this.meat,
        bread: this.bread,
        options: Array.from(this.options),
        status: "requested",
      };

      axios
        .post("https://json-server-make-your-burger.vercel.app/burgers", data)
        .then((response) => {
          this.msg = `Order Nº ${response.data.id} placed successfully`;
          this.color = "blue";
          setTimeout(() => (this.msg = ""), 3000);

          // Limpor os campos
          this.name = "";
          this.meat = "";
          this.bread = "";
          this.options = [];
        })
        .catch((error) => {
          console.log(error);
        });
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