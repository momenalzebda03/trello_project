<template>
    <cards :posts="posts" />
    <div class="text-white rounded-3 div_all div_lastcards d-flex" :class="{ 'card_list': boolen }">
        <div class="d-flex gap-2 w-100 ps-3 pt-3 div_cards mouse_all" v-if="tagBlock" @click="control">
            <i class="mt-1 icon_top fas fa-plus"></i>
            <h2 class="fs-6 title_size">add another list</h2>
        </div>
        <form class="ps-3 mt-3 w-100" @submit.prevent="addMainTitle" v-show="tagNone">
            <div class="d-flex flex-column gap-2">
                <input type="text" class="inputAdd rounded-1 border border-0 text-white ps-2 py-1"
                    placeholder="Enter List Title..." ref="inputFoucs" v-model="MainTitle" />
                <div class="d-flex align-items-center gap-2">
                    <button type="submit" class="p-1 px-3 text-black btn btn-primary">add list</button>
                    <i class="color_text fas fa-times fs-4 mouse_all" @click="closeCard"></i>
                </div>
            </div>
        </form>
    </div>
</template>

  
<script setup>
const MainTitle = ref('');
const posts = ref([]);
const boolen = ref(false);
const tagBlock = ref(true);
const tagNone = ref(false);
const inputFoucs = ref(null);

function addMainTitle() {
    ApiService.addMainTitle(MainTitle, posts);
};

function control() {
    boolen.value = true;
    tagBlock.value = false;
    tagNone.value = true;
    nextTick(() => {
        inputFoucs.value.focus();
    });
}

function closeCard() {
    boolen.value = false;
    tagBlock.value = true;
    tagNone.value = false;
}

onMounted(async () => {
    document.addEventListener("click", closeCard, {
        capture: true
    });
    await ApiService.fetchReload(posts);
});
</script>