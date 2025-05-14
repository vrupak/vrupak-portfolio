<template>
    <article class="hobbies" data-page="hobbies">
        <header>
            <h2 class="h2 article-title">My Hobbies</h2>
            <p class="hobbies-description">
                Outside of work, I am passionate about both creative expression and maintaining an active lifestyle.
                Since 2018, I have practiced stipple sketching—a unique technique of creating intricate designs by
                placing thousands of tiny dots. My artwork primarily explores abstract concepts, darker themes, and
                elements of nature, and has been a deeply personal outlet for creativity and focus.
            </p>
        </header>

        <div class="carousel-container">
            <div class="carousel-row" ref="row1">
                <img v-for="(image, index) in row1Images" :key="'row1-' + index" :src="image" alt="Artwork"
                    @click="openModal(masterRow1Indices[index])" />
            </div>
            <div class="carousel-row reverse" ref="row2">
                <img v-for="(image, index) in row2Images" :key="'row2-' + index" :src="image" alt="Artwork"
                    @click="openModal(masterRow2Indices[index])" />
            </div>
        </div>

        <transition name="fade">
            <div v-if="selectedIndex !== null" class="modal" @touchstart="startTouch" @touchend="endTouch"
                @mousedown="startMouse" @mouseup="endMouse" tabindex="0" @keydown.left="prevImage"
                @keydown.right="nextImage" ref="modalRef">
                <button class="nav-button left" @click.stop="prevImage">❮</button>
                <img :src="images[selectedIndex % images.length]" alt="Expanded artwork" />
                <p class="image-name">{{ getImageName(images[selectedIndex % images.length]) }}</p>
                <button class="nav-button right" @click.stop="nextImage">❯</button>
                <span class="close-button" @click="closeModal">✕</span>
            </div>
        </transition>

        <header>
            <p class="hobbies-description">
                I also enjoy staying physically active, particularly through weightlifting. While I now play table tennis and football(soccer) more casually, I used to be more active and still enjoy an occasional match.<br><br>
                I also have a strong interest in action RPGs and roguelikes, with <em>Path of Exile</em> being a personal favorite. Gaming serves as a fun escape and a way to unwind. I also find balance outdoors by going on monthly hikes and occasionally trying bouldering for a different physical challenge.<br><br>
                Music is another constant in my life—I listen to a diverse range including nu metal, rock, drum and bass, EDM, and more mellow tracks depending on my mood.
            </p>
        </header>
    </article>
</template>

<script setup>
import { ref, nextTick, onMounted, onUnmounted } from 'vue'

const images = [
    '/artworks/rose.jpg', '/artworks/shake.jpg', '/artworks/lily.jpg', '/artworks/drip.jpg', '/artworks/golden.jpg', '/artworks/mr.worldwide.jpg', '/artworks/pentagon.jpg', '/artworks/skull.jpg', '/artworks/cheese.jpg', '/artworks/cliff.jpg', '/artworks/cactus.jpg', '/artworks/desert.jpg', '/artworks/hills.jpg', '/artworks/hourglass.jpg', '/artworks/idea.jpg', '/artworks/night.jpg', '/artworks/paw.jpg', '/artworks/abstract.jpg'
]

const selectedIndex = ref(null)
const touchStartX = ref(0)
const mouseStartX = ref(null)
const isDragging = ref(false)
const modalRef = ref(null)
const row1 = ref(null)
const row2 = ref(null)

let animationFrame1, animationFrame2

// Split images into two unique sub-arrays
const half = Math.ceil(images.length / 2)
const row1Images = [...images.slice(0, half), ...images.slice(0, half)]
const row2Images = [...images.slice(half), ...images.slice(half)]

// Indices to map sub-rows back to master images
const masterRow1Indices = [...Array(half).keys(), ...Array(half).keys()]
const masterRow2Indices = [...Array(images.length - half).keys()].map(i => i + half).concat([...Array(images.length - half).keys()].map(i => i + half))

onMounted(() => {
    animateRow(row1.value, -0.5, frame => animationFrame1 = frame)
    animateRow(row2.value, -0.5, frame => animationFrame2 = frame)
})

onUnmounted(() => {
    cancelAnimationFrame(animationFrame1)
    cancelAnimationFrame(animationFrame2)
})

function animateRow(row, speed, setFrame) {
    let x = 0
    function step() {
        x += speed
        if (Math.abs(x) >= row.scrollWidth / 2) x = 0
        row.style.transform = `translateX(${x}px)`
        setFrame(requestAnimationFrame(step))
    }
    step()
}

const openModal = async (index) => {
    selectedIndex.value = index
    await nextTick()
    modalRef.value?.focus()
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
const startMouse = (e) => { mouseStartX.value = e.screenX; isDragging.value = true }
const endMouse = (e) => {
    if (!isDragging.value) return
    const deltaX = e.screenX - mouseStartX.value
    if (deltaX > 50) prevImage()
    else if (deltaX < -50) nextImage()
    isDragging.value = false
}
</script>

<style scoped>
.carousel-container {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: -20px;
}

.carousel-row {
    display: flex;
    width: max-content;
    will-change: transform;
}

.carousel-row.reverse {
    flex-direction: row-reverse;
}

.carousel-row img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: var(--shadow-1);
    cursor: pointer;
    margin-right: 10px;
    transition: transform 0.3s ease;
}

.carousel-row img:hover {
    transform: scale(1.05);
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.85);
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

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.hobbies-description {
    margin-top: 40px;
    color: var(--light-gray);
    font-size: var(--fs-6);
    font-weight: var(--fw-300);
    line-height: 1.6;
}
</style>