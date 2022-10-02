<template lang="">
  <li
    class="bg-gray-800 p-2.5 opacity-95 mt-0.5 rounded hover:bg-gray-700 focus:bg-gray-700 transition duration-500 hover:opacity-100"
    role="button"
    @click="$emit('select', value)"
  >
    <b>{{ match }}</b
    >{{ rest }}
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ value: string; input: string }>()
const emit = defineEmits(['select'])
const match = computed(() => {
  let j = 0
  for (let i = 0; i < props.input.length; i++) {
    if (props.value[i].toLowerCase() !== props.input[i].toLowerCase()) break
    j++
  }

  return props.input.substring(0, j)
})
const rest = computed(() => props.value.substring(match.value.length))
</script>
