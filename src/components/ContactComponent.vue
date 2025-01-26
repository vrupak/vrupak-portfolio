<template>
    <article class="contact" data-page="contact">
      <header>
        <h2 class="h2 article-title">Contact</h2>
      </header>
  
      <section class="mapbox" data-mapbox>
        <figure>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11200.615566045586!2d-111.93383476034083!3d33.42421077727562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b08db3b33540f%3A0x666e717f473c3033!2sArizona%20State%20University%20Tempe%20Campus!5e0!3m2!1sen!2sus!4v1737892591828!5m2!1sen!2sus"
            width="400" 
            height="300" 
            loading="lazy"
          ></iframe>
        </figure>
      </section>
  
      <section class="contact-form">
        <h3 class="h3 form-title">Contact Form</h3>
  
        <form class="form" @submit.prevent="submitForm" ref="contactForm">
          <div class="input-wrapper">
            <input 
              type="text" 
              name="fullname" 
              class="form-input" 
              placeholder="Full name" 
              required 
              v-model="formData.fullname"
            >
  
            <input 
              type="email" 
              name="email" 
              class="form-input" 
              placeholder="Email address" 
              required 
              v-model="formData.email"
            >
          </div>
  
          <textarea 
            name="message" 
            class="form-input" 
            placeholder="Your Message" 
            required 
            v-model="formData.message"
          ></textarea>
  
          <button 
            class="form-btn" 
            type="submit" 
            :disabled="!isFormValid"
          >
            <ion-icon name="paper-plane"></ion-icon>
            <span>Send Message</span>
          </button>
        </form>
      </section>
    </article>
</template>
  
<script>
  export default {
    name: 'ContactComponent',
    data() {
      return {
        formData: {
          fullname: '',
          email: '',
          message: ''
        }
      }
    },
    computed: {
      isFormValid() {
        return this.formData.fullname && 
               this.formData.email && 
               this.formData.message
      }
    },
    methods: {
      submitForm() {
        // Handle form submission
        console.log('Form submitted:', this.formData)
        // Reset form after submission
        this.formData = {
          fullname: '',
          email: '',
          message: ''
        }
        // You can add your form submission logic here
        // like making an API call to your backend
      }
    }
  }
</script>
  
<style scoped>
.mapbox {
  position: relative;
  height: 250px;
  width: 100%;
  border-radius: 16px;
  margin-bottom: 30px;
  border: 1px solid var(--jet);
  overflow: hidden;
}

.mapbox figure {
  height: 100%;
  position: relative;
}

.mapbox iframe {
  width: 100%;
  height: 100%;
  border: none;
  filter: grayscale(1) invert(1);
  position: relative;
  z-index: 1;
}

/* Cyan overlay */
.mapbox figure::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 204, 255, 0.45);
  mix-blend-mode: overlay;
  pointer-events: none;
  z-index: 2;
}

.contact-form {
  margin-bottom: 10px;
}

.form-title {
  margin-bottom: 20px;
}

.input-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
  margin-bottom: 25px;
}

.form-input {
  color: var(--white-2);
  font-size: var(--fs-6);
  font-weight: var(--fw-400);
  padding: 13px 20px;
  border: 1px solid var(--jet);
  border-radius: 14px;
  outline: none;
}

.form-input::placeholder {
  font-weight: var(--fw-500);
}

.form-input:focus {
  border-color: var(--sky-cyan);
}

textarea.form-input {
  min-height: 100px;
  height: 120px;
  max-height: 200px;
  resize: vertical;
  margin-bottom: 25px;
}

textarea.form-input::-webkit-resizer {
  display: none;
}

.form-input:focus:invalid {
  border-color: var(--bittersweet-shimmer);
}

.form-btn {
  position: relative;
  width: 100%;
  background: var(--border-gradient-onyx);
  color: var(--sky-cyan);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 13px 20px;
  border-radius: 14px;
  font-size: var(--fs-6);
  text-transform: capitalize;
  box-shadow: var(--shadow-3);
  z-index: 1;
  transition: var(--transition-1);
}

.form-btn::before {
  content: "";
  position: absolute;
  inset: 1px;
  background: var(--bg-gradient-jet);
  border-radius: inherit;
  z-index: -1;
  transition: var(--transition-1);
}

.form-btn ion-icon {
  font-size: 16px;
}

.form-btn:hover {
  background: var(--bg-gradient-yellow-1);
}

.form-btn:hover::before {
  background: var(--bg-gradient-yellow-2);
}

.form-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.form-btn:disabled:hover {
  background: var(--border-gradient-onyx);
}

.form-btn:disabled:hover::before {
  background: var(--bg-gradient-jet);
}

@media (min-width: 580px) {
  .mapbox {
    height: 380px;
    border-radius: 18px;
  }

  .input-wrapper {
    gap: 30px;
    margin-bottom: 30px;
  }

  .form-input {
    padding: 15px 20px;
  }

  textarea.form-input {
    margin-bottom: 30px;
  }

  .form-btn {
    --fs-6: 16px;
    padding: 16px 20px;
  }

  .form-btn ion-icon {
    font-size: 18px;
  }
}

@media (min-width: 768px) {
  .input-wrapper {
    grid-template-columns: 1fr 1fr;
  }

  .form-btn {
    width: max-content;
    margin-left: auto;
  }
}
</style>