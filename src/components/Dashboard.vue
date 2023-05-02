<template>
  <div class="">
    <Message :msg="msg" v-show="msg" />
    <div class="container-card">
      <div class="content-card">
        <div class="body-card" v-for="burger in burgers" :key="burger.id">
          <p class="title-card">
            <span>#{{ burger.id }}</span
            >{{ burger.name }} <samp @click="deleteBurger(burger.id)">✖</samp>
          </p>
          <p><span>Bread:</span>{{ burger.bread }}</p>
          <p><span>Meat:</span>{{ burger.meat }}</p>

          <ul>
            <p><span>Optional:</span></p>
            <li v-for="(option, index) in burger.options" :key="index">
              {{ option }},
            </li>
          </ul>
          <div class="card-status">
            <label for="">Status:</label>
            <select @change="updateBurger($event, burger.id)" v-bind:class="bgStatus = burger.status">
              <option
                v-for="s in status"
                :key="s.id"
                :value="s.tipo"
                :selected="burger.status == s.tipo"
                v-bind:class="bgStatus = s.tipo">
                {{ s.tipo }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from "./Message.vue";

export default {
  name: "Dashboard",
  data() {
    return {
      burgers: null,
      burgers_id: null,
      status: [],
      msg: null,
    };
  },
  components: {
    Message,
  },
  methods: {
    async getPedidos() {
      const req = await fetch("https://json-server-make-your-burger.vercel.app/burgers");

      const data = await req.json();

      this.burgers = data;

      // Resgatar os status
      this.getStatus();
    },
    async getStatus() {
      const req = await fetch("https://json-server-make-your-burger.vercel.app/status");

      const data = await req.json();

      this.status = data;
    },
    async deleteBurger(id) {
      const req = await fetch(`https://json-server-make-your-burger.vercel.app/burgers/:${id}`, {
        method: "DELETE",
      });

      const res = await req.json();

      //msg
      this.msg = `Order removed`;
      setTimeout(() => (this.msg = ""), 3000);

      this.getPedidos();
    },
    async updateBurger(event, id) {
      const option = event.target.value;

      const dataJson = JSON.stringify({ status: option });

      const req = await fetch(`https://json-server-make-your-burger.vercel.app/burgers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: dataJson,
      });

      const res = await req.json();

      //msg
      this.msg = `The order Nº ${res.id} has been updated to ${res.status}`;
      // setTimeout(() => (this.msg = ""), 3000);

      this.getPedidos();
    },
  },
  mounted() {
    this.getPedidos();
  },
};
</script>


<style scoped>
span {
  font-weight: bold;
}

.container-card {
  padding: 22px;
}

.content-card {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 8%;

  justify-content: start;
}

.body-card {
  padding: 20px;
  /* border: 1px solid; */
  background: #ffffff;
  box-shadow: 0px 6.45883px 12.9177px rgba(41, 41, 41, 0.08);
  border-radius: 25.8353px;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  max-width: 300px;
}

.body-card ul {
  display: flex;
  gap: 0.5rem;
  margin: 1px 0;
  /* max-width: 228px; */
  flex-wrap: wrap;
  align-items: center;
}

.body-card li {
  list-style: none;
  /* padding: 8px 8px; */
  /* font-size: 0.8rem; */
  /* background: #f6fff6; */
  /* border-bottom: 1.61471px solid #dcb47a; */
  /* border-radius: 19.3765px; */

  /* color: #dcb47a; */
}

.body-card p {
  padding: 5px 0;
  display: flex;
  gap: 0.5rem;
}

.body-card > :nth-child(1) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-transform: uppercase;
  position: relative;
}

.body-card samp {
  color: #d13232;
  font-size: 1.5rem;
  transition: 0.5s;
  cursor: pointer;
}

.body-card samp:hover {
  color: rgb(255, 0, 0);
  font-size: 1.5rem;
}

.title-card {
  text-align: center;
  margin-bottom: 5px;
}

.title-card span {
  padding: 8px;
  border-radius: 100%;
  border-right: solid;
  border-bottom: solid;
  border-top: solid 1px;
  border-left: solid 1px;
}

.card-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 20px;
}

.card-status label {
  font-weight: 600;
}

.card-status select {
  padding: 0px 14px 3px 2px;
  border: none;
  border: 1px solid;
  border-radius: 5px;
  width: 60%;
}

@media (max-width: 850px) {
  .main-container {
    margin: 0px;
  }

  .container-card {
    padding: 0px;
  }
}

@media (max-width: 700px) {
  .main-container {
    margin: 0px;
  }

  .content-card {
    justify-content: space-around;
  }

  .container-card {
    padding: 0px;
  }

  .body-card {
    max-width: 100%;
  }
}

.production{
  background-color: #ffff0060;
}
.requested{
  background-color: #00d9ff67;
}
.finalized{
  background-color: #ff000047;
}

select, option{
  text-transform: capitalize;
}
</style>
