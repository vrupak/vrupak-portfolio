<template>
  <article class="hobbies" data-page="hobbies">
    <header>
      <h2 class="h2 article-title">My Artwork</h2>
    </header>

    <swiper :slides-per-view="1" :loop="true" class="mySwiper">
      <swiper-slide v-for="(image, index) in images" :key="index">
        <img :src="image" @click="openModal(image)" />
      </swiper-slide>
    </swiper>

    <div v-if="selectedImage" class="modal" @click="selectedImage = null">
      <img :src="selectedImage" />
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

const images = [
  '/artworks/abstract.jpg',
  '/artworks/cactus.jpg',
  '/artworks/cheese.jpg',
  '/artworks/cliff.jpg',
  '/artworks/desert.jpg',
  '/artworks/drip.jpg',
  '/artworks/golden.jpg',
  '/artworks/hills.jpg',
  '/artworks/hourglass.jpg',
  '/artworks/idea.jpg',
  '/artworks/lily.jpg',
  '/artworks/mr.worldwide.jpg',
  '/artworks/night.jpg',
  '/artworks/paw.jpg',
  '/artworks/pentagon.jpg',
  '/artworks/read.jpg',
  '/artworks/rose.jpg',
  '/artworks/shake.jpg',
  '/artworks/skull.jpg'
]


const selectedImage = ref(null)
const openModal = (image) => selectedImage.value = image
</script>

<style scoped>
img {
  cursor: pointer;
  max-width: 100%;
  border-radius: 12px;
  box-shadow: var(--shadow-1);
}
.modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.modal img {
  max-width: 90%;
  max-height: 90%;
  border-radius: 12px;
}
</style>
