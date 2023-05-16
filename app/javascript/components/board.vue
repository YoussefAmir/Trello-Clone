<template>
  <draggable v-model="lists" group="lists" class="board dragArea" @end="listMoved">
    <list v-for="list in lists" :list="list"></list>

    <div class="list">
      <a v-if="!editing" v-on:click="startEditing">Add a list</a>
      <textarea v-if="editing" ref="message" v-model="message" class="form-control mb-2"></textarea>
      <button v-if="editing" v-on:click="createList" class="btn btn-secondary me-1">Add</button>
      <a v-if="editing" v-on:click="editing=false">Cancel</a>
    </div>
  </draggable>
</template>

<script>
import Rails from "@rails/ujs"
import { VueDraggableNext } from 'vue-draggable-next'
import list from "../components/list.vue"

export default {
  components: { draggable: VueDraggableNext, list },
  data: function(){
    return {
      editing: false,
      message: ""
    }
  },
  computed: {
    lists: {
      get() {
        return store.state.lists
      },
      set(value) {
        store.state.lists = value
      }
    }
  },
  methods: {
    listMoved: function(event){
      var data = new FormData
      data.append("list[position]", event.newIndex + 1)

      Rails.ajax({
        url: `/lists/${this.lists[event.newIndex].id}/move`,
        type: "PATCH",
        data: data,
        dataType: "json"
      })
    },
    startEditing: function() {
      this.editing = true
      this.$nextTick(() => { this.$refs.message.focus() })
    },
    createList: function(){
      var data = new FormData
      data.append("list[name]", this.message)

      Rails.ajax({
          url: "/lists",
          type: "POST",
          data: data,
          dataType: "json",
          success: (data) => {
            store.commit("addList", data)
            this.message = ""
            this.editing = false
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

.board {
  white-space: nowrap;
  overflow-x: auto;
}
.list {
  background: lightgray;
  border-radius: 3px;
  width: 270px;
  vertical-align: top;
  margin-right: 20px;
  padding: 20px;
  display: inline-block;
}
</style>
