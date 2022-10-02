<template lang="">
  <div class="relative mb-3">
    <div class="overflow-hidden">
      <input
        v-model="input"
        title="Search Posts Here"
        placeholder="Search Posts Here..."
        type="text"
        class="bg-gray-800 border-gray-600 border-2 outline-none w-full h-10 leading-10 p-2.5 pr-10 rounded text-gray-400 hover:border-blue-400 focus:border-blue-400 transition duration-500"
        @input="(e) => debounceSearchInput(e.target.value)"
      />
      <button
        type="button"
        title="Clear Input"
        :disabled="input.length < 1"
        class="absolute top-0 right-0 h-10 w-10 disabled:opacity-70 text-gray-400 hover:text-red-600 disabled:text-gray-600 transition duration-500"
        @click="clearSearch"
      >
        x
      </button>
    </div>
    <ul
      v-if="input.length > 0 && searchList.length > 0"
      role="list"
      class="block absolute w-full mt-0.5 pb-12"
    >
      <Entry
        v-for="post in searchList"
        :key="post.id"
        :value="post.title"
        :input="input"
        @select="selectInput"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'
import getWords from '@/composables/getWords'
import Entry from './Entry.vue'

const {
  input,
  toSearch,
  makeRequest,
  searched,
  searchList,
  clearSearch,
  selectInput,
  debounceSearchInput,
  fetchWords
} = getWords()

watchEffect(() => {
  if (toSearch.value.length > 0 && makeRequest.value) {
    fetchWords(toSearch.value)
  }
})

watchEffect(() => {
  if (
    searchList.value.length === 0 &&
    toSearch.value.length > 0 &&
    toSearch.value.length >= searched.value.length &&
    toSearch.value.substring(0, searched.value.length).toLowerCase() ===
      searched.value.toLowerCase()
  ) {
    makeRequest.value = false
    return
  }

  makeRequest.value = true
})
</script>
