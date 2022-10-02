<template>
  <div class="flex items-center justify-center">
    <div class="m-10 w-full max-w-screen-md">
      <AutoComplete />
      <p>
        Demo Paragraph placed here <br />
        to prove that the Search Results <br />
        will appear on top of any <br />
        component/content below the form.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import AutoComplete from './components/AutoComplete/index.vue'
</script>
