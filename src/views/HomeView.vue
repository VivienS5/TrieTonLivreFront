<template>
  <div>
    <!-- SearchBar début -->
    <div class="m-3">
      <SearchBar @search="handleSearch" />
    </div>
    <!-- SearchBar fin -->

    <!-- Les plus appréciés début -->
    <div class="m-3">
      <PlusApprecies :books="books" :search="search" />
    </div>
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
