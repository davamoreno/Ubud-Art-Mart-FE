<template>
    <form action="">
        <div class="flex flex-row w-[1340px] h-[752px] p-[30px] mt-[60px] mb-[40px] mx-auto border-2 rounded-lg">
    
            <div class="relative w-[550px] me-[50px] p-[25px] group border-2 rounded-lg">
                <img src="/assets/images/tas.png" alt="" class="w-full h-full object-cover">
                <label class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <div class="rounded-2xl border-2 p-[5px]">
                        <p>Pilih Gambar</p>
                        <input type="file" class="hidden" />
                    </div>
                </label>
            </div>

            <div class="w-[692px] my-[41px] border-2 rounded-lg p-[20px]">
                <div class="flex flex-row">
                    <div>
                        <h1 class="font-semibold text-2xl mb-[12px]">Toko</h1>

                        <label class="mb-[8px] text-sm text-gray-500">Nama Toko</label>
                        <input type="text" value="Toko Anyaman"
                            class="px-[21px] py-[12px] rounded-lg border-2 w-full mb-[14px] opacity-50">

                        <label class="mb-[8px] text-sm text-gray-500">No Telepon</label>
                        <input type="text" value="08123456789"
                            class="px-[21px] py-[12px] rounded-lg border-2 w-full mb-[14px] opacity-50">

                        <label class="mb-[8px] text-sm text-gray-500">Deskripsi Toko</label>
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

        <div class="w-full px-[30px] mb-[80px]">
            <h2 class="text-xl font-semibold mb-4 text-gray-800">Daftar Produk</h2>
            <div class="overflow-x-auto rounded-lg shadow-md border border-gray-200">
                <table class="min-w-full bg-white">
                    <thead class="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                        <tr>
                            <th class="px-6 py-4 border-b text-left">No</th>
                            <th class="px-6 py-4 border-b text-left">Nama Produk</th>
                            <th class="px-6 py-4 border-b text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-700 text-sm">
                        <tr class="border-b hover:bg-gray-50 transition duration-200">
                            <td class="px-6 py-4">1</td>
                            <td class="px-6 py-4">Tas Anyaman Bali</td>
                            <td class="px-6 py-4 text-center">
                                <button
                                    class="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-4 py-1 rounded-full hover:bg-blue-200 mr-2 transition duration-150">
                                    Edit
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </form>
</template>
