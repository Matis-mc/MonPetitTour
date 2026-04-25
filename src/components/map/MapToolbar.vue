<template>
  <div v-if="isEditing" class="absolute left-6 top-3/4 -translate-y-1/2 z-[1000] flex flex-col gap-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/20 transition-all duration-300">
    <!-- Commencer un segment -->
    <button 
      class="p-4 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 shadow-md flex items-center justify-center group relative"
      :class="isCreatingSegment ? 'bg-orange-500 text-white shadow-orange-200' : 'bg-white hover:bg-stone-50 text-stone-700'"
      @click="$emit('toggle-creating')"
    >
      <img src="@/assets/images/icones/pen.png" alt="Segment" class="w-7 h-7 transition-all" :class="{'invert brightness-200': isCreatingSegment}" />
      <span class="absolute left-full ml-4 px-2 py-1 bg-stone-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity">
        {{ isCreatingSegment ? 'Annuler la sélection' : 'Commencer un segment' }}
      </span>
    </button>

    <!-- Afficher les segments -->
    <button 
      class="p-4 bg-white rounded-xl hover:bg-stone-50 transition-all duration-200 hover:scale-110 active:scale-95 shadow-md flex items-center justify-center group relative text-stone-700"
      @click="$emit('toggle-segments')"
    >
      <img src="@/assets/images/icones/liste.png" alt="Liste" class="w-6 h-6" />
      <span class="absolute left-full ml-4 px-2 py-1 bg-stone-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity">
        Afficher les segments
      </span>
    </button>

    <div class="h-px bg-stone-200 mx-2"></div>

    <!-- Retour / Annuler -->
    <button 
      class="p-4 bg-white rounded-xl hover:bg-stone-50 transition-all duration-200 hover:scale-110 active:scale-95 shadow-md flex items-center justify-center group relative text-stone-700"
      @click="$emit('back')"
    >
      <img src="@/assets/images/icones/undo.png" alt="Annuler" class="w-6 h-6" />
      <span class="absolute left-full ml-4 px-2 py-1 bg-stone-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity">
        Retour / Annuler
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  isEditing: boolean
  isCreatingSegment: boolean
}>()

defineEmits<{
  (e: 'toggle-creating'): void
  (e: 'toggle-segments'): void
  (e: 'back'): void
}>()

</script>

<style scoped>
button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
