<template>
  <h3 class="h3">GitHub Contributions</h3>
  <section class="github-contributions">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div class="header">
        <img :src="data.avatar_url" alt="Avatar" />
        <p class="total">{{ data.totalContributions }} contributions in the last year</p>
      </div>

      <div class="heatmap-wrapper fade-in">
        <!-- Month labels -->
        <div class="months">
          <span
            v-for="label in monthLabels"
            :key="label.index"
            :style="{ gridColumnStart: label.index + 2 }"
          >{{ label.month }}</span>
        </div>

        <div class="heatmap-grid">
          <!-- Day labels -->
          <div class="days">
            <span :style="{ gridRowStart: 2 }">Mon</span>
            <span :style="{ gridRowStart: 4 }">Wed</span>
            <span :style="{ gridRowStart: 6 }">Fri</span>
          </div>

          <!-- Heatmap -->
          <div class="heatmap">
            <div
              v-for="(week, weekIndex) in weeks"
              :key="weekIndex"
              class="week"
            >
              <div
                v-for="(day, dayIndex) in week.contributionDays"
                :key="dayIndex"
                class="heatmap-cell"
                :style="{ backgroundColor: getColor(day.contributionCount) }"
                :title="`${day.date}: ${day.contributionCount} contributions`"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Legend -->
      <div class="legend">
        <span>Less</span>
        <div class="legend-box" v-for="(color, index) in legendColors" :key="index" :style="{ backgroundColor: color }"></div>
        <span>More</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const data = ref(null)
const weeks = ref([])
const monthLabels = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('/api/github-contributions')
    if (!response.ok) throw new Error('API failed')
    const result = await response.json()
    data.value = result
    organizeWeeks(result.heatmapData)
  } catch (e) {
    error.value = 'Failed to load GitHub data'
    console.error(e)
  } finally {
    loading.value = false
  }
})

function organizeWeeks(days) {
  const grouped = []
  for (let i = 0; i < days.length; i += 7) {
    grouped.push({ contributionDays: days.slice(i, i + 7) })
  }
  weeks.value = grouped

  const labels = []
  const monthsSeen = new Set()
  const today = new Date()
  const startDate = new Date(today)
  startDate.setDate(today.getDate() - 364) // start of graph

  for (let m = 0; m < 12; m++) {
    const labelDate = new Date(startDate.getFullYear(), startDate.getMonth() + m, 1)
    if (labelDate > today) break
    const labelMonth = labelDate.toLocaleString('default', { month: 'short' })

    for (let weekIndex = 0; weekIndex < weeks.value.length; weekIndex++) {
      const week = weeks.value[weekIndex]
      if (week.contributionDays.some(day => {
        const d = new Date(day.date)
        return d.getFullYear() === labelDate.getFullYear() &&
               d.getMonth() === labelDate.getMonth() &&
               d.getDate() === 1
      })) {
        if (!monthsSeen.has(labelMonth)) {
          labels.push({ index: weekIndex, month: labelMonth })
          monthsSeen.add(labelMonth)
        }
        break
      }
    }
  }
  monthLabels.value = labels
}

function getColor(count) {
  if (count === 0) return '#1a1a1a'
  if (count < 2) return '#004455'
  if (count < 5) return '#006688'
  if (count < 10) return '#0099cc'
  return '#00ccff'
}

const legendColors = ['#1a1a1a', '#004455', '#006688', '#0099cc', '#00ccff']
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
.header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.header img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
}
.total {
  font-weight: bold;
  color: #00ccff;
  font-size: 16px;
}
.heatmap-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.months {
  display: grid;
  grid-template-columns: repeat(53, 10px);
  font-size: 10px;
  color: #ccc;
  margin-bottom: 4px;
}
.heatmap-grid {
  display: flex;
}
.days {
  display: grid;
  grid-template-rows: repeat(7, 10px);
  font-size: 10px;
  color: #ccc;
  margin-right: 5px;
  margin-bottom: 5px;
}
.heatmap {
  display: grid;
  grid-template-columns: repeat(53, 10px);
  grid-template-rows: repeat(7, 10px);
  gap: 2px;
}
.week {
  display: grid;
  grid-template-rows: repeat(7, 10px);
}
.heatmap-cell {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  transition: transform 0.2s ease;
}
.heatmap-cell:hover {
  transform: scale(1.3);
}

/* Scroller for small screens */
@media (max-width: 676px) {
  .heatmap-wrapper {
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 8px;
  }
  .heatmap, .months {
    min-width: 540px;
  }
}

/* Updated scrollbar */
.heatmap-wrapper::-webkit-scrollbar {
  height: 6px;
}
.heatmap-wrapper::-webkit-scrollbar-track {
  background: #222;
}
.heatmap-wrapper::-webkit-scrollbar-thumb {
  background-color: #999;
}

/* Fade-in animation */
.fade-in {
  opacity: 0;
  animation: fadeIn 0.8s ease forwards;
}
@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
.legend {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #ccc;
  margin-top: 10px;
}
.legend-box {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  margin: 0 2px;
}
</style>
