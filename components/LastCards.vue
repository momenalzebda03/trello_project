<template>
    <cards :posts="posts" @reloadDelete="deletePost" @emitDataToParent="deleteCard" @reloadTitle="ApiPost" />
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
</template>

<script setup>

const MainTitle = ref('');
const posts = ref([]);
const boolen = ref(false);
const tagBlock = ref(true);
const tagNone = ref(false);
const inputFocus = ref(null);

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
    const { data } = await useFetch("http://localhost:3000/Trello");
    return posts.value = data.value;
};

// const postMainTitle = async () => {
//     if (MainTitle.value.trim() === '') {
//         return;
//     }
//     const postData = {
//         MainTitle: MainTitle.value,
//     };
//     await allRequeste.request("http://localhost:3000/Trello", { method: "post", body: postData }).then(() => {
//         reload();
//         MainTitle.value = '';
//     }).catch(error => {
//         console.error(error);
//     })
// };

const deletePost = async (id) => {
    await useFetch(`http://localhost:3000/Trello/${id}`, {
        method: "delete",
    }).catch((error) => {
        console.error(error);
    });
    reload();
}

const ApiPost = async (postId, cardTitle) => {
    if (cardTitle.trim() === '') {
        return;
    }
    await fetch(`http://localhost:3000/Trello/${postId}`)
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
            allRequeste.request("http://localhost:3000/Trello", { method: "PUT", body: newCard, postId });
        })
        .catch((error) => {
            console.error(error);
        });
    reload();
    return cardTitle = '';
}

// const ApiPost = async (postId, cardTitle) => {
//     if (cardTitle.trim() === '') {
//         return;
//     }
//     await fetch(`http://localhost:3000/Trello/${postId}`)
//         .then((response) => {
//             return response.json();
//         })
//         .then((trelloapi) => {
//             const newCard = {
//                 id: Math.floor(Math.random() * 1000),
//                 titleCard: cardTitle,
//             };
//             if (!trelloapi.cards) {
//                 trelloapi.cards = [];
//             }
//             trelloapi.cards.push(newCard);
//             return fetch(`http://localhost:3000/Trello/${postId}`, {
//                 method: "PUT",
//                 body: JSON.stringify(trelloapi),
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });
//         })
//         .catch((error) => {
//             console.error(error);
//         });
//     reload();
//     return cardTitle = '';
// }

const deleteCard = async (cardId, postId) => {
    await fetch(`http://localhost:3000/Trello/${postId}`)
        .then((response) => {
            return response.json();
        })
        .then((trelloapi) => {
            const cardIndexToDelete = trelloapi.cards.findIndex(
                (item) => item.id == cardId
            );
            if (cardIndexToDelete !== -1) {
                trelloapi.cards.splice(cardIndexToDelete, 1);
                return fetch(`http://localhost:3000/Trello/${postId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(trelloapi),
                });
            }
        })
        .catch((error) => {
            console.error(error);
        });
    reload();
}

onMounted(async () => {
    document.addEventListener("click", closeCard, {
        capture: true
    });
    await reload();
});
</script>