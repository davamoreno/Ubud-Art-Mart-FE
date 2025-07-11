import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useNuxtApp } from '#imports';

// --- INTERFACES & TYPES ---
// Mendefinisikan bentuk data dari API kita
export interface Review {
  id: number;
  rating: number;
  komentar: string;
  created_at: string;
  user: {
    name: string;
  };
}

// Tipe data untuk payload saat mengirim review baru
export interface SubmitReviewPayload {
  rating: number;
  komentar: string;
}

// Tipe data untuk filter dan sorting
export interface ReviewFilters {
  sort?: 'newest' | 'oldest' | 'highest' | 'lowest';
  ratings?: number[];
  page?: number;
}

// --- PINIA STORE DEFINITION ---
export const useReviewStore = defineStore('review', () => {
  // --- STATE ---
  const reviews = ref<Review[]>([]);
  const paginationMeta = ref<any>({});
  const loading = ref(false);
  const error = ref<any>(null);

  const { $api } = useNuxtApp();

  // --- ACTIONS (METHODS) ---

  /**
   * Mengambil daftar review untuk sebuah produk, dengan dukungan filter, sorting, dan pagination.
   * @param {string | number} productId - ID dari produk yang reviewnya ingin diambil.
   * @param {ReviewFilters} filters - Objek berisi parameter query.
   */
  async function fetchReviews(productId: string | number, filters: ReviewFilters = {}) {
    loading.value = true;
    error.value = null;

    const params = new URLSearchParams();
    if (filters.sort) params.append('sort', filters.sort);
    if (filters.ratings && filters.ratings.length > 0) {
      filters.ratings.forEach(r => params.append('ratings[]', String(r)));
    }
    if (filters.page) params.append('page', String(filters.page));

    try {
      const response = await $api<{ data: Review[], meta: any }>(`produk/${productId}/reviews?${params.toString()}`);
      
      // Untuk review, biasanya kita ganti seluruh list saat filter berubah, bukan menambahkan.
      reviews.value = response.data;
      paginationMeta.value = response.meta;

    } catch (e) {
      error.value = e;
      reviews.value = []; // Kosongkan review jika ada error
      console.error('Failed to fetch reviews:', e);
    } finally {
      loading.value = false;
    }
  }

  /**
   * Mengirim ulasan baru untuk sebuah produk.
   * @param {string | number} productId - ID produk yang diberi ulasan.
   * @param {SubmitReviewPayload} payload - Data ulasan baru.
   */
  async function submitReview(productId: string | number, payload: SubmitReviewPayload) {
    loading.value = true;
    error.value = null;
    try {
      await $api(`customer/review/${productId}`, {
        method: 'POST',
        body: payload
      });
      // Setelah berhasil, panggil fetchReviews lagi untuk menyegarkan daftar review
      await fetchReviews(productId, { sort: 'newest' }); // Ambil data terbaru
    } catch (e) {
      error.value = e;
      console.error('Failed to submit review:', e);
      throw e; // Lemparkan error agar bisa ditangani di komponen
    } finally {
      loading.value = false;
    }
  }

  // Kembalikan semua state dan action
  return {
    reviews,
    paginationMeta,
    loading,
    error,
    fetchReviews,
    submitReview,
  };
});
