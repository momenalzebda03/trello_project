<template>
    <section class="divTitle p-2 rounded-3 d-flex align-items-center justify-content-between spanSize" v-for="card in cards"
        :key="card.id">
        <span>{{ card.titleCard }}</span>
        <i class="fas fa-pencil-alt iconPeincle d-none" @click="$emit('functionDelete', card.id, postId)"></i>
    </section>
</template>
  
<script setup>
const { cards, postId } = defineProps(['cards', 'postId']);
</script>