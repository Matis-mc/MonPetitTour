<template>
      <input v-model="props.modelValue"
      type="text" 
      :placeholder="props.placeholder" 
      class="w-64 p-2 mb-4 border rounded-xl shadow-inner" />
</template>
<script setup lang="ts">

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    placeholder:{
        type: String,
        default: '...'
    }

})

</script>