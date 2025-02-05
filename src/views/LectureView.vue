<template>
  <div class="flex items-center justify-center p-4">
    <div v-if="book" class="max-w-md overflow-hidden">
      <div class="p-4 flex flex-col items-center">
        <img class="w-32 h-40 object-cover rounded" :src="book.image" alt="Book Cover" />
        <h3 class="mt-2 text-lg font-semibold">{{ book.author }}</h3>
        <h2 class="text-xl font-bold">{{ book.title }}</h2>
      </div>
      <div class="bg-gray-100 p-4 rounded-b-lg text-gray-700 text-sm overflow-y-auto h-48">
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

<script>
export default {
  data() {
    return {
      books: [],
      book: null,
      currentPage: 1,
      totalPages: 100
    };
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await fetch("/books.json");
        this.books = await response.json();
        const bookId = this.$route.params.id;
        this.book = this.books.find(b => b.id == bookId);
      } catch (error) {
        console.error("Erreur de chargement des livres :", error);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  },
  mounted() {
    this.fetchBooks();
  }
};
</script>
