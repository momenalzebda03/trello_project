<template>
    <div class="d-flex gap-3 mt-3 flex-column flex-md-row ms-5">
        <Cards />
        <last-cards />
        <!-- <last-cards @reload="onReload" /> -->
    </div>
</template>

<!-- <script setup>
const hasChanges = ref(false);

const onReload = () => {
    hasChanges.value = !hasChanges.value;
}
</script> -->