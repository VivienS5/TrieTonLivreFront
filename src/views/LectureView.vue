<template>
  <div class="p-4 flex flex-col lg:flex-row">
    <!-- Partie Infos du Livre -->
    <div v-if="book" class="lg:w-1/3 flex flex-col items-center lg:items-start font-curlz">
      <img class="w-40 h-56 object-cover rounded shadow-lg" :src="book.image" alt="Book Cover" />
      <h2 class="text-2xl font-bold mt-4 text-center lg:text-left">
        {{ book.title }}
      </h2>
      <h3 class="text-lg text-gray-700">{{ book.author }}</h3>
    </div>

    <!-- Partie Texte -->
    <div class="w-2/3">
      <div v-if="bookText.length" class="border p-4 rounded shadow-lg bg-white max-h-[500px] overflow-auto">
        <pre class="whitespace-pre-wrap">{{ currentPageText }}</pre>
      </div>

      <div class="flex flex-row mt-4">
        <!-- Pagination Gauche -->
        <button @click="prevPage" :disabled="currentPage === 1"
          class="text-gray-700 font-bold px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
          ◀
        </button>

        <span class="font-bold p-4">{{ currentPage }} / {{ totalPages }}</span>

        <!-- Pagination Droite -->
        <button @click="nextPage" :disabled="currentPage === totalPages"
          class="text-gray-700 font-bold px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
          ▶
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const book = ref(null);
    const bookText = ref([]);
    const currentPage = ref(1);
    const linesPerPage = 17; // Nombre de lignes par "page"

    // Récupère le texte actuel affiché sur la page
    const currentPageText = computed(() => {
      const start = (currentPage.value - 1) * linesPerPage;
      const end = start + linesPerPage;
      return bookText.value.slice(start, end).join("\n");
    });

    const totalPages = computed(() => Math.ceil(bookText.value.length / linesPerPage));

    const fetchBook = async () => {
      try {
        const bookId = route.params.id;
        const response = await axios.get(`http://localhost:8000/book/${bookId}/`);
        const selectedBook = response.data;

        book.value = {
          id: selectedBook.id,
          title: selectedBook.title,
          author: selectedBook.author,
          image: selectedBook.cover,
          linkToBook: selectedBook.linkToBook,
        };

        fetchBookText(selectedBook.linkToBook);
      } catch (error) {
        console.error("Erreur lors du chargement du livre :", error);
      }
    };

    const fetchBookText = async (url) => {
      try {
        const response = await axios.get(`http://localhost:8000/book/proxy-book/`, { params: { url } });
        bookText.value = response.data.content.split("\n"); // Découpe en lignes pour la pagination
      } catch (error) {
        console.error("Erreur lors du chargement du texte :", error);
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    onMounted(fetchBook);

    return {
      book,
      bookText,
      currentPage,
      currentPageText,
      totalPages,
      nextPage,
      prevPage
    };
  }
};
</script>
