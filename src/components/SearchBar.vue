<template>
  <div class="flex justify-center">
    <div class="max-w-lg w-full p-6">
      <form @submit.prevent="emitSearch" class="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white shadow-lg">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher un livre..."
          class="w-full p-3 text-gray-700 focus:outline-none"
        />
        <button type="submit" class="bg-blue-500 p-3 text-white hover:bg-blue-600">
          🔍
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    emitSearch() {
      this.$emit("search", this.searchQuery); // Émet l'événement vers le parent
    },
  },
};
</script>
