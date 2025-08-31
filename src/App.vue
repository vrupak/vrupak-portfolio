<template>
  <main>
    <div class="container">
      <SidebarComponent />
      
      <div class="main-content">
        <NavbarComponent @page-change="handlePageChange" />
        
        <div class="content-wrapper">
          <AboutComponent v-if="currentPage === 'about'" />
          <ResumeComponent v-if="currentPage === 'resume'" />
          <PortfolioComponent v-if="currentPage === 'portfolio'" />
          <ContactComponent v-if="currentPage === 'contact'" />
          <HobbiesComponent v-if="currentPage === 'hobbies'" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import SidebarComponent from './components/SidebarComponent.vue'
import NavbarComponent from './components/NavbarComponent.vue'
import AboutComponent from './components/AboutComponent.vue'
import ResumeComponent from './components/ResumeComponent.vue'
import PortfolioComponent from './components/PortfolioComponent.vue'
import ContactComponent from './components/ContactComponent.vue'
import HobbiesComponent from './components/HobbiesComponent.vue'

export default {
  name: 'App',
  components: {
    SidebarComponent,
    NavbarComponent,
    AboutComponent,
    ResumeComponent,
    PortfolioComponent,
    ContactComponent,
    HobbiesComponent
  },
  data() {
    return {
      currentPage: 'about'
    }
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

html, body {
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

main {
  min-height: 100vh;
  padding: 30px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px;
}

.main-content {
  width: 100%;
  position: relative;
}

.content-wrapper {
  width: 100%;
  min-height: calc(100vh - 180px);
}

/* Navbar adjustments */
.navbar {
  margin-bottom: 20px;
}

/* Media queries */
@media (min-width: 1220px) {
  .container {
    flex-direction: row;
    align-items: flex-start;
    gap: 25px;
    padding: 30px 15px;
  }

  .main-content {
    flex: 1;
    max-width: calc(100% - 325px); /* 300px sidebar + 25px gap */
  }

  .content-wrapper {
    min-height: calc(100vh - 120px);
  }
}

@media (min-width: 1400px) {
  .container {
    padding: 30px 0;
  }
}

/* Dark theme and general styles */
body {
  color: var(--white-2);
}

article {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 30px;
}

article header {
  margin-bottom: 40px;
}

.navbar {
  margin-bottom: 30px;
}

section {
  margin-bottom: 40px;
}
</style>