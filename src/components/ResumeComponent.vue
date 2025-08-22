<template>
  <article class="resume" data-page="resume">
    <header class="resume-header">
      <h2 class="h2 article-title resume-title">
        Resume
        <a :href="resumeUrl" target="_blank" class="resume-link">
          <ion-icon name="download-outline"></ion-icon>
          <span>(Click to View)</span>
        </a>
      </h2>
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
          <div class="education-header">
            <h4 class="h4 timeline-item-title">{{ edu.school }}</h4>
            <span class="gpa-text" style="font-weight: 700;">GPA: {{ edu.gpa }}</span>
          </div>
          <span>{{ edu.period }}</span>
          <p class="timeline-text">
            {{ edu.description }}
          </p>
        </li>
      </ol>
    </section>

    <!-- Experience -->
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
          <ul class="timeline-text">
            <li v-for="(point, idx) in exp.description" :key="idx">{{ point }}</li>
          </ul>
        </li>
      </ol>
    </section>

    <!-- Research Paper -->
    <section class="timeline techstack-timeline">
      <div class="title-wrapper">
        <div class="icon-box">
          <ion-icon name="newspaper-outline"></ion-icon>
        </div>
        <h3 class="h3">Publications</h3>
      </div>

      <ol class="timeline-list">
        <li class="timeline-item">
          <h4 class="h4 timeline-item-title"><a href="https://nemo.asee.org/public/conferences/365/papers/46619/view" target="_blank">SUCCESS: A Summer Camp Promoting On-campus Connections in Software Engineering</a></h4>
          <p class="timeline-text">
            <span class="tech-label"></span>Co-author. Awarded Best Paper (Software Engineering Division) at the ASEE Conference, Montreal, 2025<br>
          </p>
        </li>
      </ol>
    </section>

    <section class="timeline techstack-timeline">
      <div class="title-wrapper">
        <div class="icon-box">
          <ion-icon name="construct-outline"></ion-icon>
        </div>
        <h3 class="h3">Tech Stack</h3>
      </div>

      <ol class="timeline-list">
        <li class="timeline-item">
          <h4 class="h4 timeline-item-title">Frontend</h4>
          <p class="timeline-text">
            <span class="tech-label">Languages:</span> JavaScript, HTML, CSS<br>
            <span class="tech-label">Frameworks/Libraries:</span> Vue.js, React (Tailwind), Babylon.js, Three.js<br>
            <span class="tech-label">Tools:</span> Figma, Axure RP, draw.io, Chrome Extensions, Vite
          </p>
        </li>
        <li class="timeline-item">
          <h4 class="h4 timeline-item-title">Backend</h4>
          <p class="timeline-text">
            <span class="tech-label">Languages:</span> Java, C#, Node.js<br>
            <span class="tech-label">Frameworks:</span> Spring Boot, Unity, Node.js (GitHub/Taiga APIs)
          </p>
        </li>
        <li class="timeline-item">
          <h4 class="h4 timeline-item-title">Game/VR Development</h4>
          <p class="timeline-text">
            Unity (2D/3D/VR games), C# scripting, Oculus/VR SDKs
          </p>
        </li>
        <li class="timeline-item">
          <h4 class="h4 timeline-item-title">Data & Messaging</h4>
          <p class="timeline-text">
            Apache Kafka, KSQLDB, MySQL/SQL
          </p>
        </li>
        <li class="timeline-item">
          <h4 class="h4 timeline-item-title">Dev Tools & Practices</h4>
          <p class="timeline-text">
            Docker, Git, GitHub, Github Actions, Vercel, REST APIs, DTOs, VS Code, Chrome DevTools
          </p>
        </li>
      </ol>
    </section>
    
    <!-- <section class="skill">
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
    </section> -->
  </article>
</template>

