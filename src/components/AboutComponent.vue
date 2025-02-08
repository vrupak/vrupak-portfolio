<template>
    <article class="about active" data-page="about">
      <header>
        <h2 class="h2 article-title">About me</h2>
      </header>
  
      <section class="about-text">
        <p>
          I'm a Software Engineer Graduate from Arizona State University, specializing in web development and modern technologies.
          I enjoy turning complex problems into simple, beautiful and intuitive solutions.
        </p>
  
        <p>
          My expertise lies in building scalable and efficient web applications that are both functional and user-friendly.
          I focus on writing clean, maintainable code while ensuring optimal performance and accessibility.
          I stay current with the latest technologies and best practices in software development.
        </p>

        <p>
          Outside of work, I am passionate about creative pursuits like stipple sketching and staying active through gym workouts, table tennis, and gaming.
        </p>
      </section>
  
      <section class="service">
        <h3 class="h3 service-title">What I'm doing</h3>
  
        <ul class="service-list">
          <li v-for="(service, index) in services" :key="index" class="service-item">
            <div class="service-icon-box">
              <img :src="service.icon" :alt="service.title" width="40">
            </div>
  
            <div class="service-content-box">
              <h4 class="h4 service-item-title">{{ service.title }}</h4>
              <p class="service-item-text">{{ service.description }}</p>
            </div>
          </li>
        </ul>
      </section>
  
      <!-- <section class="testimonials">
        <h3 class="h3 testimonials-title">Testimonials</h3>
  
        <ul class="testimonials-list has-scrollbar">
          <li v-for="testimonial in testimonials" :key="testimonial.id" class="testimonials-item">
            <div class="content-card" @click="showTestimonialModal(testimonial)">
              <figure class="testimonials-avatar-box">
                <img :src="testimonial.avatar" :alt="testimonial.name" width="60">
              </figure>
  
              <h4 class="h4 testimonials-item-title">{{ testimonial.name }}</h4>
  
              <div class="testimonials-text">
                <p>{{ testimonial.text }}</p>
              </div>
            </div>
          </li>
        </ul>
      </section>
  
      <div class="modal-container" :class="{ active: isModalActive }">
        <div class="overlay" @click="closeModal"></div>
        <section class="testimonials-modal">
          <button class="modal-close-btn" @click="closeModal">
            <ion-icon name="close-outline"></ion-icon>
          </button>
  
          <div class="modal-img-wrapper">
            <figure class="modal-avatar-box">
              <img :src="currentTestimonial?.avatar" :alt="currentTestimonial?.name" width="80">
            </figure>
            <img src="@/assets/logo.png" alt="quote icon">
          </div>
  
          <div class="modal-content">
            <h4 class="h3 modal-title">{{ currentTestimonial?.name }}</h4>
            <time datetime="2021-06-14">{{ currentTestimonial?.date }}</time>
            <div>
              <p>{{ currentTestimonial?.text }}</p>
            </div>
          </div>
        </section>
      </div> -->
    </article>
  </template>
  
  <script>
  export default {
    name: 'AboutComponent',
    data() {
      return {
        isModalActive: false,
        currentTestimonial: null,
        services: [
          {
            title: 'Web Development',
            description: 'Dynamic, user-focused web applications using Vue.js, React, Spring Boot, and Node.js.',
            icon: require('@/assets/web-development.png')
          },
          {
            title: 'Game Development',
            description: '2D, 3D and VR games in Unity.',
            icon: require('@/assets/game-development.png')
          },
          {
            title: 'Web Design',
            description: 'Interactive prototypes using Axure RP 10 to enhance user experience and address usability issues.',
            icon: require('@/assets/web-design.png')
          },
          {
            title: 'API Development',
            description: 'Scalable RESTful APIs with Spring Boot, following best practices for maintainability.',
            icon: require('@/assets/api.png')
          }
        ],
        // testimonials: [
        //   {
        //     id: 1,
        //     name: 'Daniel Lewis',
        //     avatar: require('@/assets/logo.png'),
        //     text: 'Vidya was hired to create a corporate identity. We were very pleased with the work done. He has a lot of experience and is very concerned about the needs of client.',
        //     date: '14 June, 2023'
        //   },
        //   // Add more testimonials as needed
        // ]
      }
    },
    methods: {
      showTestimonialModal(testimonial) {
        this.currentTestimonial = testimonial
        this.isModalActive = true
        document.body.style.overflow = 'hidden'
      },
      closeModal() {
        this.isModalActive = false
        this.currentTestimonial = null
        document.body.style.overflow = 'auto'
      }
    }
  }
  </script>
  
  <style scoped>
  .about .article-title { margin-bottom: 15px; }
  
  .about-text {
    color: var(--light-gray);
    font-size: var(--fs-6);
    font-weight: var(--fw-300);
    line-height: 1.6;
  }
  
  .about-text p { margin-bottom: 15px; }
  
  /* Service styles */
  .service { margin-bottom: 35px; }
  
  .service-title { margin-bottom: 20px; }
  
  .service-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .service-item {
    position: relative;
    background: var(--border-gradient-onyx);
    padding: 20px;
    border-radius: 14px;
    box-shadow: var(--shadow-2);
    z-index: 1;
  }
  
  .service-item::before {
    content: "";
    position: absolute;
    inset: 1px;
    background: var(--bg-gradient-jet);
    border-radius: inherit;
    z-index: -1;
  }
  
  .service-icon-box {
    margin-bottom: 10px;
  }
  
  .service-icon-box img { margin: auto; }
  
  .service-content-box { text-align: center; }
  
  .service-item-title { margin-bottom: 7px; }
  
  .service-item-text {
    color: var(--light-gray);
    font-size: var(--fs-6);
    font-weight: var(--fw-3);
    line-height: 1.6;
  }
  
  /* Testimonials styles */
  .testimonials-modal {
    position: relative;
    background: var(--eerie-black-2);
    padding: 15px;
    margin: 15px;
    border: 1px solid var(--jet);
    border-radius: 14px;
    box-shadow: var(--shadow-5);
    transform: scale(1.2);
    opacity: 0;
    transition: var(--transition-1);
    z-index: 2;
  }
  
  .modal-container.active .testimonials-modal {
    transform: scale(1);
    opacity: 1;
  }
  
  @media (min-width: 580px) {
    .service-item {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 18px;
      padding: 30px;
    }
  
    .service-icon-box {
      margin-bottom: 0;
      margin-top: 5px;
    }
  
    .service-content-box { text-align: left; }
  
    .testimonials-modal {
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      gap: 25px;
      padding: 30px;
      border-radius: 20px;
    }
  }
  
  @media (min-width: 768px) {
    .testimonials-modal {
      gap: 35px;
      max-width: 680px;
    }
  }
  </style>