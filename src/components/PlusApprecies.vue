<template>
  <h1 class="text-3xl font-semibold mt-4 font-curlz">Les plus appréciés</h1>
  <div class="grid lg:grid-cols-4 lg:gap-4 grid-cols-2 gap-2 ">

    <div
      v-for="book in filteredBooks"
      :key="book.id"
      @click="goToBook(book.id)"
      class="flex items-center my-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg font-curlz text-xl"  >
      <img :src="book.image" alt="book cover" class="w-16 h-16 rounded" />
      <div class="ml-4">
        <p class="font-bold">{{ book.title }}</p>
        <p class="text-sm text-gray-500">{{ book.author }}</p>
      </div>
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
