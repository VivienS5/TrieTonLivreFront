<template>
    <div class="flex justify-center">
      <div class="max-w-lg w-full p-6 bg-white shadow-lg rounded-lg">
        <form class="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <input
            v-model="search"
            type="text"
            placeholder="Search..."
            class="w-full p-3 text-gray-700 focus:outline-none"
          />
          <button type="submit" class="bg-blue-500 p-3 text-white hover:bg-blue-600">
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21l-2-2m-6-6a8 8 0 1116 0 8 8 0 01-16 0zm14 0a6 6 0 10-12 0 6 6 0 0012 0z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
</template>

<script setup>

</script>
