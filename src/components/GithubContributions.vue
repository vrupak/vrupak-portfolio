<template>
  <section v-if="data" class="github-contributions">
    <h3 class="h3">GitHub Contributions (REST)</h3>

    <div class="user-info">
      <img :src="data.avatar_url" alt="Avatar" />
      <p class="name">{{ data.name }} ({{ data.username }})</p>
    </div>

    <ul>
      <li><strong>Public Repositories:</strong> {{ data.public_repos }}</li>
      <li><strong>Followers:</strong> {{ data.followers }}</li>
      <li><strong>Following:</strong> {{ data.following }}</li>
      <li><strong>Estimated Contributions (last ~100 activities):</strong> {{ data.contributionsEstimate }}</li>
    </ul>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const data = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('/api/github-contributions?username=vrupak')
    data.value = await response.json()
  } catch (e) {
    console.error('API error:', e)
  }
})
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

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 6px 0;
}
</style>
