import App from './App.vue'
import router from './router/router'
import Toaster from "@/components/modules/vue-toaster"
import { createApp } from 'vue'

const app = createApp(App)
  .use(router)

app.use(Toaster, {
  position: "bottom-right",
  duration: 5555,
}).provide('toast', app.config.globalProperties.$toast)
  
app.mount('#app')
