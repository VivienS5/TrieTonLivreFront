<script setup>
import { ref, onMounted } from "vue";
import { VuePDF, usePDF } from "@tato30/vue-pdf";
import { useRoute } from "vue-router";

const route = useRoute();
const books = ref([]);
const book = ref(null);
const currentPage = ref(1);
const totalPages = ref(100);

// Charger le fichier PDF si disponible
const pdfUrl = ref("");
const { pdf, pages } = usePDF(pdfUrl);

async function fetchBooks() {
  try {
    const response = await fetch("/books.json");
    books.value = await response.json();
    book.value = books.value.find((b) => b.id == route.params.id);

    if (book.value && book.value.pdf) {
      pdfUrl.value = book.value.pdf;
    }
  } catch (error) {
    console.error("Erreur de chargement des livres :", error);
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

onMounted(() => {
  fetchBooks();
});
</script>

<template>
  <div class="flex flex-col items-center justify-center p-4">
    <div v-if="book" class="max-w-md overflow-hidden">
      <div class="p-4 flex flex-col items-center">
        <img class="w-32 h-40 object-cover rounded" :src="book.image" alt="Book Cover" />
        <h3 class="mt-2 text-lg font-semibold">{{ book.author }}</h3>
        <h2 class="text-xl font-bold">{{ book.title }}</h2>
      </div>

      <!-- Affichage du PDF si disponible -->
      <div v-if="book.pdf" class="w-full max-w-lg">
        <h3 class="text-lg font-bold text-center mt-4">Lecture du PDF</h3>
        <div v-for="page in pages" :key="page" class="border p-2 my-2">
          <VuePDF :pdf="pdf" :page="page" />
        </div>
      </div>

      <!-- Affichage du contenu texte sinon -->
      <div v-else class="bg-gray-100 p-4 rounded-b-lg text-gray-700 text-sm overflow-y-auto h-48">
        {{ book.content }}
      </div>

      <div class="p-4 flex justify-between items-center">
        <button @click="prevPage" class="text-gray-700 font-bold">◀</button>
        <span class="font-bold">{{ currentPage }}/{{ totalPages }}</span>
        <button @click="nextPage" class="text-gray-700 font-bold">▶</button>
      </div>
    </div>

    <p v-else>Chargement...</p>
  </div>
</template>
