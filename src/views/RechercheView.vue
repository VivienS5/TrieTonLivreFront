<template>
  <div class="flex flex-col items-center justify-center">

    <!-- SearchBar début -->
    <SearchBar @search="handleSearch" />
    <!-- SearchBar fin -->

    <!-- Resultat de recherche début -->
    <h2 class="text-xl font-semibold mt-4">Resultat pour {{ $route.params.search }}</h2>
    <!-- gerer dans le back la logique de trie -->
    <div
      v-for="book in filteredBooks"
      :key="book.id"
      @click="goToBook(book.id)"
      class="flex items-center my-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
    >
      <img :src="book.image" alt="book cover" class="w-16 h-16 rounded" />
      <div class="ml-4">
        <p class="font-bold">{{ book.title }}</p>
        <p class="text-sm text-gray-500">{{ book.author }}</p>
      </div>
    </div>
    <!-- Resultat de recherche fin -->

    <!-- Les plus appréciés début -->
    <PlusApprecies :books="books" :search="search" />
    <!-- Les plus appréciés fin -->
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import PlusApprecies from "@/components/PlusApprecies.vue";

export default {
  components: { SearchBar, PlusApprecies },
  data() {
    return {
      search: "",
      books: [],
    };
  },
  computed: {
    filteredBooks() {
      return this.books.filter(book =>
        book.title.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await fetch("/books.json");
        this.books = await response.json();
      } catch (error) {
        console.error("Erreur de chargement des livres :", error);
      }
    },
    handleSearch(query) {
      this.search = query;
    },
    goToBook(bookId) {
      this.$router.push({ name: "lecture", params: { id: bookId } });
    },
  },
  mounted() {
    this.fetchBooks();
  },
};
</script>
