<template>
    <div>
        <div @click="editing=true" class="card card-body mt-3">
            {{ card.name }}
        </div>

        <div v-if='editing' class="modal-backdrop show"></div>

        <div v-if='editing' @click="closeModal" class="modal show" style="display: block">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{{ card.name }}</h5>
            </div>
            <div class="modal-body">
                <input v-model="card.name" class="form-control">
            </div>
            <div class="modal-footer">
                <button @click="save" type="button" class="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import Rails from "@rails/ujs"
import { storeKey } from "vuex"

export default{
    props: [ "card"],
    data: function() {
        return {
            editing: false,
        }
    },
    // emits: { 
    //     updateCard: function(newValue){
    //         return newValue
    //     }
    // },
    // computed: {
    //     card: {
    //         get() {
    //             return this.cardModel
    //         },

    //         set(newValue) {
    //             this.cardModel = newValue
    //         }
    //     }

    // },
    methods: {
        closeModal: function(){
            if (event.target.classList.contains("modal")) { this.editing = false }
        },
        save: function(){
            var data = new FormData
            data.append("card[name]", this.card.name)

            Rails.ajax({
                url: `/cards/${this.card.id}`,
                type: "PATCH",
                data: data,
                dataType: "json",
                success: (data) => {
                    store.commit("editCard", data)
                    this.editing = false
                }
            })
        }
    }
}
</script>

<style scoped>
</style>