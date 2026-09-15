<script setup lang="ts">
import { computed, ref } from 'vue';
import { BookService } from '@/services/BookService.js';
import { formatToCOP } from '@/utils/formatters.js';

const books = BookService.getBooks();

const selectedCategory = ref('');
const successMessage = ref('');

const selectorCategories = computed(() => BookService.getUniqueBookCategories());

const filteredBooks = computed(() => {
  if (!selectedCategory.value) {
    return books;
  }

  return books.filter((book) => book.category === selectedCategory.value);
});

function deleteLastBook(): void {
  const deletedBook = BookService.deleteLastBook();

  if (!deletedBook) {
    return;
  }

  successMessage.value = `Book "${deletedBook.title}" deleted successfully!`;

  setTimeout(() => {
    successMessage.value = '';
  }, 3000);
}
</script>

<template>
  <section>
    <div class="max-w-7xl mx-auto">
      <!-- Actions -->
      <div class="flex justify-end gap-3 mb-4">
        <button
          type="button"
          :disabled="books.length === 0"
          class="bg-red-600 text-white font-semibold px-5 py-2 rounded hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          @click="deleteLastBook"
        >
          Delete Last Book
        </button>

        <RouterLink
          to="/books/create"
          class="bg-blue-600 text-white font-semibold px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add Book
        </RouterLink>
      </div>

      <!-- Success message -->
      <div
        v-if="successMessage"
        class="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded"
      >
        <i class="fas fa-check-circle mr-2"></i>
        {{ successMessage }}
      </div>

      <!-- Category filter -->
      <div class="mb-6">
        <select
          v-model="selectedCategory"
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">All Categories</option>

          <option v-for="category in selectorCategories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <!-- Books -->
      <div
        v-if="filteredBooks.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <div v-for="book in filteredBooks" :key="book.id">
          <div
            class="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 p-6 border border-gray-200"
          >
            <!-- Title and stock -->
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-xl font-semibold text-gray-800">
                {{ book.title }}
              </h3>

              <span
                v-if="book.stock > 0"
                class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full ml-2"
              >
                {{ book.stock }} available
              </span>

              <span v-else class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full ml-2">
                Not available
              </span>
            </div>

            <!-- Book image -->
            <div class="flex justify-center mb-4">
              <img
                src="https://picsum.photos/seed/picsum/536/354"
                alt="Book Cover"
                class="object-cover rounded shadow-sm w-full h-auto"
              />
            </div>

            <!-- Category -->
            <p class="text-gray-500 text-sm mb-3">
              <i class="fas fa-tag mr-2"></i>
              {{ book.category }}
            </p>

            <!-- Price -->
            <div class="bg-gray-50 rounded-lg p-3 mb-4">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600"> Price: </span>

                <span class="font-semibold"> ${{ formatToCOP(book.price) }} </span>
              </div>
            </div>

            <!-- More info -->
            <div class="flex justify-center">
              <RouterLink
                :to="`/books/${book.id}`"
                class="bg-blue-100 hover:bg-blue-200 text-blue-600 font-semibold py-2 px-3 rounded transition duration-300"
              >
                More info
                <i class="fas fa-info-circle"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <!-- No books -->
      <div v-else class="text-center text-gray-500 py-8">No books found.</div>
    </div>
  </section>
</template>
