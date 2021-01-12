<template>
  <div class="container">
    <div class="row">
      <slides class="col"></slides>
    </div>
    <div v-if="dataStore === null" class="mt-1">
      <div class="spinner-border mx-auto"></div>
    </div>
    <div class="row mt-1" v-if="dataStore !== null">
      <b-card v-for="data in sliceStore" :key="data.id" class="col-md-3">
        <b-card-body style="height: 22rem" @click="goTo(data.id)">
          <b-card-img-lazy
            :src="data.image"
            style="max-height: 15rem"
            @error="blankimage"
          ></b-card-img-lazy>
          <b-card-text>{{ data.title }}</b-card-text>
        </b-card-body>
        <b-card-footer>
          <b-card-text>Rp. {{ formatPrice(data.price * 10000) }}</b-card-text>
        </b-card-footer>
      </b-card>
      <div
        v-if="limit < dataStore.length"
        class="btn btn-outline-primary mx-auto mt-2"
        @click="limit += 4"
      >
        Load More
      </div>
    </div>
  </div>
</template>

<script>
import Slides from "../components/slides";
import blankimage from "../assets/blank-img.jpg";
import axios from "axios";
export default {
  components: { Slides },
  data() {
    return {
      blankimage: blankimage,
      dataStore: null,
      dataStoreSlice: null,
      limit: 4
    };
  },
  mounted() {
    this.getStore();
  },
  methods: {
    getStore() {
      const params = {
        limit: 20
      };
      axios
        .get("https://fakestoreapi.com/products", { params: params })
        .then(resp => {
          if (resp.status === 200) {
            this.dataStore = resp.data;
          }
        })
        .catch(err => {
          if (err.status >= 400) console.log("Terjadi Kesalahan Pada Server");
        });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    goTo(id) {
      this.$router.push({ name: "goods", params: { goods_id: id } });
    }
  },
  computed: {
    sliceStore() {
      return this.dataStore.slice(0, this.limit);
    }
  }
};
</script>
