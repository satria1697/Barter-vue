<template>
  <vueper-slides>
    <vueper-slide
      v-for="(slide, index) in slides"
      :key="index"
      :title="slide.title"
      :content="slide.content"
      :image="slide.image"
      :style="'background-color: ' + colors[index % 4]"
    ></vueper-slide>
  </vueper-slides>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
// import blankimage from "../assets/blank-img.jpg";
import "vueperslides/dist/vueperslides.css";
export default {
  name: "slides",
  components: {
    VueperSlide,
    VueperSlides
  },
  props: {
    slides: {
      type: Array,
      default: function() {
        return [
          {
            title: "",
            content: "",
            image:
              "https://bing.nanxiongnandi.com/201705/LacetsMontvernier_1366x768.jpg"
          },
          {
            title: "",
            content: "",
            image: "https://cdn.wallpapersafari.com/20/6/3YNWs1.jpg"
          }
        ];
      }
    }
  },
  data() {
    return {
      colors: ["blue", "yellow", "grey", "green"]
    };
  }
};
</script>

<style scoped></style>
