// To see this message, add the following to the `<head>` section in your
// views/layouts/application.html.erb
//
//    <%= vite_client_tag %>
//    <%= vite_javascript_tag 'application' %>
console.log('Vite ⚡️ Rails')

// If using a TypeScript entrypoint file:
//     <%= vite_typescript_tag 'application' %>
//
// If you want to use .jsx or .tsx, add the extension:
//     <%= vite_javascript_tag 'application.jsx' %>

console.log('Visit the guide for more information: ', 'https://vite-ruby.netlify.app/guide/rails')

// Example: Load Rails libraries in Vite.
//
// import * as Turbo from '@hotwired/turbo'
// Turbo.start()
//
// import ActiveStorage from '@rails/activestorage'
// ActiveStorage.start()
//
// // Import all channels.
// const channels = import.meta.globEager('./**/*_channel.js')

// Example: Import a stylesheet in app/frontend/index.css
// import '~/index.css'

import { createApp } from "vue/dist/vue.esm-bundler";
import Vuex from "vuex"
import broad from "../components/board.vue"

window.store = new Vuex.Store({
    state: {
        lists: []
    },
    mutations: {
        addList(state, data){
            state.lists.push(data)
        },
        addCard(state, data){
            const index = state.lists.findIndex((item) => item.id == data.list_id)
            state.lists[index].cards.push(data)
        },
        editCard(state, data){
            const list_index = state.lists.findIndex((item) => item.id == data.list_id)
            const card_index = state.lists[list_index].cards.findIndex((item) => item.id == data.id)
            state.lists[list_index].cards.splice(card_index, 1, data)
        }
    }
})

var element = document.querySelector("#boards")
if (element != null){
    window.store.state.lists = JSON.parse(element.dataset.lists)

    const app = createApp({
        el: element,
        store: window.store,
        template: "<broad />",
        components: { broad }
    }).mount("#boards")
}


