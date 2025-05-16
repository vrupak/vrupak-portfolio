import { createApp } from 'vue'
import App from './App.vue'

// Import base styles
import './styles/variables.css'
import './styles/base.css'

import { inject } from '@vercel/analytics'
inject()

const app = createApp(App)
app.mount('#app')
