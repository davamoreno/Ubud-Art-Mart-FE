import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Produk {
    id: number;
    nama: string;
    lantai: string;
    nomor_toko: string;
    telepon: string;
    image: string;
    link: string | null;
    status: string | null;
    created_at: string;
    updated_at: string;
}

export interface CreateProdukPayload {
    nama: string;
    lantai: string;
    nomor_toko: string;
    telepon: string;
    link: string;
    status: string;
    image: File | null; // 🔥 PENTING: gunakan File, bukan string!
}