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

    <GithubContributions githubUsername="vrupak" />

    <section class="testimonials">
      <h3 class="h3 testimonials-title">Testimonials</h3>
      <ul class="testimonials-list has-scrollbar">
        <li v-for="testimonial in testimonials" :key="testimonial.id" class="testimonials-item">
          <div class="content-card">
            <div class="testimonial-header">
              <img :src="testimonial.avatar" :alt="testimonial.name" class="testimonial-avatar">
              <div class="testimonial-info">
                <h4 class="h4 testimonial-name">{{ testimonial.name }}</h4>
                <span class="testimonial-company">{{ testimonial.company }}</span>
                <span class="testimonial-date">{{ testimonial.date }}</span>
              </div>
            </div>
            <div class="testimonials-text" :class="{ expanded: testimonial.isExpanded }">
              <p>{{ testimonial.text }}</p>
            </div>
            <button class="expand-btn" @click="testimonial.isExpanded = !testimonial.isExpanded">
              <ion-icon :name="testimonial.isExpanded ? 'chevron-up-outline' : 'chevron-down-outline'"></ion-icon>
            </button>
          </div>
        </li>
      </ul>
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

  </article>
</template>

<script>
import GithubContributions from './GithubContributions.vue';

export default {
  name: 'AboutComponent',
  components: {
    GithubContributions
  },
  data() {
    return {
      services: [
        { title: 'Web Development', description: 'Dynamic, user-focused web applications using Vue.js, React, Spring Boot, and Node.js.', icon: require('@/assets/web-development.png') },
        { title: 'Game Development', description: '2D, 3D and VR games in Unity.', icon: require('@/assets/game-development.png') },
        { title: 'Web Design', description: 'Interactive prototypes using Axure RP 10 to enhance user experience and address usability issues.', icon: require('@/assets/web-design.png') },
        { title: 'API Development', description: 'Scalable RESTful APIs with Spring Boot, following best practices for maintainability.', icon: require('@/assets/api.png') }
      ],
      testimonials: [
        {
          id: 1,
          name: 'Dr. Kevin Gary',
          avatar: require('@/assets/kgary.png'),
          company: 'Arizona State University',
          text: 'Vidya distinguishes himself as a self-starter. I recruited him to my lab when I noticed his outstanding academic performance. But grades in a classroom are just one measure of potential, so I was not sure how it would go. It could not have gone better. Vidya jumped right in on our development for the SUCCESS summer camp, leading efforts in VR and gaming. So I then recruited him for my EdTech grant, and again he has been outstanding over the past year. Working on a large-scale integration project involving a plethora of technologies - Unity, VR, C#, Python, Java, activeMQ, Kafka and more, Vidya has excelled at providing innovative solutions while interfacing with multiple collaborators. He has been unique in this capacity and I will miss him in my lab. I enthusiastically recommend him to any professional opportunities to which he is applying.',
          date: '30 April, 2025',
          isExpanded: false
        }
      ]
    }
  }
}
</script>

<style scoped>
.about-text {
  color: var(--light-gray);
  font-size: var(--fs-6);
  font-weight: var(--fw-300);
  line-height: 1.6;
}
.about-text p { margin-bottom: 5px; }
.about-text { margin-bottom: 20px; }
.service { margin-bottom: 5px; }
.service-title { margin-bottom: 20px; margin-top: -15px}
.service-list { display: grid; grid-template-columns: 1fr; gap: 15px; }
.service-item {
  position: relative;
  background: var(--border-gradient-onyx);
  padding: 15px;
  border-radius: 16px;
  box-shadow: var(--shadow-2);
  transition: transform 0.2s ease;
}
.service-item:hover { transform: translateY(-5px); }
.service-item::before {
  content: "";
  position: absolute;
  inset: 1px;
  background: var(--bg-gradient-jet);
  border-radius: inherit;
  z-index: -1;
}
.service-icon-box img { margin: auto; }
.service-content-box { text-align: center; }
.service-item-title { margin-bottom: 7px; }
.service-item-text {
  color: var(--light-gray);
  font-size: var(--fs-6);
  line-height: 1.6;
}

.testimonials-list { display: flex; flex-direction: column; gap: 15px; margin-top: 20px;}
.testimonials-item .content-card {
  background: var(--eerie-black-2);
  border: 1px solid var(--jet);
  border-radius: 16px;
  box-shadow: var(--shadow-2);
  padding: 18px;
  position: relative;
  transition: transform 0.25s ease;
}
.testimonials-item .content-card:hover { transform: scale(1.02); }
.testimonial-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}
.testimonials-title{
  margin-top: -15px;
}
.testimonial-avatar {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid var(--sky-cyan);
}
.testimonial-info { display: flex; flex-direction: column; }
.testimonial-name {
  font-size: var(--fs-5);
  font-weight: var(--fw-500);
  color: var(--white-2);
}
.testimonial-company {
  font-size: var(--fs-7);
  color: var(--sky-cyan);
}
.testimonial-date {
  font-size: var(--fs-7);
  color: var(--light-gray-70);
}
.testimonials-text p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  color: var(--light-gray);
  font-size: var(--fs-6);
  line-height: 1.5;
  -webkit-line-clamp: 3;
}
.testimonials-text.expanded p {
  -webkit-line-clamp: unset;
  overflow: visible;
}
.expand-btn {
  position: absolute;
  bottom: 5px;
  right: 5px;
  background: none;
  border: none;
  color: var(--sky-cyan);
  cursor: pointer;
  font-size: 35px;
}

/* Responsive for services */
@media (min-width: 580px) {
  .service-item {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 18px;
    padding: 15px;
  }
  .service-content-box { text-align: left; }
}
</style>
