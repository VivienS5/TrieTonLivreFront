<template>
  <div class="p-4 flex flex-col lg:flex-row">
    <!-- Partie Infos du Livre -->
    <div
      v-if="book"
      class="lg:w-1/5 flex flex-col items-center lg:items-start font-curlz"
    >
      <img
        class="w-40 h-56 object-cover rounded shadow-lg"
        :src="book.image"
        alt="Book Cover"
      />
      <h2 class="text-2xl font-bold mt-4 text-center lg:text-left">
        {{ book.title }}
      </h2>
      <h3 class="text-lg text-gray-700">{{ book.author }}</h3>
    </div>

    <!-- Partie Texte -->
    <div class="lg:w-3/5 overflow-hidden">
      <div v-if="isLoading" class="flex justify-center items-center h-40">
        <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
      
      <!-- Empêche le scroll global de la page -->
      <div
        v-if="bookText.length"
        class="border p-4 rounded shadow-lg bg-white max-h-[500px] overflow-auto"
        ref="bookContainer"
      >
        <pre class="whitespace-pre-wrap">{{ currentChapterText }}</pre>
      </div>
    </div>

    <div class="lg:w-1/5">
      <div class="flex flex-row m-4 justify-center items-center">
        <!-- Pagination Gauche -->
        <button
          @click="prevChapter"
          :disabled="currentChapter === 1"
          class="text-gray-700 font-bold px-3 py-1 bg-gray-400 rounded disabled:opacity-30"
        >
          ◀
        </button>

        <span class="font-bold p-4"
          >{{ currentChapter }} / {{ totalChapters }}</span
        >

        <!-- Pagination Droite -->
        <button
          @click="nextChapter"
          :disabled="currentChapter === totalChapters"
          class="text-gray-700 font-bold px-3 py-1 bg-gray-400 rounded disabled:opacity-30"
        >
          ▶
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const book = ref(null);
const bookText = ref([]);
const currentChapter = ref(1);
const isLoading = ref(true);

const bookContainer = ref(null);

const currentChapterText = computed(() => {
  return bookText.value[currentChapter.value - 1] || '';
});

const totalChapters = computed(() => bookText.value.length);

const fetchBook = async () => {
  try {
    isLoading.value = true;
    const bookId = route.params.id;
    const response = await axios.get(
      `http://localhost:8000/book/${bookId}/`
    );
    const selectedBook = response.data;

    book.value = {
      id: selectedBook.id,
      title: selectedBook.title,
      author: selectedBook.author.map(a => a.name).join(", "),
      image: selectedBook.cover,
      linkToBook: selectedBook.linkToBook,
    };
    console.log("reponse:", response.data);

    await fetchBookText(selectedBook.linkToBook);
  } catch (error) {
    console.error('Erreur lors du chargement du livre :', error);
  } finally {
    isLoading.value = false;
  }
};

const fetchBookText = async (url) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/book/proxy-book/`,
      { params: { url } }
    );
    const content = response.data.content.split(/(?=CHAPTER)/); // Découpe à chaque occurrence de "CHAPTER"

    // const content = response.data.content.split(/(?=^.*\bchapters?\b.*$)/gim);
    bookText.value = content;
  } catch (error) {
    console.error('Erreur lors du chargement du texte :', error);
  }
};

const scrollToTop = () => {
  if (bookContainer.value) {
    bookContainer.value.scrollTop = 0;
  }
};

// Navigation entre chapitres
const nextChapter = () => {
  if (currentChapter.value < totalChapters.value) {
    currentChapter.value++;
    scrollToTop();
  }
};

const prevChapter = () => {
  if (currentChapter.value > 1) {
    currentChapter.value--;
    scrollToTop();
  }
};

onMounted(fetchBook);

</script>

<style scoped>
pre {
  margin: 0;
}
</style>
