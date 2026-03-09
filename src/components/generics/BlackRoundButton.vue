<template>
    <button class="bg-black text-white rounded-full px-4 py-2"
    @click="onClick()" >{{ props.text }}</button>
</template>
<script setup lang="ts">

const props = defineProps({
    text: {
        type: String,
        required: true
    },
    onClick: {
        type: Function,
        required: true
    }
})

function onClick() {
    props.onClick();
}

</script>