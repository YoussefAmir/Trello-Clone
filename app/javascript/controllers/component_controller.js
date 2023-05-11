import * as Vue from "vue"
import App from "../app"

const point = "#boards"
const element = document.querySelector(point)
if (element !== null) {
  const app = Vue.createApp({
    el: element,
    data() {
      return { lists: JSON.parse(element.dataset.lists) }
    },
    template: "< App :original_lists='lists' />",
    components: { App }
  })
  const vm = app.mount(point)
}