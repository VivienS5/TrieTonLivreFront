<template>
  <div class="flex items-center justify-center p-4">
    <div class="max-w-md overflow-hidden">
      <div class="p-4 flex flex-col items-center">
        <img class="w-32 h-40 object-cover rounded" :src="book.image" alt="Book Cover" />
        <h3 class="mt-2 text-lg font-semibold">{{ book.author }}</h3>
        <h2 class="text-xl font-bold">{{ book.title }}</h2>
      </div>
      <div class="bg-gray-100 p-4 rounded-b-lg text-gray-700 text-sm overflow-y-auto h-48">
        {{ book.content }}
      </div>
      <div class="p-4 flex justify-between items-center">
        <button @click="prevPage" class="text-gray-700 font-bold">◀</button>
        <span class="font-bold">{{ currentPage }}/{{ totalPages }}</span>
        <button @click="nextPage" class="text-gray-700 font-bold">▶</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      book: {
        image: "https://m.media-amazon.com/images/I/41dzKqH6nAL._SY445_SX342_.jpg",
        title: "SOUL",
        author: "Olivia Wilson",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
      },
      currentPage: 2,
      totalPages: 124,
    };
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
};
</script>

<style scoped>
img {
  max-width: 100%;
  border-radius: 8px;
}
</style>