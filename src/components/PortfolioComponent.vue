<template>
  <article class="portfolio" data-page="portfolio">
    <header>
      <h2 class="h2 article-title">Portfolio</h2>
    </header>

    <section class="projects">
      <!-- Rest of the filter UI remains the same -->
      <ul class="filter-list">
        <li v-for="category in categories" :key="category" class="filter-item">
          <button 
            :class="{ active: selectedCategory === category }"
            @click="filterProjects(category)"
          >
            {{ category }}
          </button>
        </li>
      </ul>

      <div class="filter-select-box">
        <button class="filter-select" @click="toggleSelect">
          <div class="select-value">{{ selectedCategory }}</div>
          <div class="select-icon">
            <ion-icon name="chevron-down"></ion-icon>
          </div>
        </button>

        <ul class="select-list" :class="{ active: isSelectOpen }">
          <li v-for="category in categories" :key="category" class="select-item">
            <button @click="filterProjects(category)">{{ category }}</button>
          </li>
        </ul>
      </div>

      <ul class="project-list">
        <li 
          v-for="project in filteredProjects" 
          :key="project.id" 
          class="project-item"
          :class="{ active: isProjectVisible(project) }"
          :data-filter-item="true"
          :data-category="project.category"
        >
          <a :href="project.link" target="_blank">
            <figure class="project-img">
              <div class="project-item-icon-box">
                <ion-icon name="eye-outline"></ion-icon>
              </div>
              <img 
                :src="getImageUrl(project.image)" 
                :alt="project.title"
                loading="lazy"
              >
            </figure>

            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-category">{{ project.category }}</p>
          </a>
        </li>
      </ul>
    </section>
  </article>
</template>

<script>
export default {
name: 'PortfolioComponent',
data() {
  return {
    selectedCategory: 'All',
    isSelectOpen: false,
    categories: ['All', 'Web Development', 'Games', 'Web Design'],
    projects: [
      {
        id: 1,
        title: '2D/3D Rendering in the Web',
        category: 'Web Development',
        link: 'https://ser-421.vercel.app/threejs',
        image: 'RenderingInWeb.png'  // Update with actual image name
      },
      {
        id: 2,
        title: 'Agile/Lean Metrics Calculator',
        category: 'Web Development',
        link: 'https://github.com/SER516-Clever/SER516-Team-Clever',
        image: 'RoomVR.png'  // Update with actual image name
      },
      {
        id: 3,
        title: 'Forbidden Vault',
        category: 'Games',
        link: 'https://github.com/Kushagra1480/SER594_ForbiddenVaults',
        image: 'FVault2.png'  // Update with actual image name
      },
      {
        id: 4,
        title: 'ST Runner',
        category: 'Games',
        link: '#',
        image: 'Runner.png'  // Update with actual image name
      },
      {
        id: 5,
        title: 'ST Room VR',
        category: 'Games',
        link: '#',
        image: 'RoomVR.png'
      },
      {
        id: 6,
        title: 'Fragrance.net Redesign',
        category: 'Web Design',
        link: 'https://github.com/vrupak/Usability-Enhancement-Project-Fragrance.net-Redesign',
        image: 'Fragrance.png'  // Update with actual image name
      }
    ]
  }
},
computed: {
  filteredProjects() {
    if (this.selectedCategory === 'All') {
      return this.projects
    }
    return this.projects.filter(project => project.category === this.selectedCategory)
  }
},
methods: {
  filterProjects(category) {
    this.selectedCategory = category
    this.isSelectOpen = false
  },
  toggleSelect() {
    this.isSelectOpen = !this.isSelectOpen
  },
  isProjectVisible(project) {
    return this.selectedCategory === 'All' || project.category === this.selectedCategory
  },
  getImageUrl(imageName) {
    try {
      return require(`@/assets/portfolio/${imageName}`)
    } catch (error) {
      console.warn(`Image not found: ${imageName}`)
      return require('@/assets/portfolio/RoomVR.png') // Fallback image
    }
  }
}
}
</script>
<style scoped>
.filter-list { 
  display: none; 
}

.filter-select-box {
  position: relative;
  margin-bottom: 25px;
}

.filter-select {
  background: var(--eerie-black-2);
  color: var(--light-gray);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--jet);
  border-radius: 14px;
  font-size: var(--fs-6);
  font-weight: var(--fw-300);
}

.select-list {
  background: var(--eerie-black-2);
  position: absolute;
  top: calc(100% + 6px);
  width: 100%;
  padding: 6px;
  border: 1px solid var(--jet);
  border-radius: 14px;
  z-index: 2;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: 0.15s ease-in-out;
}

.select-list.active {
  opacity: 1;
  visibility: visible;
  pointer-events: all;
}

.select-item button {
  background: var(--eerie-black-2);
  color: var(--light-gray);
  font-size: var(--fs-6);
  font-weight: var(--fw-300);
  text-transform: capitalize;
  width: 100%;
  padding: 8px 10px;
  border-radius: 8px;
}

.select-item button:hover {
  background: var(--eerie-black-1);
}

.project-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  margin-bottom: 10px;
}

.project-item {
  display: none;
}

.project-item.active {
  display: block;
  animation: scaleUp 0.25s ease forwards;
}

@keyframes scaleUp {
  0% { transform: scale(0.5); }
  100% { transform: scale(1); }
}

.project-img {
  position: relative;
  width: 100%;
  height: 170px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 15px;
  background: var(--eerie-black-1);
}

.project-img::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 1;
  transition: var(--transition-1);
}

.project-img:hover::before {
  background: hsla(0, 0%, 0%, 0.5);
}

.project-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: var(--transition-1);
}

.project-img:hover img {
  transform: scale(1.1);
}

.project-item-icon-box {
  --scale: 0.8;
  background: var(--jet);
  color: var(--sky-cyan);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(var(--scale));
  font-size: 20px;
  padding: 18px;
  border-radius: 12px;
  opacity: 0;
  z-index: 2;
  transition: var(--transition-1);
}

.project-img:hover .project-item-icon-box {
  --scale: 1;
  opacity: 1;
}

.project-title,
.project-category {
  margin-left: 10px;
}

.project-title {
  color: var(--white-2);
  font-size: var(--fs-5);
  font-weight: var(--fw-400);
  text-transform: capitalize;
  line-height: 1.3;
}

.project-category {
  color: var(--light-gray-70);
  font-size: var(--fs-6);
  font-weight: var(--fw-300);
}

@media (min-width: 768px) {
  .filter-list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 25px;
    padding-left: 5px;
    margin-bottom: 30px;
  }

  .filter-item button {
    color: var(--light-gray);
    font-size: var(--fs-5);
    transition: var(--transition-1);
  }

  .filter-item button:hover {
    color: var(--light-gray-70);
  }

  .filter-item button.active {
    color: var(--sky-cyan);
  }

  .filter-select-box {
    display: none;
  }

  .project-list {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1024px) {
  .project-list {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>