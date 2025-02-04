<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-2xl font-bold m-4">TrieTonLivre</h1>

    <!-- SearchBar début -->
    <SearchBar @search="handleSearch" />
    <!-- SearchBar fin -->

    <h2 class="text-xl font-semibold mt-4">Les plus appréciés</h2>
    <div v-for="book in filteredBooks" :key="book.id" class="flex items-center my-2">
      <img :src="book.image" alt="book cover" class="w-16 h-16 rounded" />
      <div class="ml-4">
        <p class="font-bold">{{ book.title }}</p>
        <p class="text-sm text-gray-500">{{ book.author }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";

export default {
  components: {
    SearchBar 
  },
  data() {
    return {
      search: "",
      books: [
        { id: 1, title: "SOUL", author: "Olivia Wilson", image: "image.png" },
        { id: 2, title: "HORIZON", author: "James Smith", image: "image.png" },
        { id: 3, title: "DREAMS", author: "Emma Johnson", image: "image.png" },
        { id: 4, title: "NIGHTFALL", author: "Liam Brown", image: "image.png" }
      ]
    };
  },
  computed: {
    filteredBooks() {
      return this.books.filter(book =>
        book.title.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
};
</script>

<style scoped>
input {
  outline: none;
}
</style>
