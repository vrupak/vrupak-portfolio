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
        <h2>{{ selectedProject.title }}</h2>
        <p>{{ selectedProject.description }}</p>
        <div class="modal-footer">
          <button class="close-btn" @click="closeModal">Close</button>
          <a :href="selectedProject.link" target="_blank">Visit Project</a>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'PortfolioComponent',
  data() {
    return {
      selectedCategory: 'All',
      isSelectOpen: false,
      selectedProject: null,
      categories: ['All', 'Web Development', 'Games', 'Web Design'],
      projects: [
        {
          id: 1,
          title: 'CAssess V3',
          category: 'Web Development',
          link: 'https://heal2.poly.asu.edu/cassess/#/about',
          image: 'CAssess.png',
          description: 'The CAssess platform is a comprehensive software application designed to facilitate the management and progress tracking of software projects within an academic environment. It serves as an interface for Professors, Instructors, TAs, and students engaged in these projects, leveraging three primary external tools: Slack, GitHub, and Taiga.'
        },
        {
          id: 2,
          title: '2D/3D Rendering in the Web',
          category: 'Web Development',
          link: 'https://ser-421.vercel.app/babylonjs',
          image: 'RenderingInWeb.png',
          description: 'Authored and implemented content on Babylon.js covering scene creation, materials, physics, animations, interactivity, 3D model importing, and particle systems. '
        },
        {
          id: 3,
          title: 'Agile/Lean Metrics Calculator',
          category: 'Web Development',
          link: 'https://github.com/SER516-Clever/SER516-Team-Clever',
          image: 'Agile-Lean-Metrics.png',
          description: 'Developed a comprehensive dashboard visualizing key Agile metrics (Burndown, Lead Time, Cycle Time) for Taiga projects. Built with React frontend and Spring Boot backend, evolved from monolithic to microservices architecture using Docker. Implemented CI/CD with GitHub Actions and applied evolving Agile methodologies from Scrum to Lean/Kanban to optimize development workflow.'
        },
        {
          id: 4,
          title: 'Forbidden Vault',
          category: 'Games',
          link: 'https://github.com/Kushagra1480/SER594_ForbiddenVaults',
          image: 'FVault2.png',
          description: 'Developed a single-player puzzle-adventure game using Unity3D, implementing core gameplay systems including inventory management, buff-debuff mechanics, and procedural dungeon generation. Created custom shaders for magical effects and integrated a modular puzzle system within a cohesive exploration framework. Leveraged C# scripting to build responsive player controls and event-driven interaction mechanics while optimizing performance for smooth gameplay across target platforms.'
        },
        {
          id: 5,
          title: 'ST Runner',
          category: 'Games',
          link: '#',
          image: 'Runner.png',
          description: 'Led Stranger Things-themed game development session for middle and high school students at SUCCESS summer camp. Created a customizable Unity 2.5D runner game template designed for beginners, enabling students with minimal programming experience to learn fundamental game development concepts through hands-on customization activities.'
        },
        {
          id: 6,
          title: 'ST Room VR',
          category: 'Games',
          link: '#',
          image: 'RoomVR.png',
          description: 'Led Stranger Things-themed VR development session for 6th-12th grade students at SUCCESS summer camp. Designed and created an interactive Meta Quest 2 VR experience featuring integrated simple tasks, enabling students to gain hands-on understanding of virtual reality technology through practical engagement.'
        },
        {
          id: 7,
          title: 'Fragrance.net Redesign',
          category: 'Web Design',
          link: 'https://github.com/vrupak/Usability-Enhancement-Project-Fragrance.net-Redesign',
          image: 'Fragrance.png',
          description: 'Conducted comprehensive usability analysis of fragrance.net, identifying key experience issues. Created an optimized prototype using Axure RP 10 that enhanced e-commerce functionality and improved overall design flow. Targeted two critical user tasks for enhancement and validated improvements through rigorous comparative usability testing against the original website.'
        },
        {
          id: 8,
          title: 'Camera Store E-Commerce Prototype',
          category: 'Web Design',
          link: 'https://d2ckn2.axshare.com/?g=4&id=04c1i2&p=homepage',
          image: 'Camera-Store.png',
          description: 'Developed a high-fidelity e-commerce prototype for a camera store using Axure RP, featuring an intuitive UI with responsive hover effects and structured information architecture. Implemented comprehensive shopping features including mega menu navigation, featured product displays, and category organization. Created interactive elements like promotional banners and newsletter signup to enhance user engagement. Design prioritizes conversion optimization while maintaining strong SEO foundations through strategic content placement and accessibility considerations.'
        },
        {
          id: 9,
          title: 'Apple Website Prototype',
          category: 'Web Design',
          link: 'https://er3wb8.axshare.com/?id=2im3yc&p=home&sc=3',
          image: 'Apple-Website.png',
          description: 'Recreated the main page of apple.com using Axure RP, replicating its layout, fonts, icons, colors, menus, and core interactions. Published the interactive prototype on Axshare to match the original website’s look and feel.'
        }
      ]
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
}

.modal-content img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 16px;
}

.modal-content h2 {
  color: var(--white-2);
  margin-bottom: 10px;
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

.modal-footer a {
  margin-left: auto;
}

</style>