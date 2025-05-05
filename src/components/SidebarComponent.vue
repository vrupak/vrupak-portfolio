<template>
  <aside class="sidebar" data-sidebar>
    <div class="sidebar-info">
      <figure class="avatar-box">
        <img src="@/assets/my-avatar.png" alt="Vidya Rupak" width="80">
      </figure>

      <div class="info-content">
        <h1 class="name" title="Vidya Rupak">Vidya Rupak</h1>
        <p class="title">Software Engineer</p>
      </div>

      <button class="info_more-btn" @click="toggleSidebar">
        <span class="button-text">Show Contacts</span>
        <ion-icon :name="isExpanded ? 'chevron-up' : 'chevron-down'"></ion-icon>
      </button>
    </div>

    <div class="sidebar-info_more">
      <div class="separator"></div>

      <ul class="contacts-list">
        <!-- Contact items remain the same -->
        <li class="contact-item">
          <div class="icon-box">
            <ion-icon name="mail-outline"></ion-icon>
          </div>
          <div class="contact-info">
            <p class="contact-title">Email</p>
            <a href="mailto:vidyarupak@gmail.com" class="contact-link">vidyarupak@gmail.com</a>
          </div>
        </li>

        <li class="contact-item">
          <div class="icon-box">
            <ion-icon name="phone-portrait-outline"></ion-icon>
          </div>
          <div class="contact-info">
            <p class="contact-title">Phone</p>
            <a href="tel:+14809133714" class="contact-link">+1 (480) 913-3714</a>
          </div>
        </li>

        <li class="contact-item">
          <div class="icon-box">
            <ion-icon name="calendar-outline"></ion-icon>
          </div>
          <div class="contact-info">
            <p class="contact-title">Birthday</p>
            <time datetime="2000-08-02">August 2, 2000</time>
          </div>
        </li>

        <li class="contact-item">
          <div class="icon-box">
            <ion-icon name="location-outline"></ion-icon>
          </div>
          <div class="contact-info">
            <p class="contact-title">Location</p>
            <address>Tempe, Arizona, USA</address>
          </div>
        </li>
      </ul>

      <ul class="social-list">
        <li class="social-item">
          <a href="https://linkedin.com/in/vidya-rupak" target="_blank" rel="noopener" class="social-link">
            <ion-icon name="logo-linkedin"></ion-icon>
          </a>
        </li>
        <li class="social-item">
          <a href="https://github.com/vrupak" target="_blank" rel="noopener" class="social-link">
            <ion-icon name="logo-github"></ion-icon>
          </a>
        </li>
        <li class="social-item">
          <a href="https://www.dropbox.com/scl/fo/egnciuaq9xjuxvdy9fzxp/h?rlkey=0nmka4lntkpx65wm594kxm80r&e=2&dl=0" target="_blank" rel="noopener" class="social-link">
            <ion-icon name="logo-dropbox"></ion-icon>
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'SidebarComponent',
  data() {
    return {
      isExpanded: false
    }
  },
  watch: {
    isExpanded(newValue) {
      const sidebar = document.querySelector('.sidebar')
      if (newValue) {
        sidebar.classList.add('active')
      } else {
        sidebar.classList.remove('active')
      }
    }
  },
  methods: {
    toggleSidebar() {
      this.isExpanded = !this.isExpanded
    }
  }
}
</script>

<style scoped>
/* Base Sidebar Styles */
.sidebar {
  width: 100%;
  background: var(--eerie-black-2);
  border: 1px solid var(--jet);
  border-radius: 20px;
  padding: 15px;
  max-height: 112px;
  overflow: hidden;
  transition: all var(--transition-2);
  margin-bottom: 15px;
  z-index: 1;
}

.sidebar.active {
  max-height: 405px;
}

/* Sidebar Info Section */
.sidebar-info {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
}

.avatar-box {
  background: var(--bg-gradient-onyx);
  border-radius: 20px;
}

