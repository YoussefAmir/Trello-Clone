<template>
  <draggable v-model="lists" group="lists" class="board dragArea" @end="listMoved">
    <div v-for="list in lists" class="list">
      <h6>{{ list.name }}</h6>

      <draggable v-model="list.cards" group="cards" class="dragArea" @change="cardMoved">
        <div v-for="(card,index) in list.cards" class="card card-body mt-3">
          {{ card.name }}
        </div>
      </draggable>

      <textarea v-model="messages[list.id]" class="form-control mt-3"></textarea>
      <button v-on:click="submitMessges(list.id)" class="btn btn-secondary mt-1x">Add</button>
    </div>
  </draggable>
</template>

<script>
import Rails from "@rails/ujs"
import { VueDraggableNext } from 'vue-draggable-next'

export default {
  components: { draggable: VueDraggableNext },
  props: ["original_lists"],
  data: function(){
    return {
      messages: {},
      lists: this.original_lists
    }
  },
  methods: {
    cardMoved: function(event){
      const evt = event.added || event.moved
      if (evt == undefined){ return }
      
      var card_id = evt.element.id
      const list_id = this.lists.findIndex((list) => {
        return list.cards.find((card) => {
          return card.id == card_id
        })
      })

      var data = new FormData
      data.append("card[position]", evt.newIndex + 1)
      data.append("card[list_id]", this.lists[list_id].id)

      Rails.ajax({
        url: `/cards/${card_id}/move`,
        type: "PATCH",
        data: data,
        dataType: "json"
      })

    },
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
    submitMessges: function(list_id){
      var data = new FormData
      data.append("card[list_id]", list_id)
      data.append("card[name]", this.messages[list_id])

      Rails.ajax({
        url: "/cards",
        type: "POST",
        data: data,
        dataType: "json",
        success: (data) => {
          const index = this.lists.findIndex(item => item.id == list_id)
          this.lists[index].cards.push(data)
          this.messages[list_id] = undefined
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
