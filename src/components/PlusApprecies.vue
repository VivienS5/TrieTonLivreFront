<template>
  <div>
    <h1 class="text-3xl font-semibold mt-4 font-curlz bg-[#a9a9a9]">Bibliothèque</h1>

    <!-- Message d'erreur si l'API ne répond pas -->
    <p v-if="apiError" class="text-red-600 font-semibold mt-2">
      *Erreur, une erreur s'est produite. Veuillez réessayer plus tard.*
    </p>

    <!-- Message si aucun livre n'est trouvé -->
    <p v-if="!isLoading && !books.length && !apiError" class="text-gray-500 mt-2">
      Aucun livre trouvé pour cette catégorie.
    </p>

    <!-- Loader pendant le chargement -->
    <div v-if="isLoading" class="grid lg:grid-cols-4 lg:gap-4 grid-cols-2 gap-2 m-1">
      <div v-for="n in 8" :key="n" class="p-4 bg-gray-200 rounded-lg">
        <ContentLoader 
          speed="2"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="100" y="10" rx="3" ry="3" width="150" height="20" /> 
          <rect x="100" y="40" rx="3" ry="3" width="120" height="20" /> 
          <rect x="100" y="75" rx="3" ry="3" width="145" height="20" /> 
          <rect x="100" y="105" rx="3" ry="3" width="180" height="20" />
          <rect x="0" y="0" rx="0" ry="0" width="80" height="130" /> 
        </ContentLoader>
      </div>
    </div>

    <!-- Message d'erreur si l'API ne répond pas -->
    <p v-if="apiError" class="text-red-600 font-semibold mt-2">
      *Erreur, une erreur s'est produite. Veuillez réessayer plus tard.*
    </p>

    <!-- Message si aucun livre n'est trouvé -->
    <p v-if="!isLoading && !books.length && !apiError" class="text-gray-500 mt-2">
      Aucun livre trouvé pour cette catégorie.
    </p>

    <!-- Loader pendant le chargement -->
    <div v-if="isLoading" class="grid lg:grid-cols-4 lg:gap-4 grid-cols-2 gap-2 m-1">
      <div v-for="n in 8" :key="n" class="p-4 bg-gray-200 rounded-lg">
        <ContentLoader 
          speed="2"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="100" y="10" rx="3" ry="3" width="150" height="20" /> 
          <rect x="100" y="40" rx="3" ry="3" width="120" height="20" /> 
          <rect x="100" y="75" rx="3" ry="3" width="145" height="20" /> 
          <rect x="100" y="105" rx="3" ry="3" width="180" height="20" />
          <rect x="0" y="0" rx="0" ry="0" width="80" height="130" /> 
        </ContentLoader>
      </div>
    </div>

    <!-- Résultats des livres -->
    <div v-if="!isLoading && books.length" class="grid lg:grid-cols-4 lg:gap-4 grid-cols-2 gap-2">
      <div
        v-for="book in books"
        :key="book.idGutendex"
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
    <div v-if="!isLoading && books.length && totalPages >= 2 && !apiError" class="flex justify-center items-center mt-4 space-x-4">
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
</template>

<script>
import axios from "axios";
import { ContentLoader } from 'vue-content-loader';

export default {
  components: { ContentLoader },
  data() {
    return {
      books: [],
      page: 1,
      limit: 8,
      totalPages: 1,
      isLoading: false,
      apiError: false,
    };
  },
  methods: {
    async fetchBooks() {
      this.isLoading = true;
      this.apiError = false; 

      try {
        const response = await axios.get(`http://localhost:8000/book/`, {
          params: {
            page: this.page,
          },
        });

        console.log("biblio:", response.data);

        if (response.data.results) {
          this.books = response.data.results.map(book => ({
            id: book.id || book.ids ,
            title: book.title,
            author: book.author.map(a => a.name).join(", "),
            image: book.cover,
          }));

          this.totalPages = Math.ceil(response.data.count / this.limit);
        } else {
          this.books = [];
        }
      } catch (error) {
        console.error("Erreur API :", error);
        this.apiError = true;
        this.books = [];
      } finally {
        this.isLoading = false;
      }
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
    }
  },

  mounted() {
    this.fetchBooks();
  },
};
</script>
