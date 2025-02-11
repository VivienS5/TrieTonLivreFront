<template>
  <div>
    <!-- SearchBar début -->
    <div class="m-3">
      <SearchBar @search="handleSearch" />

      <!-- Résultats de recherche -->
      <div v-if="search !== ''">
        <h2 class="text-3xl font-semibold mt-4 font-curlz bg-[#a9a9a9]">Résultat pour "{{ search }}"</h2>

        <div v-if="books.length" class="grid lg:grid-cols-4 lg:gap-4 grid-cols-2 gap-2">
          <div
            v-for="book in books"
            :key="book.id"
            @click="goToBook(book)" 
            class="flex items-center my-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
          >
            <img :src="book.image" alt="book cover" class="w-16 h-16 rounded object-cover" />
            <div class="ml-4">
              <p class="font-bold">{{ book.title }}</p>
              <p class="text-sm text-gray-500">{{ book.author }}</p>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages >= 2" class="flex justify-center items-center mt-4 space-x-4">
          <button 
            @click="prevPage" 
            :disabled="page <= 1" 
            class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Précédent
          </button>
          
          <span>Page {{ page }} / {{ totalPages }}</span>

          <button 
            @click="nextPage" 
            :disabled="page >= totalPages" 
            class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Suivant
          </button>
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
      page: 1, 
      limit: 8,
    };
  },
  methods: {
    async fetchBooks() {
      if (!this.search) return;

      try {
        const response = await axios.get(
          `http://localhost:8000/book/search?word=${this.search}&page=${this.page}&limit=${this.limit}`
        );
        console.log("Books:", response.data);

        this.books = response.data.results.map(book => ({
          id: book.id || book.ids, 
          title: book.title,
          author: book.author.toString(),
          image: book.cover,
        }));

        this.totalPages = Math.ceil(response.data.count / this.limit);
        console.log("Total pages:", this.totalPages);

      } catch (error) {
        console.error("Erreur API :", error);
      }
    },
    
    handleSearch(query) {
      this.search = query;
      this.page = 1;
      this.fetchBooks();
    },

    goToBook(book) {
      if (book && book.id) {
        this.$router.push({ name: "lecture", params: { id: book.id } });
      } else {
        console.error("Le livre n'a pas d'ID valide.");
      }
    },

    nextPage() {
      if (this.page < this.totalPages) {
        this.page++;
        this.fetchBooks();
      }
    },

    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.fetchBooks();
      }
    },
  }
};
</script>
