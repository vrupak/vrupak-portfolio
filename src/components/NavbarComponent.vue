<template>
    <nav class="navbar">
      <ul class="navbar-list">
        <li class="navbar-item" v-for="item in navItems" :key="item.name">
          <button 
            class="navbar-link" 
            :class="{ active: currentPage === item.name }"
            @click="changePage(item.name)"
          >
            {{ item.label }}
          </button>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavbarComponent',
    data() {
      return {
        currentPage: 'about',
        navItems: [
          { name: 'about', label: 'About' },
          { name: 'resume', label: 'Resume' },
          { name: 'portfolio', label: 'Portfolio' },
          { name: 'contact', label: 'Contact' }
        ]
      }
    },
    methods: {
      changePage(page) {
        this.currentPage = page
        this.$emit('page-change', page)
      }
    }
  }
  </script>
  
  <style scoped>
  .navbar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: hsla(240, 1%, 17%, 0.75);
    backdrop-filter: blur(10px);
    border: 1px solid var(--jet);
    border-radius: 12px 12px 0 0;
    box-shadow: var(--shadow-2);
    z-index: 999;
    margin: 0;
    padding: 0;
  }
  
  .navbar-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    margin: 0;
    list-style: none;
  }
  
  .navbar-item {
    padding: 0;
    margin: 0;
  }
  
  .navbar-link {
    color: var(--light-gray);
    font-size: var(--fs-8);
    padding: 20px 7px;
    transition: color var(--transition-1);
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .navbar-link:hover,
  .navbar-link:focus {
    color: var(--light-gray-70);
  }
  
  .navbar-link.active {
    color: var(--orange-yellow-crayola);
  }
  
  @media (max-width: 1023px) {
    body {
      padding-bottom: 60px;
    }
  }
  
  @media (min-width: 580px) {
    .navbar {
      border-radius: 20px 20px 0 0;
    }
  
    .navbar-list {
      gap: 20px;
    }
  
    .navbar-link {
      --fs-8: 14px;
    }
  }
  
  @media (min-width: 1024px) {
    .navbar {
      position: absolute;
      bottom: auto;
      top: 0;
      left: auto;
      right: 0;
      width: max-content;
      border-radius: 0 20px;
      padding: 0 20px;
      box-shadow: none;
    }
  
    .navbar-list {
      gap: 30px;
      padding: 0 20px;
    }
  
    .navbar-link {
      font-weight: var(--fw-500);
    }
  }
  </style>