<template>
    <div class="flex flex-col items-center gap-2 mb-4">
        <label class="cursor-pointer">
            <div class="w-16 h-16 bg-yellow-100 inset rounded-xl flex items-center justify-center shadow-lg transition">
                <img src="@/assets/images/icones/ajout-fichier.png" alt="Upload File" class="w-10 h-10"/>
            </div>
            <input type="file" @change="handleFileChange" :accept="props.fileType" class="hidden"/>
        </label>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  onFileLoaded: {
    type: Function,
    required: true
  },
  fileType : {
    type: String,
    required: true
  }
});

const fileName = ref<string>('');

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    fileName.value = input.files[0].name;
    props.onFileLoaded(event);
  }
};
</script>