<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
      <nav>
        <RouterLink to="/"><img src="./assets/images/Titre_TrieTonlivre.png" class="imgTitre"></RouterLink>
      </nav>
  </header>

  <RouterView />
</template>

<style scoped>
.imgTitre{
  margin: auto;
  height: 3vw;
}

@media (max-width: 1024px) {
.imgTitre{
  margin: auto;
  height: 13vw;
}
}
</style>
