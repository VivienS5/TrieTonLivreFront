<template>
  <div>
    <!-- SearchBar début -->
    <div class="m-3">
      <SearchBar @search="handleSearch" />

      <!-- Résultats de recherche -->
      <div v-if="search != ''">
        <h2 class="text-3xl font-semibold mt-4 font-curlz">Résultat pour "{{ search }}"</h2>
        
        <div v-if="books.length" class="grid lg:grid-cols-4 lg:gap-4 grid-cols-2 gap-2">
          <div
          v-for="book in books"
          :key="book.id"
          @click="goToBook(book.id)"
          class="flex items-center my-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
          >
          <img :src="book.image" alt="book cover" class="w-16 h-16 rounded object-cover" />
          <div class="ml-4">
            <p class="font-bold">{{ book.title }}</p>
            <p class="text-sm text-gray-500">{{ book.author }}</p>
          </div>
          </div>
        </div>
      
      </div>      
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
import axios from "axios"; 

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
      if (!this.search) return;

      try {
        const response = await axios.get(`http://localhost:8000/book/search?word=${this.search}`);
        this.books = response.data.map(book => ({
          id: book.id,
          title: book.title,
          author: book.author,
          image: book.cover,
        }));
      } catch (error) {
        console.error("Erreur API :", error);
      }
    },
    handleSearch(query) {
      this.search = query;
      this.fetchBooks();
    },
    goToBook(bookId) {
      this.$router.push({ name: "lecture", params: { id: bookId } });
    },
  }
};
</script>
