<template>
  <div class="flex justify-center relative">
    <div class="max-w-lg w-full p-6">
      <form @submit.prevent="emitSearch" class="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white shadow-lg">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher un livre..."
          class="w-full p-3 text-gray-700 focus:outline-none"
          @input="fetchSuggestions(searchQuery)"
        />
        <button type="submit" class="bg-blue-500 p-3 text-white hover:bg-blue-600">
          🔍
        </button>
      </form>

      <!-- Affichage des suggestions sous la barre de recherche -->
      <div v-if="suggestions.length > 0 && !isSearching" class="bg-white border border-gray-300 rounded-lg shadow-lg z-10 mt-2">
        <ul>
          <li 
            v-for="(suggestion, index) in suggestions" 
            :key="index"
            @click="handleSuggestionClick(suggestion)" 
            class="cursor-pointer hover:bg-gray-200 p-2 rounded"
          >
            {{ suggestion }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: "",
      suggestions: [],
      isSearching: false,
    };
  },
  methods: {
    async fetchSuggestions(query) {
      if (!query) {
        this.suggestions = [];
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:8000/book/suggest_words/`, {
          params: { q: query },
        });
        this.suggestions = response.data.suggestions;
      } catch (error) {
        console.error("Erreur lors de la récupération des suggestions:", error);
        this.suggestions = [];
      }
    },

    handleSuggestionClick(suggestion) {
      this.searchQuery = suggestion;
      this.isSearching = true;
      this.$emit('search', suggestion);
      this.fetchSuggestions(suggestion);
    },

    emitSearch() {
      this.isSearching = true;
      this.$emit('search', this.searchQuery);
      this.fetchSuggestions(this.searchQuery);
    }
  },
};
</script>

<style scoped>
li:hover {
  background-color: #f7fafc; 
}
</style>