<script>
export default {
  name: 'ResumeComponent',
  methods: {
    downloadResume() {
      window.open(this.resumeUrl, '_blank');
    }
  },
  data() {
    return {
      resumeUrl: 'https://www.dropbox.com/scl/fi/gnwqzax8zuq0jvywyauex/VRupak_FS.pdf?rlkey=ocxwi4npye3uk9ah8qlm633xh&st=ef6bgo16&dl=0',
      education: [
        {
          school: 'Arizona State University, USA',
          period: '08/2023 — 05/2025',
          description: 'Master of Science in Software Engineering.',
          gpa: '4.00'
        },
        {
          school: 'Manipal University Jaipur, India',
          period: '07/2018 — 05/2022',
          description: 'Bachelor of Technology in Computer Science Engineering.',
          gpa: '3.45'
        }
      ],
      experience: [
      {
          role: 'AI Engineer - PulseHQ: Tempe',
          period: '05/2024 — Present',
          description: [
            'Built a hybrid Graph RAG system combining Neo4j for entity-relationship mapping and Pinecone for vector similarity, enabling both structured and semantic document querying.',
            'Developed a multi-tenant pipeline with Supabase storage and configuration management, ensuring scalable, isolated, and secure document processing per tenant.',
            'Designed FastAPI APIs for document uploads, AI-driven extraction workflows, and unified querying across graph and semantic content.',
            'Engineered production ready systems with asynchronous workers, error handling, idempotency, and retry mechanisms for reliable processing.',
          ]
        },
        {
          role: 'Software Engineer - SteelArtt: Arizona State University, Tempe',
          period: '05/2024 — Present',
          description: [
            'Implemented Kafka producer in C# and Kafka consumer in Java to stream training data into GIFT, ensuring reliable data flow.',
            'Debugged and refactored legacy Java code to resolve critical integration issues, reducing bug reports by 30%.',
            'Utilized SOLID principles to restructure modules, improving maintainability and reducing technical debt.',
            'Built a mock Unity3D scene for testing GIFT-driven scenarios, accelerating integration testing by 3x.',
            'Collaborated in an Agile team environment, managing tasks via Github project boards and iterative sprints.'
          ]
        },
        {
          role: 'Unity VR and Game Developer - SUCCESS: Arizona State University, Tempe',
          period: '01/2024 — 05/2024',
          description: [
            'Designed a Stranger Things-themed camp to teach game development basics using the Unity engine.',
            'Developed a 2.5D game and a VR game to introduce students to core concepts of each type of development.',
            'Integrated a physical Arduino-controlled light wall with the VR light wall using C++ for synchronized interactions.',
            'Enabled students with no coding background to implement basic VR actions and interactions.'
          ]
        },
        {
          role: 'Web Developer Intern - Kyrion Technologies, Delhi',
          period: '06/2020 — 08/2020',
          description: [
            'Completed a web developer course, gaining hands-on experience in HTML, CSS and JavaScript through practical projects and teamwork.'
          ]
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
        }
      ]
    }
  }
}
</script>

<style scoped>
.resume-header {
  margin-bottom: 30px;
}

.download-icon {
  cursor: pointer;
  margin-left: 0px;
  font-size: 1.2em;
  vertical-align: middle;
  transition: all 0.3s ease;
}

.download-icon:hover {
  transform: translateY(-2px);
  color: var(--deep-cyan);
}

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

.education-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 7px;
}

.timeline-item-title {
  font-size: var(--fs-6);
  line-height: 1.3;
  margin-bottom: 0;
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

.gpa-text {
  color: var(--deep-cyan);
  font-weight: var(--fw-400);
}

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

.article-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

@media (min-width: 768px) {
  .timeline-text { max-width: 700px; }
}

.resume-title {
  display: flex;
  align-items: flex-end;
  gap: 10px;
}

.resume-link {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: var(--fs-6);
  color: var(--white-1);
  transition: color 0.3s ease;
  padding-bottom: 6px;
}

.resume-link:hover {
  color: var(--deep-cyan);
}

.resume-link ion-icon {
  font-size: 1.5em;
}

.techstack-timeline .timeline-item::before {
  content: none;
}

.techstack-timeline .timeline-item::after {
  background: var(--text-gradient-yellow);
}

.tech-label {
  display: inline;
  color: var(--deep-cyan);
  font-weight: var(--fw-400);
}

.timeline-item-title a {
  color: var(--deep-cyan);
  text-decoration: none;
  font-weight: var(--fw-400);
  transition: color 0.3s ease, text-decoration 0.3s ease;
}

.timeline-item-title a:hover {
  color: var(--text-gradient-yellow);
  text-decoration: underline;
}

.timeline-item-title a:visited {
  color: var(--deep-cyan);
}

.timeline-item-title a:active {
  color: var(--white-1);
}

.timeline-text li {
  list-style: none;
  position: relative;
  padding-left: 1.2em; /* Space for the dash */
  text-indent: 0em; /* Creates hanging indent effect */
}

.timeline-text li::before {
  content: "-";
  position: absolute;
  left: 0;
}
</style>