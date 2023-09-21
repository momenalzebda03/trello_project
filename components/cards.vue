<template>
    <div class="d-flex flex-column gap-4 text-white bg-black px-3 rounded-3 div_all h-100 pb-3"
        v-for="(post, index) in posts" :key="post.id">
        <div class="d-flex justify-content-between align-items-center p-1">
            <h2 class="mb-0 title_size text_header">{{ post.MainTitle }}</h2>
            <div class="position-relative">
                <i class="fas fa-ellipsis-h mouse_all hover_icon rounded-2 p-2" @click="showDelete(post.id)"></i>
                <div class="mouse_all divDelete deleteNone position-absolute top-0"
                    :class="{ 'd-block': deleteBoolen[post.id] }">
                    <div class="bg-black p-2 rounded-3">
                        <span @click="deletePost(post)">delete</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-between pe-1" :class="{ 'd-none': textNone[post.id] }"
            @click="cardBlock(post.id, index)">
            <div class="div_bottom mouse_all color_text py-1 rounded-3 d-flex align-items-center w-100 p-2">
                <div class="d-flex gap-2 align-items-center">
                    <i class="fas fa-plus"></i>
                    <span class="fw-bold title_size">add a card</span>
                </div>
            </div>
            <i class="fas fa-save mouse_all hover_icon p-2 rounded-2"></i>
        </div>
        <form class="deleteNone align-items-center gap-2" @submit.prevent="ApiPost(ApiTerllo, post.id)"
            :class="{ 'd-block': textBlock[post.id] }">
            <textarea placeholder="enter a title for this card..." ref="textArea" @click="cardBlock(post.id, index)"
                class="rounded-3 text-white ps-2 border border-0 w-100 py-2" v-model="cardTitle"></textarea>
            <div class="d-flex gap-2 align-items-center mt-2">
                <button type="submit" class="p-1 px-3 text-black btn btn-primary">add list</button>
                <i class="color_text fas fa-times fs-4 mouse_all" @click="closeCard(post.id)"></i>
            </div>
        </form>
    </div>
</template>

<script setup>
const { posts } = defineProps(['posts']);
const emit = defineEmits(['data-post']);
const deleteBoolen = ref({});
const textBlock = ref({});
const textNone = ref({});
const textArea = ref([]);
const cardTitle = ref("");

function deletePost(post) {
    emit('delete-post', 'Trello', post.id);
}

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

function closeCard(postId) {
    textBlock.value[postId] = false;
    textNone.value[postId] = false;
}

function cardBlock(postId, index) {
    Object.keys(textBlock.value).forEach((key) => {
        textBlock.value[key] = false;
        textNone.value[key] = false;
    });

    setTimeout(() => {
        if(textArea.value[index])
        textArea.value[index].focus();
    }, 1)

    textBlock.value[postId] = !textBlock.value[postId];
    textNone.value[postId] = true;
}

const ApiPost = async (ApiTerllo, postId) => {
    await ApiService.ApiPost("Trello", postId, cardTitle.value).then(() => {
        cardTitle.value = '';
    }).catch(error => {
        console.log(error);
    });
};

onMounted(async () => {
    document.addEventListener("click", closeDelete, {
        capture: true
    });
    document.addEventListener("click", cardBlock, {
        capture: true
    });
});
</script>