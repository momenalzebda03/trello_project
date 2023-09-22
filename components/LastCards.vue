<template>
    <cards :posts="posts" @reloadDelete="deletePost" @reloadTitle="postTitleCard" @emitDataToParent="reloadApi" />
    <section class="text-white rounded-3 div_all div_lastcards d-flex" :class="{ 'card_list': boolen }">
        <div class="d-flex gap-2 w-100 ps-3 pt-3 div_cards mouse_all" v-if="tagBlock" @click="control">
            <i class="mt-1 icon_top fas fa-plus"></i>
            <h2 class="fs-6 title_size">add another list</h2>
        </div>
        <form class="ps-3 mt-3 w-100" @submit.prevent="addMainTitle" v-show="tagNone">
            <div class="d-flex flex-column gap-2">
                <input type="text" class="inputAdd rounded-1 border border-0 text-white ps-2 py-1"
                    placeholder="Enter List Title..." ref="inputFocus" v-model="MainTitle" />
                <div class="d-flex align-items-center gap-2">
                    <button type="submit" class="p-1 px-3 text-black btn btn-primary">add list</button>
                    <i class="color_text fas fa-times fs-4 mouse_all" @click="closeCard"></i>
                </div>
            </div>
        </form>
    </section>
</template>

<script setup>
const MainTitle = ref('');
const posts = ref([]);
const boolen = ref(false);
const tagBlock = ref(true);
const tagNone = ref(false);
const inputFocus = ref(null);

const fetchReload = async (ApiTerllo) => {
    ApiService.fetchGet(`Trello`)
        .then((data) => {
            posts.value = data;
        })
        .catch((error) => {
            console.error(error);
        });
};

const addMainTitle = async () => {
    if (MainTitle.value.trim() === '') {
        return;
    }
    await ApiService.postMainTitle("Trello", MainTitle.value).then(() => {
        MainTitle.value = '';
        fetchReload();
    }).catch(error => {
        console.log(error);
    });
};

function control() {
    boolen.value = true;
    tagBlock.value = false;
    tagNone.value = true;
    nextTick(() => {
        inputFocus.value.focus();
    });
}

function closeCard() {
    boolen.value = false;
    tagBlock.value = true;
    tagNone.value = false;
}

const deletePost = async (api, id) => {
    await ApiService.DeleteTitle("Trello", id);
    fetchReload();
}

const postTitleCard = async (postId, cardTitle) => {
    if (cardTitle.trim() === '') {
        return;
    }
    await ApiService.ApiPost("Trello", postId, cardTitle).then(() => {
        cardTitle = '';
        fetchReload();
    }).catch(error => {
        console.log(error);
    });
};

const reloadApi = async (cardId, postId, urlTrello) => {
    await ApiService.deleteCard(cardId, postId, 'Trello');
    fetchReload();
}

onMounted(async () => {
    document.addEventListener("click", closeCard, {
        capture: true
    });
    await fetchReload();
});
</script>