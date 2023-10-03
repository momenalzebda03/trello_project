<template>
    <section class="divTitle p-2 rounded-3 d-flex align-items-center justify-content-between spanSize"
        v-for="card in props.cards" :key="card.id">
        <span>{{ card.titleCard }}</span>
        <i class="fas fa-pencil-alt iconPeincle d-none" @click="deleteTitleCard(card.id, props.postId)"></i>
    </section>
</template>
  
<script setup>
const props = defineProps({
    cards: Array,
    postId: Boolean
});

const emit = defineEmits(["functionDelete"])

function deleteTitleCard(cardId, postId) {
    emit("functionDelete", cardId, postId);
}
</script>