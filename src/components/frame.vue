<template>
  <div class="d-flex flex-column">
    <nav class="navbar mb-3">
      <div class="navbar-brand">
        <router-link to="/">Wish Store</router-link>
      </div>
      <b-navbar-nav class="ml-auto mr-2">
        <router-link to="/login" v-if="loginInfo === null">Login</router-link>
        <b-nav-dropdown v-else :text="loginInfo.username" right>
          <b-dropdown-item @click="$router.push('/basket')"
            ><b-icon icon="basket"></b-icon> Basket</b-dropdown-item
          >
          <b-dropdown-item @click="logout"
            ><b-icon icon="power"></b-icon> Logout</b-dropdown-item
          >
        </b-nav-dropdown>
      </b-navbar-nav>
    </nav>
    <router-view></router-view>
    <div class="container-fluid mt-auto">
      <div class="row">
        <span class="offset-10 col-2"
          >&copy;{{ new Date().getFullYear() }} Andhika Satria</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
export default {
  name: "navs",
  computed: {
    loginInfo() {
      return store.getters["getLoginInfo"];
    }
  },
  methods: {
    logout() {
      store
        .dispatch("setLoginInfo", null)
        .then(() => {
          this.$router.push("/login");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  margin-bottom: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
