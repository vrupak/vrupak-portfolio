<template>
  <section class="github-contributions">
    <h3 class="h3">GitHub Contributions</h3>

    <p class="contribution-summary">{{ totalContributions }} contributions in the last year</p>

    <apexchart
      v-if="series.length"
      type="line"
      height="300"
      :options="chartOptions"
      :series="series"
    />

    <div class="separator"></div>

    <table class="contributions-table" v-if="contributions.length">
      <thead>
        <tr>
          <th>Date</th>
          <th>Contributions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in contributions" :key="index">
          <td>{{ item.date }}</td>
          <td>{{ item.contributionCount }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const contributions = ref([])
const series = ref([])
const totalContributions = ref(0)

const chartOptions = ref({
  chart: {
    background: 'transparent',
    toolbar: { show: false },
    zoom: { enabled: false }
  },
  grid: {
    borderColor: 'rgba(255,255,255,0.1)'
  },
  xaxis: {
    categories: [],
    labels: { style: { colors: '#ffffff' } },
    axisBorder: { color: '#00ccff' },
    axisTicks: { color: '#00ccff' }
  },
  yaxis: {
    labels: { style: { colors: '#ffffff' } },
    axisBorder: { color: '#00ccff' },
    tickAmount: 4
  },
  stroke: {
    curve: 'smooth',
    colors: ['#00ccff'],
    width: 3
  },
  markers: {
    size: 4,
    colors: ['#00ccff'],
    strokeColors: '#0f0f0f',
    strokeWidth: 2
  },
  tooltip: {
    theme: 'dark'
  }
})

onMounted(async () => {
  try {
    const response = await fetch('/api/github-contributions?username=vrupak')
    const data = await response.json()
    totalContributions.value = data.contributionCalendar.totalContributions

    const days = data.contributionCalendar.weeks.flatMap(week => week.contributionDays)
    contributions.value = days.slice(-30)

    chartOptions.value.xaxis.categories = contributions.value.map(d => d.date)
    series.value = [{
      name: 'Contributions',
      data: contributions.value.map(d => d.contributionCount)
    }]
  } catch (e) {
    console.error('Failed to load GitHub contributions:', e)
  }
})
</script>

<script>
export default {
  components: {
    apexchart: VueApexCharts
  }
}
</script>

<style scoped>
.github-contributions {
  background: var(--eerie-black-2);
  border: 1px solid var(--jet);
  border-radius: 20px;
  padding: 15px;
  box-shadow: var(--shadow-1);
}

.contribution-summary {
  font-size: 16px;
  font-weight: 600;
  color: #00ccff;
  margin-bottom: 10px;
}

.contributions-table {
  width: 100%;
  color: var(--white-2);
  border-collapse: collapse;
  margin-top: 15px;
}

.contributions-table th, .contributions-table td {
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid var(--jet);
}

.contributions-table th {
  background: var(--onyx);
}

.contributions-table tr:hover {
  background-color: var(--eerie-black-1);
}
</style>
