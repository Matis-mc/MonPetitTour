<template>
    <div class="flex flex-col items-center gap-2 mb-4">
        <label class="cursor-pointer justify-items-center">
            <div class="w-32 h-32 bg-stone-800/10 inset rounded-xl flex items-center justify-center shadow-lg transition m-3">
                <img src="@/assets/images/icones/ajout-fichier.png" alt="Upload File" class="w-20 h-20"/>
            </div>
            <p class="text-center text-xs"> Sélectionner un fichier "{{ props.fileType.toUpperCase() }}"</p>
            <p v-if="messageError" class="text-center text-xs text-red-500"> {{ messageError }}</p>
            <input type="file" @change="handleFileChange" :accept="props.fileType" class="hidden"/>
        </label>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';


const props = defineProps({
  onFileLoadedEvent: {
    type: Function,
    required: true
  },
  fileType : {
    type: String,
    required: true
  }
});

const messageError = ref("");

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  checkFileIsPresent(input);
  checkFileExtension(input.files![0]);
  props.onFileLoadedEvent(event);
};


const checkFileIsPresent = (input: HTMLInputElement) => {
  if(input == null || input.files == null || input.files.length == 0){
    messageError.value = "Erreur lors de la sélection du fichier";
    return;
  }
}

const checkFileExtension = (file: File) => {
  if(file.name.split('.').pop() !== props.fileType.replace('.', '')){
    messageError.value = "Le fichier n'est pas du type : " + props.fileType + "(ex: " + file.type + ")";
    return;
  }
};

</script>