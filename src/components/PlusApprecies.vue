<template>
  <div>
    <h1 class="text-3xl font-semibold mt-4 font-curlz bg-[#a9a9a9]">Les plus appréciés</h1>

    <!-- Résultats des livres -->
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
        console.log("Books:", response.data);

        this.books = response.data.map(book => ({
          id: book.ids,
          title: book.title,
          author: book.author,
          image: book.cover,
        }));

      } catch (error) {
        console.error("Erreur API :", error);
      }
    },
    
    goToBook(book) {
      console.log("Livre sélectionné :", book);

      if (book && book.id) {
        this.$router.push({ name: "lecture", params: { id: book.id } });
      } else {
        console.error("Le livre n'a pas d'ID valide.");
      }
    },
  },

  mounted() {
    this.fetchBooks();
  },
};
</script>
