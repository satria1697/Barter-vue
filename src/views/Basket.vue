<template>
  <div class="container">
    <div class="row mb-2">
      <h2><b-icon-basket></b-icon-basket> Basket</h2>
    </div>
    <div class="row" v-if="isLoading">
      <div class="text-center">
        <b-spinner></b-spinner>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col" v-if="!dataCart.length">
        <span>Ayo, belanja sekarang</span>
      </div>
      <div class="col" v-else>
        <b-list-group v-for="(data, index) in dataCart" :key="index">
          <b-list-group
            v-for="(da, ids) in data.goods"
            :key="ids"
            horizontal=""
            class="row mb-3"
          >
            <b-list-group-item class="col-2">
              <b-img :src="da.image"></b-img>
            </b-list-group-item>
            <b-list-group-item class="col-10">
              <div class="row">
                <span
                  >Total harga Rp. {{ formatPrice(da.price * 10000) }} x
                  {{ dataCart[index].products[ids].quantity }} =
                </span>
                <h3 class="text-danger">
                  Rp.
                  {{
                    formatPrice(
                      da.price * 10000 * dataCart[index].products[ids].quantity
                    )
                  }}
                </h3>
              </div>
            </b-list-group-item>
          </b-list-group>
        </b-list-group>
      </div>
    </div>
    <div class="row">
      <div class="col text-right" v-if="dataCart.length">
        <span class="">Harga Total</span>
        <h4>{{ formatPrice(totalPrice * 10000) }}</h4>
      </div>
    </div>
    <div class="row">
      <div class="col text-right" v-if="dataCart.length">
        <b-button>Checkout</b-button>
      </div>
      <div class="col text-right" v-else>
        <b-button @click="$router.push('/')">Kembali</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store";
import formatPrice from "../mixin/formatPrice";
export default {
  name: "Basket",
  mixins: [formatPrice],
  data() {
    return {
      isLoading: false,
      dataCart: null,
      detailCart: [],
      totalPrice: null
    };
  },
  computed: {
    loginInfo() {
      return store.getters["getLoginInfo"];
    }
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
        .get(
          "https://fakestoreapi.com/carts/user/:id".replace(
            ":id",
            this.loginInfo.id
          )
        )
        .then(resp => {
          let self = this;
          if (resp.status === 200) {
            if (resp.data.length) {
              this.dataCart = resp.data;
              resp.data.forEach(data => {
                let idx = this.dataCart.indexOf(data);
                this.dataCart[idx].goods = [];
                data.products.forEach(da => {
                  axios
                    .get(
                      "https://fakestoreapi.com/products/:id".replace(
                        ":id",
                        da.productId
                      )
                    )
                    .then(resp => {
                      this.dataCart[idx].goods.push(resp.data);
                      this.totalPrice += da.quantity * resp.data.price;
                      if (
                        idx + 1 === this.dataCart.length &&
                        data.products.indexOf(da) + 1 === data.products.length
                      ) {
                        setTimeout(function() {
                          self.isLoading = false;
                        }, 500);
                      }
                    })
                    .catch(err => {
                      console.log(err);
                    });
                });
              });
            } else {
              this.dataCart = [];
              this.isLoading = false;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped lang="scss">
img {
  max-height: 50px;
}
</style>
