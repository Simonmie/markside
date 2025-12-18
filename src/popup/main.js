import { createApp } from 'vue'
import App from './PopupComponent.vue'
import { setupApp } from '@/logic/common-setup'
import '@/style/main.scss'

const app = createApp(App)
setupApp(app)
app.mount('#app')
