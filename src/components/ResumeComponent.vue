<template>
    <article class="resume" data-page="resume">
      <header>
        <h2 class="h2 article-title">Resume</h2>
      </header>
  
      <section class="timeline">
        <div class="title-wrapper">
          <div class="icon-box">
            <ion-icon name="book-outline"></ion-icon>
          </div>
          <h3 class="h3">Education</h3>
        </div>
  
        <ol class="timeline-list">
          <li v-for="(edu, index) in education" :key="index" class="timeline-item">
            <h4 class="h4 timeline-item-title">{{ edu.school }}</h4>
            <span>{{ edu.period }}</span>
            <p class="timeline-text">{{ edu.description }}</p>
          </li>
        </ol>
      </section>
  
      <section class="timeline">
        <div class="title-wrapper">
          <div class="icon-box">
            <ion-icon name="laptop-outline"></ion-icon>
          </div>
          <h3 class="h3">Experience</h3>
        </div>
  
        <ol class="timeline-list">
          <li v-for="(exp, index) in experience" :key="index" class="timeline-item">
            <h4 class="h4 timeline-item-title">{{ exp.role }}</h4>
            <span>{{ exp.period }}</span>
            <p class="timeline-text">{{ exp.description }}</p>
          </li>
        </ol>
      </section>
  
      <section class="skill">
        <h3 class="h3 skills-title">My skills</h3>
  
        <ul class="skills-list content-card">
          <li v-for="(skill, index) in skills" :key="index" class="skills-item">
            <div class="title-wrapper">
              <h5 class="h5">{{ skill.name }}</h5>
              <data :value="skill.value">{{ skill.value }}%</data>
            </div>
  
            <div class="skill-progress-bg">
              <div class="skill-progress-fill" :style="{ width: skill.value + '%' }"></div>
            </div>
          </li>
        </ul>
      </section>
    </article>
  </template>
  
  <script>
  export default {
    name: 'ResumeComponent',
    data() {
      return {
        education: [
          {
            school: 'Arizona State University, USA',
            period: '08/2023 — Present',
            description: 'Master of Science in Software Engineering.'
          },
          {
            school: 'Manipal University Jaipur, India',
            period: '2018 — 2022',
            description: 'Bachelor of Technology in Computer Science Engineering.'
          }
        ],
        experience: [
          {
            role: 'Software Engineer - HEAL Lab, ASU',
            period: '07/2024 — Present',
            description: 'Integrated GIFT with a Unity VR training app, improved scalability with RAW sockets and Kafka, refactored legacy code following SOLID principles, and developed a mock Unity scene for course integration and control.'
          },
          {
            role: 'Unity VR and Game Developer - SUCCESS camp, ASU',
            period: '05/2024 — 07/2024',
            description: 'Led a SUCCESS (Stranger Things themed) summer camp session on game development and VR, teaching 6th-12th graders using a Unity 2.5D runner game and a VR game on Meta Quest 2 to explore fundamental concepts.'
          },
          {
            role: 'Web Developer Intern - Kyrion Technologies, Delhi',
            period: '06/2020 — 08/2020',
            description: 'Completed a web developer course, gaining hands-on experience in HTML, CSS, JavaScript, and agile development through practical projects and teamwork.'
          }
        ],
        skills: [
          {
            name: 'Web Development',
            value: 85
          },
          {
            name: 'Game Development',
            value: 85
          },
          {
            name: 'Prototyping & UI/UX Design',
            value: 80
          },
          {
            name: 'Version Control & CI/CD',
            value: 75
          },
          {
            name: 'Backend Development',
            value: 70
          },
          
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .timeline { margin-bottom: 30px; }
  
  .timeline .title-wrapper {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 25px;
  }
  
  .timeline-list {
    font-size: var(--fs-6);
    margin-left: 45px;
  }
  
  .timeline-item { position: relative; }
  
  .timeline-item:not(:last-child) { margin-bottom: 20px; }
  
  .timeline-item-title {
    font-size: var(--fs-6);
    line-height: 1.3;
    margin-bottom: 7px;
  }
  
  .timeline-list span {
    color: var(--deep-cyan);
    font-weight: var(--fw-400);
    line-height: 1.6;
  }
  
  .timeline-item:not(:last-child)::before {
    content: "";
    position: absolute;
    top: -25px;
    left: -30px;
    width: 1px;
    height: calc(100% + 50px);
    background: var(--jet);
  }
  
  .timeline-item::after {
    content: "";
    position: absolute;
    top: 5px;
    left: -33px;
    height: 6px;
    width: 6px;
    background: var(--text-gradient-yellow);
    border-radius: 50%;
    box-shadow: 0 0 0 4px var(--jet);
  }
  
  .timeline-text {
    color: var(--light-gray);
    font-weight: var(--fw-300);
    line-height: 1.6;
  }
  
  /* Skills styles */
  .skills-title { margin-bottom: 20px; }
  
  .skills-list { padding: 20px; }
  
  .skills-item:not(:last-child) { margin-bottom: 15px; }
  
  .skill .title-wrapper {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 8px;
  }
  
  .skill .title-wrapper data {
    color: var(--light-gray);
    font-size: var(--fs-7);
    font-weight: var(--fw-300);
  }
  
  .skill-progress-bg {
    background: var(--jet);
    width: 100%;
    height: 8px;
    border-radius: 10px;
  }
  
  .skill-progress-fill {
    background: var(--text-gradient-yellow);
    height: 100%;
    border-radius: inherit;
    transition: width 0.5s ease;
  }
  
  @media (min-width: 768px) {
    .timeline-text { max-width: 700px; }
  }
  </style>