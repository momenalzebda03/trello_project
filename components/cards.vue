<template>
    <div class="d-flex gap-3 flex-column flex-md-row">
        <div class="text-white bg-black pt-1 pb-3 px-3 rounded-3 d-flex div_all" v-for="post in posts" :key="post">
            <div class="d-flex justify-content-between w-100">
                <div class="d-flex flex-column gap-3 icon_top1 w-100">
                    <h2 class="title_size text_header">{{ post.MainTitle }}</h2>
                    <div class="div_bottom mouse_all d-flex align-items-center color_text py-1 rounded-3">
                        <i class="fas fa-plus"></i>
                        <span class="fw-bold title_size">add a card</span>
                    </div>
                </div>
                <div class="d-flex flex-column justify-content-between align-items-end pt-1">
                    <i class="fas fa-ellipsis-h mouse_all hover_icon p-2 rounded-2"></i>
                    <i class="fas fa-save mouse_all hover_icon p-2 rounded-2"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['posts']);
</script>