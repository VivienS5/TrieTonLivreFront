<template>
<div class="p-4 flex flex-col lg:flex-row">
    <!-- Partie Infos du Livre -->
    <div v-if="book" class="lg:w-1/3 flex flex-col items-center lg:items-start  font-curlz">
      <img class="w-40 h-56 object-cover rounded shadow-lg" :src="book.image" alt="Book Cover" />
      <h2 class="text-2xl font-bold mt-4 text-center lg:text-left">{{ book.title }}</h2>
      <h3 class="text-lg text-gray-700">{{ book.author }}</h3>
    </div>
  <div class="w-1/3">
    <div>
      <!-- Affichage du PDF -->
      <div v-if="book && pdf" class="">
        <div class="border p-2 rounded shadow-lg bg-white">
          <!-- Affichage d'une seule page à la fois -->
          <VuePDF :pdf="pdf" :page="currentPage" class="w-full max-h-[500px] object-contain" />
        </div>
      </div>
    </div>

    <div class="flex flex-row">
      <!-- Pagination Gauche -->
      <div class="p-4 flex justify-start items-center w-full lg:w-1/3">
        <button @click="prevPage" :disabled="currentPage === 1" class="text-gray-700 font-bold px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
          ◀
        </button>
      </div>
      <span class="font-bold p-4 flex justify-center items-center w-full lg:w-1/3">{{ currentPage }} / {{ totalPages }}</span>
      <div class="p-4 flex justify-end items-center w-full lg:w-1/3">
      <!-- Pagination Droite -->
        <button @click="nextPage" :disabled="currentPage === totalPages" class="text-gray-700 font-bold px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
          ▶
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { VuePDF, usePDF } from "@tato30/vue-pdf";
import { useRoute } from "vue-router";

const route = useRoute();
const books = ref([]);
const book = ref(null);
const currentPage = ref(1);

// Charger le fichier PDF dynamiquement
const pdfUrl = ref("");
const { pdf, pages } = usePDF(pdfUrl);

const totalPages = pages;

async function fetchBooks() {
  try {
    const response = await fetch("/books.json");
    books.value = await response.json();
    book.value = books.value.find((b) => b.id == route.params.id) || null;

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
