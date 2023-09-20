<template>
    <div class="d-flex gap-3 flex-column flex-md-row">
        <div class="d-flex flex-column gap-4 text-white bg-black pt-1 pb-3 px-3 rounded-3 d-flex div_all"
            v-for="post in posts" :key="post.id">
            <div class="d-flex justify-content-between align-items-center p-1">
                <h2 class="mb-0 title_size text_header">{{ post.MainTitle }}</h2>
                <div class="position-relative">
                    <i class="fas fa-ellipsis-h mouse_all hover_icon rounded-2 p-2" @click="showDelete(post.id)"></i>
                    <div class="mouse_all divDelete deleteNone position-absolute top-0"
                        :class="{ 'd-block': deleteBoolen[post.id] }">
                        <div class="bg-black p-2 rounded-3">
                            <span @click="DeleteId(post.id)">delete</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-between pe-1">
                <div class="div_bottom mouse_all color_text py-1 rounded-3 d-flex align-items-center w-100 p-2">
                    <div class="d-flex gap-2 align-items-center">
                        <i class="fas fa-plus"></i>
                        <span class="fw-bold title_size">add a card</span>
                    </div>
                </div>
                <i class="fas fa-save mouse_all hover_icon p-2 rounded-2"></i>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['posts']);
const deleteBoolen = ref({});

function showDelete(postId) {
    deleteBoolen.value[postId] = true;
}

function closeDelete() {
    Object.keys(deleteBoolen.value).forEach((postId) => {
        deleteBoolen.value[postId] = false;
    });
}

const hasDelete = computed(() => {
    return Object.values(deleteBoolen.value).some((value) => value);
});

watch(hasDelete, (newVal) => {
    if (newVal) {
        document.body.classList.add('dark-background');
    } else {
        document.body.classList.remove('dark-background');
    }
});

function DeleteId(id) {
    ApiService.DeleteTitle(id);
    // ApiService.DeleteId(id);
}

onMounted(async () => {
    document.addEventListener("click", closeDelete, {
        capture: true
    })
    // await ApiService.fetchReload();
})
</script>