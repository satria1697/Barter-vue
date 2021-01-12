<template>
  <div>
    <nav class="navbar mb-3">
      <div class="navbar-brand">
        <span>Wish Store</span>
      </div>
    </nav>
    <router-view></router-view>
    <div class="footers container-fluid">
      <div class="row">
        <span class="offset-10 col-2">&copy;2021 Wish Enterprise</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "navs"
};
</script>

<style lang="scss" scoped>
.navbar {
  margin-bottom: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
