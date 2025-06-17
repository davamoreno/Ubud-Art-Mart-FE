<template>
    <div class="flex flex-row w-[1340px] h-[752px] p-[30px] mt-[60px] mb-[357px] mx-auto border-2 rounded-lg">
        <div class="w-[550px] me-[50px] p-[25px] border-2 rounded-lg">
            <img src="/assets/images/tas.png" alt="" class="w-full h-full object-cover">
        </div>

        <div class="w-[692px] my-[41px] border-2 rounded-lg p-[20px]">
            <div class="flex flex-row">
                <div class="w-1/2 pe-[23px] border-r-2">
                    <h1 class="font-semibold text-2xl mb-[12px]">Produk</h1>

                    <label class="mb-[8px] text-sm text-gray-500">Nama Produk</label>
                    <input type="text" value="Tas Anyaman"
                        class="px-[21px] py-[12px] rounded-lg border-2 w-full mb-[14px] opacity-50">

                    <label class="mb-[8px] text-sm text-gray-500">Tag Produk</label>
                    <div class="flex flex-col mb-[14px] relative tag-dropdown">
                        <div @click="toggleTagDropdown"
                            class="w-full border rounded-lg cursor-pointer flex justify-between items-center">
                            <span class="opacity-50 px-[21px] py-[12px] ">
                                {{ selectedTags.length ? selectedTags.join(', ') : 'Pilih Tag Produk' }}
                            </span>
                        </div>
                        <div v-if="tagDropdownOpen"
                            class="absolute z-10 bg-white border mt-1 w-full rounded shadow max-h-40 overflow-y-auto">
                            <label v-for="tag in allTags" :key="tag" class="flex items-center p-2 hover:bg-gray-100">
                                <input type="checkbox" :value="tag" v-model="selectedTags" class="mr-2" />
                                {{ tag }}
                            </label>
                        </div>
                    </div>

                    <label class="mb-[8px] text-sm text-gray-500">Katalog</label>
                    <select v-model="selectedCatalog"
                        class="px-[16px] py-[12px] rounded-lg border-2 w-full mb-[14px] opacity-50">
                        <option disabled value="">Pilih Katalog</option>
                        <option v-for="catalog in allCatalogs" :key="catalog" :value="catalog">
                            {{ catalog }}
                        </option>
                    </select>

                    <label class="mb-[8px] text-sm text-gray-500">Toko</label>
                    <select v-model="selectedStore"
                        class="px-[16px] py-[12px] rounded-lg border-2 w-full mb-[14px]  opacity-50">
                        <option disabled value="">Pilih Toko</option>
                        <option v-for="store in allStores" :key="store" :value="store">
                            {{ store }}
                        </option>
                    </select>

                </div>

                <div class="w-1/2 ps-[23px]">
                    <h1 class="font-semibold text-2xl mb-[12px]">Detail</h1>

                    <label class="mb-[8px] text-sm text-gray-500">Detail Produk</label>
                    <textarea
                        class="px-[16px] py-[12px] rounded-lg border-2 w-full mb-[14px] resize-none h-[189px] opacity-50"
                        value="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae aspernatur totam at blanditiis nihil vitae numquam, cupiditate natus. Voluptatum ut magni atque cumque? Libero, autem. Reiciendis aliquam quas ea atque.">

                    </textarea>

                    <label class="mb-[8px] text-sm text-gray-500">Deskripsi</label>
                    <textarea
                        class="px-[16px] py-[12px] rounded-lg border-2 w-full mb-[14px] resize-none h-[189px] opacity-50"
                        value="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae aspernatur totam at blanditiis nihil vitae numquam, cupiditate natus. Voluptatum ut magni atque cumque? Libero, autem. Reiciendis aliquam quas ea atque.">
                    </textarea>
                </div>
            </div>

            <div class="flex flex-row">
                <button
                    class="bg-transparent rounded-3xl px-[39px] py-[10px] border-2 me-auto shadow-sm opacity-50">Kembali</button>
                <button
                    class="bg-transparent rounded-3xl px-[39px] py-[10px] border-2 me-[14px] shadow-sm opacity-50">Hapus</button>
                <button
                    class="bg-transparent rounded-3xl px-[39px] py-[10px] border-2 shadow-sm opacity-50">Simpan</button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            // Tag Produk
            tagDropdownOpen: false,
            selectedTags: [],
            allTags: ['Tas Anyaman', 'Sepatu Kulit', 'Topi Jerami', 'Aksesoris Kain'],

            // Katalog
            catalogDropdownOpen: false,
            selectedCatalog: "", // nilai default kosong untuk placeholder bekerja
            allCatalogs: ['Katalog Lokal', 'Kerajinan Tangan', 'Etnik Bali', 'Promo Bulan Ini'],

            selectedStore: "", // untuk menampung toko yang dipilih
            allStores: ['Toko Tas Anyaman', 'Toko Sepatu Kulit', 'Toko Aksesoris Bali'] // contoh daftar toko
        };
    },
    methods: {
        toggleTagDropdown() {
            this.tagDropdownOpen = !this.tagDropdownOpen;
            if (this.tagDropdownOpen) this.catalogDropdownOpen = false;
        },
        toggleCatalogDropdown() {
            this.catalogDropdownOpen = !this.catalogDropdownOpen;
            if (this.catalogDropdownOpen) this.tagDropdownOpen = false;
        },
        closeDropdowns(e) {
            // Jika klik di luar .tag-dropdown dan .catalog-dropdown, tutup dropdown
            if (!this.$el.querySelector('.tag-dropdown')?.contains(e.target)) {
                this.tagDropdownOpen = false;
            }
            if (!this.$el.querySelector('.catalog-dropdown')?.contains(e.target)) {
                this.catalogDropdownOpen = false;
            }
        }
    },
    mounted() {
        document.addEventListener('click', this.closeDropdowns);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.closeDropdowns);
    }
};
</script>
