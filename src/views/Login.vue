<template>
  <div class="box-center">
    <div class="row">
      <div class="col">
        <div v-if="isLoading" class="text-center">
          <b-spinner></b-spinner>
        </div>
        <div v-else class="border py-4 px-4 text-center" style="width: 500px">
          <v-select class="mb-3" :options="dataUser" v-model="user" label="id">
          </v-select>
          <b-button-group>
            <b-button @click="login">Login</b-button>
            <b-button @click="$router.push('/')">Home</b-button>
          </b-button-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store";
export default {
  name: "Login",
  data() {
    return {
      isLoading: false,
      dataUser: null,
      user: null
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getData();
    },
    getData() {
      this.isLoading = true;
      axios
        .get("https://fakestoreapi.com/users")
        .then(resp => {
          if (resp.status === 200) {
            this.dataUser = resp.data;
            this.isLoading = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    login() {
      store
        .dispatch("setLoginInfo", this.user)
        .then(() => {
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.box-center {
  height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
