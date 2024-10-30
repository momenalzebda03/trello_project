<template>
    <section class="d-flex flex-column-reverse flex-md-row gap-3">
        <draggable v-model="posts" class="d-flex gap-3 flex-column flex-md-row" drag-class="drag" ghost-class="ghost"
            item-key="id">
            <template #item="{ element }">
                <div>
                    <div class="patentElemet">
                        <cards :posts="element" @reloadDelete="deletePost" @emitDataToParent="deleteCard"
                            @reloadTitle="ApiPost" :isTrue="isTrue" />
                    </div>
                </div>
            </template>
        </draggable>
        <section class="text-white rounded-3 div_all div_lastcards d-flex" :class="{ 'card_list': boolen }">
            <div class="d-flex gap-2 w-100 ps-3 pt-3 div_cards mouse_all" v-if="tagBlock" @click="control">
                <i class="mt-1 icon_top fas fa-plus"></i>
                <h2 class="fs-6 title_size">add another list</h2>
            </div>
            <form class="ps-3 mt-3 w-100" @submit.prevent="postMainTitle" v-show="tagNone">
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
    </section>
</template>

<script setup>
import draggable from 'vuedraggable';
const MainTitle = ref('');
const posts = ref([]);
const boolen = ref(false);
const tagBlock = ref(true);
const tagNone = ref(false);
const inputFocus = ref(null);
const isTrue = ref(false);
const urlApi = ref("http://localhost:4000/Trello");

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

const reload = async () => {
    const { data } = await useFetch(urlApi.value);
    return posts.value = data.value;
};

const postMainTitle = async () => {
    if (MainTitle.value.trim() == '') {
        return;
    }
    const postData = {
        MainTitle: MainTitle.value,
    };
    await request(urlApi.value, { method: "post", body: postData }).then(() => {
        reload();
        MainTitle.value = '';
    }).catch(error => {
        console.error(error);
    })
};

const deletePost = async (id) => {
    await useFetch(`${urlApi.value}/${id}`, {
        method: "delete",
    }).catch((error) => {
        console.error(error);
    });
    reload();
}

const ApiPost = async (postId, cardTitle) => {
    if (cardTitle.trim() == '') {
        return;
    }
    await fetch(`${urlApi.value}/${postId}`)
        .then((response) => {
            return response.json();
        })
        .then((trelloapi) => {
            const newCard = {
                id: Math.floor(Math.random() * 1000),
                titleCard: cardTitle,
            };
            if (!trelloapi.cards) {
                trelloapi.cards = [];
            }
            trelloapi.cards.push(newCard);
            const mybody = JSON.stringify(trelloapi);
            request(`${urlApi.value}/${postId}`, { method: "put", body: mybody, postId }).then(() => {
                reload();
                isTrue.value = !isTrue.value;
            });
        })
        .catch((error) => {
            console.error(error);
        });
}

const deleteCard = async (cardId, postId) => {
    await fetch(`${urlApi.value}/${postId}`)
        .then((response) => {
            return response.json();
        })
        .then((trelloapi) => {
            const cardIndexToDelete = trelloapi.cards.findIndex(
                (item) => item.id == cardId
            );
            trelloapi.cards.splice(cardIndexToDelete, 1);
            const mybody = JSON.stringify(trelloapi);
            request(`${urlApi.value}/${postId}`, { method: "put", body: mybody, postId }).then(() => {
                reload();
            }).catch(error => {
                console.error(error);
            })
        })
        .catch((error) => {
            console.error(error);
        });
}

onMounted(async () => {
    document.addEventListener("click", closeCard, {
        capture: true
    });
    await reload();
});
</script>