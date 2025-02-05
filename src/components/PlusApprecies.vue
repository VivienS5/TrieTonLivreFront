<template>
  <h2 class="text-xl font-semibold mt-4">Les plus appréciés</h2>
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
</template>

<script>
export default {
  props: {
    books: Array,
    search: String
  },
  computed: {
    filteredBooks() {
      return this.books.filter(book =>
        book.title.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  methods: {
    goToBook(bookId) {
      this.$router.push({ name: "lecture", params: { id: bookId } });
    }
  }
};
</script>
