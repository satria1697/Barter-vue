<template>
  <div v-if="dataGood === null" class="container-fluid">
    <div class="spinner-border"></div>
    <span>Data is Loading</span>
  </div>
  <div v-else class="container">
    <div class="row">
      <div class="col-4">
        <b-img-lazy
          :src="dataGood.image"
          @error="require('@/assets/blank-img.jpg')"
        ></b-img-lazy>
      </div>
      <div class="col-8">
        <h1>{{ dataGood.title }}</h1>
        <p>{{ dataGood.description }}</p>
        <hr />
        <div class="col">
          <span>Harga </span>
          <h3 class="text-danger">
            Rp.{{ formatPrice(dataGood.price * 10000) }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "goods",
  data() {
    return {
      dataGood: null
    };
  },
  mounted() {
    this.getGoods();
  },
  methods: {
    getGoods() {
      axios
        .get(
          "https://fakestoreapi.com/products/:id".replace(
            ":id",
            this.$route.params.goods_id
          )
        )
        .then(resp => {
          if (resp.status === 200) {
            this.dataGood = resp.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  max-height: 450px;
  max-width: 350px;
}
</style>
