<template>
  <div v-if="isLoading" class="container-fluid">
    <div class="text-center">
      <b-spinner></b-spinner>
    </div>
  </div>
  <div v-else class="container">
    <div class="row">
      <div class="col-md-4">
        <b-img-lazy
          :src="dataGood.image"
          @error="require('@/assets/blank-img.jpg')"
        ></b-img-lazy>
      </div>
      <div class="col-md-8">
        <div class="col">
          <h1>{{ dataGood.title }}</h1>
          <p>{{ dataGood.description }}</p>
          <hr />
        </div>
        <div class="col">
          <span>Harga </span>
          <h3 class="text-danger">
            Rp.{{ formatPrice(dataGood.price * 10000) }}
          </h3>
        </div>
        <div class="col-md-3">
          <b-input-group prepend="Jumlah">
            <b-input type="number" number lazy v-model="total"></b-input>
          </b-input-group>
        </div>
        <div class="col">
          <span>Total Harga </span>
          <h3>Rp.{{ formatPrice(dataGood.price * 10000 * total) }}</h3>
        </div>
        <div class="col">
          <b-button>Tambah ke basket</b-button>
        </div>
      </div>
      <div v-if="dataAnother" class="row mt-4">
        <b-card
          v-for="data in dataAnotherSlice"
          :key="data.id"
          class="col-md-3"
        >
          <b-card-body
            style="height: 22rem"
            @click="
              $router.push({ name: 'goods', params: { goods_id: data.id } })
            "
          >
            <b-card-img-lazy
              class="pointer-event"
              :src="data.image"
              style="max-height: 15rem"
              @error="blankImage"
            ></b-card-img-lazy>
            <b-card-text>{{ data.title }}</b-card-text>
          </b-card-body>
          <b-card-footer>
            <b-card-text>Rp. {{ formatPrice(data.price * 10000) }}</b-card-text>
          </b-card-footer>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import blankImage from "../assets/blank-img.jpg";
import formatPrice from "../mixin/formatPrice";

export default {
  name: "goods",
  mixins: [formatPrice],
  data() {
    return {
      isLoading: false,
      dataGood: null,
      dataAnother: null,
      blankImage: blankImage,
      total: 1
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    $route() {
      this.init();
    }
  },
  computed: {
    dataAnotherSlice() {
      return this.dataAnother.filter(x => x.id !== this.dataGood.id);
    }
  },
  methods: {
    init() {
      this.getGoods();
    },
    getGoods() {
      this.isLoading = true;
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
            this.isLoading = false;
            this.getAnotherGoods();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getAnotherGoods() {
      axios
        .get(
          "https://fakestoreapi.com/products/category/:category".replace(
            ":category",
            this.dataGood.category
          )
        )
        .then(resp => {
          this.dataAnother = resp.data;
        })
        .catch(err => {
          console.log(err);
        });
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
