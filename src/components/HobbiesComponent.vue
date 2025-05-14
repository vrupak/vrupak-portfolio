<template>
  <article class="hobbies" data-page="hobbies">
    <header>
      <h2 class="h2 article-title">My Artwork</h2>
    </header>

    <div class="gallery">
      <img
        v-for="(image, index) in images"
        :key="index"
        :src="image"
        @click="openModal(index)"
        alt="Artwork"
      />
    </div>

    <transition name="fade">
      <div 
        v-if="selectedIndex !== null" 
        class="modal"
        @touchstart="startTouch"
        @touchend="endTouch"
        @mousedown="startMouse"
        @mouseup="endMouse"
        tabindex="0"
        @keydown.left="prevImage"
        @keydown.right="nextImage"
        ref="modalRef"
      >
        <button class="nav-button left" @click.stop="prevImage">❮</button>
        <img :src="images[selectedIndex]" alt="Expanded artwork" />
        <p class="image-name">{{ getImageName(images[selectedIndex]) }}</p>
        <button class="nav-button right" @click.stop="nextImage">❯</button>
        <span class="close-button" @click="closeModal">✕</span>
      </div>
    </transition>
  </article>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const images = [
    
  '/artworks/rose.jpg',
  '/artworks/shake.jpg',
  '/artworks/lily.jpg',
  '/artworks/drip.jpg',
  '/artworks/golden.jpg',
  '/artworks/mr.worldwide.jpg',
  '/artworks/pentagon.jpg',
  '/artworks/skull.jpg',
  '/artworks/cheese.jpg',
  '/artworks/cliff.jpg',
  '/artworks/cactus.jpg',
  '/artworks/desert.jpg',
  '/artworks/hills.jpg',
  '/artworks/hourglass.jpg',
  '/artworks/idea.jpg',
  '/artworks/night.jpg',
  '/artworks/paw.jpg',
  '/artworks/read.jpg',
  '/artworks/abstract.jpg',
]

const selectedIndex = ref(null)
const touchStartX = ref(0)
const mouseStartX = ref(null)
const isDragging = ref(false)
const modalRef = ref(null)

const openModal = async (index) => {
  selectedIndex.value = index
  await nextTick()
  modalRef.value?.focus()  // so keyboard works
}

const closeModal = () => selectedIndex.value = null

const prevImage = () => selectedIndex.value = (selectedIndex.value + images.length - 1) % images.length
const nextImage = () => selectedIndex.value = (selectedIndex.value + 1) % images.length

const getImageName = (path) => path.split('/').pop().replace('.jpg', '')

const startTouch = (e) => touchStartX.value = e.changedTouches[0].screenX
const endTouch = (e) => {
  const deltaX = e.changedTouches[0].screenX - touchStartX.value
  if (deltaX > 50) prevImage()
  else if (deltaX < -50) nextImage()
}

const startMouse = (e) => {
  mouseStartX.value = e.screenX
  isDragging.value = true
}

const endMouse = (e) => {
  if (!isDragging.value) return
  const deltaX = e.screenX - mouseStartX.value
  if (deltaX > 50) prevImage()
  else if (deltaX < -50) nextImage()
  isDragging.value = false
}
</script>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
}

.gallery img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: var(--shadow-1);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.gallery img:hover {
  transform: scale(1.05);
}

.modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  flex-direction: column;
  outline: none;
}

.modal img {
  max-width: 90%;
  max-height: 90%;
  border-radius: 12px;
}

.image-name {
  color: var(--white-2);
  font-size: var(--fs-7);
  margin-top: 10px;
  text-align: center;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  padding: 5px;
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.nav-button:hover {
  opacity: 1;
}

.nav-button.left {
  left: 10px;
}

.nav-button.right {
  right: 10px;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 1.8rem;
  color: white;
  cursor: pointer;
}

/* fade animation */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
