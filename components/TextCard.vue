<template>
    <section class="divTitle p-2 rounded-3 d-flex align-items-center justify-content-between spanSize" v-for="card in cards"
        :key="card.id">
        <span>{{ card.titleCard }}</span>
        <i class="fas fa-pencil-alt iconPeincle d-none" @click="deleteText(card.id)"></i>
    </section>
</template>

<script setup>
const { props } = defineProps(['cards']);

const deleteText = (cardId) => {
    console.log(post.cards);
}
</script>

<!-- // const newData = props.cards.findIndex((element) => element.id == id);
// const response = await axios.get(`http://localhost:3000/Trello/${id}`);
// const trelloapi = response.data;
// trelloapi.cards.push(newData);
// await axios.delete(`http://localhost:3000/Trello/${id}`, trelloapi); -->