/* Info Content */
.info-content .name {
  color: var(--white-2);
  font-size: var(--fs-3);
  font-weight: var(--fw-500);
  letter-spacing: -0.25px;
  margin-bottom: 10px;
}

.info-content .title {
  color: var(--white-1);
  background: var(--onyx);
  font-size: var(--fs-8);
  font-weight: var(--fw-300);
  width: max-content;
  padding: 3px 12px;
  border-radius: 8px;
}

/* More Button */
.info_more-btn {
  position: absolute;
  top: -15px;
  right: -15px;
  border-radius: 0 15px;
  font-size: 13px;
  color: var(--sky-cyan);
  background: var(--border-gradient-onyx);
  padding: 10px;
  box-shadow: var(--shadow-2);
  transition: var(--transition-1);
  z-index: 1;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.info_more-btn ion-icon {
  transition: transform 0.3s ease;
}

/* Sidebar Info More Section */
.sidebar-info_more {
  opacity: 0;
  visibility: hidden;
  transition: all var(--transition-2);
}

.sidebar.active .sidebar-info_more {
  opacity: 1;
  visibility: visible;
}

/* Contact List */
.contacts-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.contact-item {
  min-width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
}

.contact-info {
  max-width: calc(100% - 46px);
  width: calc(100% - 46px);
}

.contact-title {
  color: var(--light-gray-70);
  font-size: var(--fs-8);
  text-transform: uppercase;
  margin-bottom: 2px;
}

.contact-info :is(.contact-link, time, address) {
  color: var(--white-2);
  font-size: var(--fs-7);
}

.contact-info address {
  font-style: normal;
}

/* Social List */
.social-list {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 15px;
  padding: 15px 0;
  border-top: 1px solid var(--jet);
}

/* Remove the default separators when social list has its own border */
.separator + .social-list {
  margin-top: 0;
  border-top: none;
}

.social-item .social-link {
  color: var(--light-gray-70);
  font-size: 18px;
  transition: color var(--transition-1);
}

.social-item .social-link:hover {
  color: var(--light-gray);
}

/* Separator */
.separator {
  width: 100%;
  height: 1px;
  background: var(--jet);
  margin: 16px 0;
}

/* Icon Box */
.icon-box {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: var(--border-gradient-onyx);
  font-size: 16px;
  color: var(--sky-cyan);
}

@media (max-width: 579px) {
  .info_more-btn .button-text {
    display: none;
  }
  
  .info_more-btn {
    padding: 8px;
    border-radius: 0 50%;
    right: -15px;
    top: -15px;
  }
}

/* Tablet Styles */
@media (min-width: 580px) {
  .sidebar {
    max-width: 520px;
    margin: 0 auto 15px; /* Reduced bottom margin */
    padding: 30px;
    max-height: 142px;
  }

  .sidebar.active {
    max-height: 420px;
  }

  .info_more-btn {
    top: -30px;
    right: -30px;
  }
  .info_more-btn .button-text {
    display: inline;
  }
}

/* Desktop Styles */
@media (min-width: 1024px) {
  .sidebar {
    position: sticky;
    top: 60px;
    width: 25%;
    min-width: 300px;
    max-width: 300px;
    height: 100%;
    max-height: max-content;
    margin: 0;
    padding: 40px 30px 20px;
    align-self: flex-start;
  }

  .sidebar.active {
    max-height: 594px;
  }

  .sidebar-info {
    flex-direction: column;
  }

  .avatar-box img {
    width: 150px;
  }

  .info-content .name {
    white-space: nowrap;
    text-align: center;
    font-size: 28px;
  }

  .info-content .title {
    margin: auto;
  }

  .info_more-btn {
    display: none;
  }

  .sidebar-info_more {
    opacity: 1;
    visibility: visible;
  }

  .contacts-list {
    grid-template-columns: 1fr;
  }
}
</style>