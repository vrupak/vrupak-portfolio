<template>
  <section class="github-contributions">
    <h3 class="h3">GitHub Contributions</h3>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <p class="total">{{ data.totalContributions }} contributions in the last year</p>

      <div class="user-info">
        <img :src="data.avatar_url" alt="Avatar" />
        <p class="name">{{ data.name }} ({{ data.username }})</p>
      </div>

      <!-- ✅ Heatmap -->
      <div class="heatmap">
        <div
          v-for="(day, index) in data.heatmapData"
          :key="index"
          class="heatmap-cell"
          :style="{ backgroundColor: getColor(day.contributionCount) }"
          :title="`${day.date}: ${day.contributionCount} contributions`"
        ></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const data = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('/api/github-contributions?username=vrupak')
    if (!response.ok) throw new Error('API failed')
    data.value = await response.json()
  } catch (e) {
    error.value = 'Failed to load GitHub data'
    console.error(e)
  } finally {
    loading.value = false
  }
})

function getColor(count) {
  if (count === 0) return '#1a1a1a'
  if (count < 2) return '#004455'
  if (count < 5) return '#006688'
  if (count < 10) return '#0099cc'
  return '#00ccff' // brightest cyan
}
</script>

<style scoped>
.github-contributions {
  background: var(--eerie-black-2);
  border: 1px solid var(--jet);
  border-radius: 20px;
  padding: 15px;
  box-shadow: var(--shadow-1);
  color: var(--white-2);
}
.total {
  font-weight: bold;
  color: #00ccff;
  font-size: 16px;
  margin-bottom: 10px;
}
.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.user-info img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
}
.user-info .name {
  font-size: 18px;
  font-weight: bold;
  color: #00ccff;
}
.heatmap {
  display: grid;
  grid-template-columns: repeat(53, 8px);
  grid-template-rows: repeat
}
</style>