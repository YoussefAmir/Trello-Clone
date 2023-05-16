<template>
    <div class="list">
        <h6>{{ list.name }}</h6>

        <draggable v-model="list.cards" group="cards" class="dragArea mb-3" @change="cardMoved">
            <card v-for="(card) in list.cards" :card="card"></card>
        </draggable>

        <a v-if="!editing" v-on:click="startEditing">Add a card</a>
        <textarea v-if="editing" ref="message" v-model="message" class="form-control mb-2"></textarea>
        <button v-if="editing" v-on:click="createCard" class="btn btn-secondary me-1">Add</button>
        <a v-if="editing" v-on:click="editing=false">Cancel</a>
    </div>
</template>

<script>
import Rails from "@rails/ujs"
import { VueDraggableNext } from 'vue-draggable-next'
import card from "../components/card.vue"

export default{
    components: { draggable: VueDraggableNext, card },
    props: ["list"],
    data: function() {
        return {
            message: "",
            editing: false
        }
    },
    methods: {
        startEditing: function() {
           this.editing = true
           this.$nextTick(() => { this.$refs.message.focus() })
        },
        cardMoved: function(event){
            const evt = event.added || event.moved
            if (evt == undefined){ return }
            
            var card_id = evt.element.id
            const list_index = store.state.lists.findIndex((list) => {
                return list.cards.find((card) => {
                return card.id == card_id
                })
            })

            var data = new FormData
            data.append("card[position]", evt.newIndex + 1)
            data.append("card[list_id]", store.state.lists[list_index].id)

            Rails.ajax({
                url: `/cards/${card_id}/move`,
                type: "PATCH",
                data: data,
                dataType: "json"
            })
        },
        createCard: function(){
            var data = new FormData
            data.append("card[list_id]", this.list.id)
            data.append("card[name]", this.message)

            Rails.ajax({
                url: "/cards",
                type: "POST",
                data: data,
                dataType: "json",
                success: (data) => {
                    store.commit("addCard", data)
                    this.message = ""
                    this.$nextTick(() => { this.$refs.message.focus() })
                }
            })
        }
    }
}
</script>

<style scoped>
.dragArea {
  min-height: 20px;
}
</style>