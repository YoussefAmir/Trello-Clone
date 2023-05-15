<template>
    <div class="card card-body mt-3">
        {{ card.name }}
    </div>
</template>

<script>
export default{
    props: [ "card" ],
    data: function() {
        return {
            editing: false
        }
    }
}
</script>

<style scoped>
</style>