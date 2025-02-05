<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-2xl font-bold m-4">TrieTonLivre</h1>

    <!-- SearchBar début -->
    <SearchBar @search="handleSearch" />
    <!-- SearchBar fin -->

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
  },
  mounted() {
    this.fetchBooks();
  },
};
</script>
