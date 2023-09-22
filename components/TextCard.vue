<template>
    <section class="divTitle p-2 rounded-3 d-flex align-items-center justify-content-between spanSize" v-for="card in cards"
        :key="card.id">
        <span>{{ card.titleCard }}</span>
        <i class="fas fa-pencil-alt iconPeincle d-none" @click="deleteText(card.id, postId)"></i>
        <!-- <i class="fas fa-pencil-alt iconPeincle d-none" @click="$emit('functionDelete', card.id, postId)"></i> -->
    </section>
</template>
  
<script setup>
const { cards, postId } = defineProps(['cards', 'postId']);

const deleteText = async (cardId, postId, urlTrello) => {
    await ApiService.deleteCard(cardId, postId, 'Trello');
    return fetch(`http://localhost:3000/Trello`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
}

onMounted(async () => {
    await deleteText();
})
</script>