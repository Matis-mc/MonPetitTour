<template>
    <div>
        <input type="file" @change="props.onFileLoaded" :accept="props.fileType" />
    </div>
</template>
<script setup lang="ts">

const props = defineProps({
  onFileLoaded: {
    type: Function,
    required: true
  },
  fileType : {
    type: String,
    required: true
  }
})
</script>