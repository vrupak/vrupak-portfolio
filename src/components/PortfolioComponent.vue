<template>
  <article class="portfolio" data-page="portfolio">
    <header>
      <h2 class="h2 article-title">Portfolio</h2>
    </header>

    <section class="projects">
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
          @click="openModal(project)"
        >
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
        </li>
      </ul>
    </section>

    <!-- Modal -->
    <div v-if="selectedProject" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <img :src="getImageUrl(selectedProject.image)" alt="Project Image" />
        <h2 class="project-heading">
          <a
            :href="selectedProject.link"
            target="_blank"
            rel="noopener"
            class="tooltip-wrapper full-link"
          >
            <span class="link-content">
              {{ selectedProject.title }}
              <ion-icon
                :name="selectedProject.link.includes('github.com') ? 'logo-github' : 'rocket-outline'"
                class="project-link-icon"
              ></ion-icon>
            </span>

            <span class="custom-tooltip">
              {{
                selectedProject.link.includes('github.com')
                  ? 'Click here to visit the project repo'
                  : 'Click here to visit the deployed site'
              }}
            </span>
          </a>
        </h2>
        <p>{{ selectedProject.description }}</p>
        <div class="modal-footer">
          <button class="close-btn" @click="closeModal">Close</button>
          <!-- <a :href="selectedProject.link" target="_blank">Visit Project</a> -->
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { projects } from '@/data/projects.js';

export default {
  name: 'PortfolioComponent',
  data() {
    return {
      selectedCategory: 'All',
      isSelectOpen: false,
      selectedProject: null,
      categories: ['All', 'Web Development', 'Games', 'Web Design'],
      projects
    }
  },
  computed: {
    filteredProjects() {
      if (this.selectedCategory === 'All') {
        return this.projects;
      }
      return this.projects.filter(project => project.category === this.selectedCategory);
    }
  },
  methods: {
    filterProjects(category) {
      this.selectedCategory = category;
      this.isSelectOpen = false;
    },
    toggleSelect() {
      this.isSelectOpen = !this.isSelectOpen;
    },
    isProjectVisible(project) {
      return this.selectedCategory === 'All' || project.category === this.selectedCategory;
    },
    getImageUrl(imageName) {
      try {
        return require(`@/assets/portfolio/${imageName}`);
      } catch (error) {
        console.warn(`Image not found: ${imageName}`);
        return require('@/assets/portfolio/RoomVR.png');
      }
    },
    openModal(project) {
      this.selectedProject = project;
    },
    closeModal() {
      this.selectedProject = null;
    }
  }
}
</script>

<style scoped>
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

.select-item button,
.filter-item button {
  background: var(--eerie-black-2);
  color: var(--light-gray);
  font-size: var(--fs-5);
  font-weight: var(--fw-300);
  text-transform: capitalize;
  width: 100%;
  padding: 8px 10px;
  border-radius: 8px;
  transition: var(--transition-1);
  margin-top: -10px;
}

.select-item button:hover,
.filter-item button:hover {
  background: var(--eerie-black-1);
  color: var(--light-gray-70);
}

.filter-item button.active {
  color: var(--sky-cyan);
}

.project-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  margin-bottom: 10px;
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

  .filter-select-box {
    display: none;
  }

  .project-list {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .filter-list {
    display: none;
  }

  .filter-select-box {
    display: block;
  }

  .modal-content {
    padding: 16px;
    width: 95%;
  }

  .modal-footer {
    flex-direction: column;
    gap: 12px;
  }

  .close-btn {
    width: 100%;
    text-align: center;
  }
}

@media (min-width: 1220px) {
  .project-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(8px);
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--eerie-black-2);
  padding: 20px;
  border-radius: 14px;
  max-width: 1000px;
  width: 90%;
  box-shadow: var(--shadow-4);
  text-align: justify;
  overflow-y: auto;
  max-height: 90vh;
}

.modal-content img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 16px;
}

.project-heading {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tooltip-wrapper.full-link {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: var(--sky-cyan);
  position: relative;
}

.link-content {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 1.8rem;
  font-weight: var(--fw-500);
}

.project-link-icon {
  font-size: 1.5rem;
  color: var(--sky-cyan);
}

.custom-tooltip {
  visibility: hidden;
  opacity: 0;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  transition: opacity 0.15s ease-in-out;
  z-index: 100;
  pointer-events: none;
}

.tooltip-wrapper:hover .custom-tooltip {
  visibility: visible;
  opacity: 1;
}

.modal-content p {
  color: var(--light-gray);
  margin-bottom: 16px;
}

.modal-content a {
  color: var(--sky-cyan);
  font-weight: var(--fw-500);
  display: inline-block;
  margin-bottom: 16px;
}

.close-btn {
  background: var(--sky-cyan);
  color: var(--smoky-black);
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: var(--fw-500);
  cursor: pointer;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}
</style>
