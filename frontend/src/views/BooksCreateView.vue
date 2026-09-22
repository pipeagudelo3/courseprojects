<script setup lang="ts">
import { ref } from 'vue';
import { BookService } from '@/services/BookService.js';
import type { CreateBookDTO } from '@/dtos/CreateBookDTO.js';

const title = ref('');
const category = ref('');
const price = ref(0);
const stock = ref(0);
const successMessage = ref('');

async function submitForm() {
  const newBook: CreateBookDTO = {
    title: title.value,
    category: category.value,
    price: price.value,
    stock: stock.value,
  };

  try {
    await BookService.createBook(newBook);

    successMessage.value = 'Book created successfully!';

    title.value = '';
    category.value = '';
    price.value = 0;
    stock.value = 0;
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <section class="max-w-2xl mx-auto py-8">
    <h2 class="text-2xl font-bold text-gray-800 mb-8">
      Create a New Book
    </h2>

    <form
      class="bg-white rounded-lg shadow-md p-8 space-y-6"
      @submit.prevent="submitForm"
    >
      <!-- Title -->
      <div>
        <label
          for="title"
          class="block text-gray-700 font-semibold mb-2"
        >
          Title
        </label>

        <input
          id="title"
          v-model="title"
          type="text"
          name="title"
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          required
          placeholder="Book Title"
        />
      </div>

      <!-- Category -->
      <div>
        <label
          for="category"
          class="block text-gray-700 font-semibold mb-2"
        >
          Category
        </label>

        <input
          id="category"
          v-model="category"
          type="text"
          name="category"
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          required
          placeholder="Category"
        />
      </div>

      <!-- Price -->
      <div>
        <label
          for="price"
          class="block text-gray-700 font-semibold mb-2"
        >
          Price
        </label>

        <input
          id="price"
          v-model.number="price"
          type="number"
          name="price"
          min="0"
          step="0.01"
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          required
          placeholder="0.00"
        />
      </div>

      <!-- Stock -->
      <div>
        <label
          for="stock"
          class="block text-gray-700 font-semibold mb-2"
        >
          Stock
        </label>

        <input
          id="stock"
          v-model.number="stock"
          type="number"
          name="stock"
          min="0"
          step="1"
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          required
          placeholder="0"
        />
      </div>

      <!-- Submit -->
      <div class="pt-4">
        <button
          type="submit"
          class="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition"
        >
          Create Book
        </button>
      </div>

      <!-- Success message -->
      <p
        v-if="successMessage"
        class="text-green-600 mt-4"
      >
        {{ successMessage }}
      </p>
    </form>
  </section>
</template>