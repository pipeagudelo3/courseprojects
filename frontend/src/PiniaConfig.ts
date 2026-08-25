import { createPinia } from 'pinia';
import { watch } from 'vue';

import { bookSeeder } from '@/stores/bookseeder';
import { reviewSeeder } from '@/stores/reviewseeder';

export default class PiniaConfig {
  public static init() {
    const pinia = createPinia();

    const savedState = localStorage.getItem('piniaState');

    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);

        pinia.state.value = {
          book: {
            books: parsedState.book?.books ?? bookSeeder,
          },
          review: {
            reviews: parsedState.review?.reviews ?? reviewSeeder,
          },
        };
      } catch {
        pinia.state.value = {
          book: {
            books: bookSeeder,
          },
          review: {
            reviews: reviewSeeder,
          },
        };
      }
    } else {
      pinia.state.value = {
        book: {
          books: bookSeeder,
        },
        review: {
          reviews: reviewSeeder,
        },
      };
    }

    localStorage.setItem(
      'piniaState',
      JSON.stringify(pinia.state.value),
    );

    watch(
      pinia.state,
      (state) => {
        localStorage.setItem(
          'piniaState',
          JSON.stringify(state),
        );
      },
      { deep: true },
    );

    return pinia;
  }
}