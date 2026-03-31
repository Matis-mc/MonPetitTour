<template>
  <input 
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    type="text" 
    :placeholder="placeholder" 
    class="w-64 p-2 mb-4 rounded-xl" 
  />
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  placeholder?: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>