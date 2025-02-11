<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <div class="flex justify-center m-1">
        <button
          v-if="$route.path === '/'"  
          type="button"
          class="text-gray-900  focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:text-gray-400 cursor-not-allowed"
        >
          <RouterLink to="/" class="text-3xl font-curlz cursor-not-allowed">TrieTonLivre</RouterLink>
        </button>
        <button
          v-else  
          type="button"
          class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 h-12 px-6"
        >
          <RouterLink to="/" class="text-3xl font-curlz">TrieTonLivre</RouterLink>
        </button>
      </div>
    </nav>
  </header>
  <RouterView />
</template>

<style>
.imgTitre {
  margin: auto;
  height: 3vw;
}

@media (max-width: 1024px) {
  .imgTitre {
    margin: auto;
    height: 13vw;
  }
}
@font-face {
  font-family: "Curlz MT";
  src: url("/fonts/curlzmt.ttf") format("truetype");
}

.font-curlz {
  font-family: "Curlz MT", sans-serif;
}
</style>
