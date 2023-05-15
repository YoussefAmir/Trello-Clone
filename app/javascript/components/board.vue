<template>
  <draggable v-model="lists" group="lists" class="board dragArea" @end="listMoved">
    <list v-for="list in lists" :list="list"></list>
  </draggable>
</template>

<script>
import Rails from "@rails/ujs"
import { VueDraggableNext } from 'vue-draggable-next'
import list from "../components/list.vue"

export default {
  components: { draggable: VueDraggableNext, list },
  props: ["original_lists"],
  data: function(){
    return {
      messages: {},
      lists: this.original_lists
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
</style>
