<template>
  <div>
    <h1 class="text-3xl font-semibold mt-4 font-curlz">Les plus appréciés</h1>

    <!-- Résultats de recherche -->
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

    <!-- Message si aucun résultat -->
    <p v-else class="text-gray-500 mt-4">Aucun résultat pour le mot "solicitation".</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      books: [],
    };
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await axios.get(`http://localhost:8000/book/search?word=solicitation`);
        this.books = response.data.map(book => ({
          id: book.id,
          title: book.title,
          author: book.author,
          image: book.cover, // Assurez-vous que la propriété `cover` contient l'URL de l'image
        }));
      } catch (error) {
        console.error("Erreur API :", error);
      }
    },
    goToBook(bookId) {
      this.$router.push({ name: "lecture", params: { id: bookId } });
    },
  },
  mounted() {
    this.fetchBooks(); // Appel de la méthode pour charger les livres dès que le composant est monté
  },
};
</script>
