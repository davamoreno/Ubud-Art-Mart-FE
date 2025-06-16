<template>
    <div>
        <div class="container mx-auto px-[50px] pt-[113px] items-center h-full">
            <div class="flex flex-row">
                <div class="w-1/4">
                    <h1 class="font-bold text-lg">
                        Filter
                    </h1>
                    <div class="mt-[22px] w-[228px] h-[338px] p-[15px] border-2 rounded-lg shadow-md">
                        <h1 class="font-bold mb-[15px] text-lg">Jenis Produk</h1>
                        <form action="" class="flex flex-col mb-[40px]">
                            <div class="flex items-center mb-[15px]">
                                <input type="checkbox" name="patung" id="" class="me-[8px]">
                                <label for="patung" class="font-bold">Patung</label>
                            </div>

                            <div class="flex items-center mb-[15px]">
                                <input type="checkbox" name="lukisan" id="" class="me-[8px] font-bold">
                                <label for="lukisan" class="font-bold">Lukisan</label>
                            </div>

                            <div class="flex items-center mb-[15px]">
                                <input type="checkbox" name="aksesoris" id="" class="me-[8px]">
                                <label for="aksesoris" class="font-bold">Aksesoris</label>
                            </div>
                        </form>
                        <h1 class="font-bold mb-[15px] text-lg">Rating</h1>
                        <form action="" class="flex flex-col">
                            <div class="flex items-center mb-[15px]">
                                <input type="checkbox" name="terendah" id="" class="me-[8px]">
                                <label for="terendah" class="font-bold">Terendah</label>
                            </div>

                            <div class="flex items-center mb-[15px]">
                                <input type="checkbox" name="tertinggi" id="" class="me-[8px] font-bold">
                                <label for="tertinggi" class="font-bold">Tertinggi</label>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="w-3/4">
                    <div
                        class="relative py-[5px] px-[10px] mb-[52px] mx-auto w-full h-[50px] border border-slate-950 rounded-3xl">
                        <div class="relative rounded-3xl w-[36px] h-[36px] bg-[#328E6E]">
                            <img src="/assets/images/search.svg" alt="" class="absolute top-2 left-2">
                        </div>
                        <div class="absolute top-0 left-[60px] w-full h-full flex items-center">
                            <form action="/query">
                                <input type="text" name="" id="" placeholder="Cari di Katalog"
                                    class="w-full h-full bg-transparent text-[#a8d4c5] placeholder:text-[#a8d4c5] focus:outline-none">
                            </form>
                        </div>
                    </div>
                    <div class="flex flex-wrap">
                        <div class="w-1/4 mb-10 hover:scale-105 transition duration-300 ease-in-out">
                            <a href="/katalogView">
                                <div class="w-[250px] h-[313px] bg-white rounded-lg shadow-xl overflow-hidden">
                                    <img src="/assets/images/katalog.png" alt="Lukisan Bali"
                                        class="w-full h-[220px] object-cover">
                                    <div class="p-4">
                                        <div class="flex justify-between items-start">

                                            <div>
                                                <h2 class="text-lg font-semibold text-gray-800">Lukisan Bali</h2>
                                                <p class="text-sm text-gray-600">Kios Pak Ketut</p>
                                            </div>


                                            <div class="flex items-center mt-4">
                                                <img src="/assets/images/Star.svg" alt="" class="h-5 w-5">
                                                <span class="ml-1 mt-1 text-sm text-gray-700 font-medium">3.9</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </a>
                        </div>


                        <div class="w-1/4 mb-10 hover:scale-105 transition duration-300 ease-in-out">
                            <a href="/katalogView">
                                <div class="w-[250px] h-[313px] bg-white rounded-lg shadow-xl overflow-hidden">
                                    <img src="/assets/images/katalog.png" alt="Lukisan Bali"
                                        class="w-full h-[220px] object-cover">
                                    <div class="p-4">
                                        <div class="flex justify-between items-start">

                                            <div>
                                                <h2 class="text-lg font-semibold text-gray-800">Lukisan Bali</h2>
                                                <p class="text-sm text-gray-600">Kios Pak Ketut</p>
                                            </div>


                                            <div class="flex items-center mt-4">
                                                <img src="/assets/images/Star.svg" alt="" class="h-5 w-5">
                                                <span class="ml-1 mt-1 text-sm text-gray-700 font-medium">3.9</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </a>
                        </div>

                        <div class="w-1/4 mb-10 hover:scale-105 transition duration-300 ease-in-out">
                            <a href="/katalogView">
                                <div class="w-[250px] h-[313px] bg-white rounded-lg shadow-xl overflow-hidden">
                                    <img src="/assets/images/katalog.png" alt="Lukisan Bali"
                                        class="w-full h-[220px] object-cover">
                                    <div class="p-4">
                                        <div class="flex justify-between items-start">

                                            <div>
                                                <h2 class="text-lg font-semibold text-gray-800">Lukisan Bali</h2>
                                                <p class="text-sm text-gray-600">Kios Pak Ketut</p>
                                            </div>


                                            <div class="flex items-center mt-4">
                                                <img src="/assets/images/Star.svg" alt="" class="h-5 w-5">
                                                <span class="ml-1 mt-1 text-sm text-gray-700 font-medium">3.9</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </a>
                        </div>

                        <div class="w-1/4 mb-10 hover:scale-105 transition duration-300 ease-in-out">
                            <a href="/katalogView">
                                <div class="w-[250px] h-[313px] bg-white rounded-lg shadow-xl overflow-hidden">
                                    <img src="/assets/images/katalog.png" alt="Lukisan Bali"
                                        class="w-full h-[220px] object-cover">
                                    <div class="p-4">
                                        <div class="flex justify-between items-start">

                                            <div>
                                                <h2 class="text-lg font-semibold text-gray-800">Lukisan Bali</h2>
                                                <p class="text-sm text-gray-600">Kios Pak Ketut</p>
                                            </div>


                                            <div class="flex items-center mt-4">
                                                <img src="/assets/images/Star.svg" alt="" class="h-5 w-5">
                                                <span class="ml-1 mt-1 text-sm text-gray-700 font-medium">3.9</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </a>
                        </div>

                        <div class="w-1/4 mb-10 hover:scale-105 transition duration-300 ease-in-out">
                            <a href="/katalogView">
                                <div class="w-[250px] h-[313px] bg-white rounded-lg shadow-xl overflow-hidden">
                                    <img src="/assets/images/katalog.png" alt="Lukisan Bali"
                                        class="w-full h-[220px] object-cover">
                                    <div class="p-4">
                                        <div class="flex justify-between items-start">

                                            <div>
                                                <h2 class="text-lg font-semibold text-gray-800">Lukisan Bali</h2>
                                                <p class="text-sm text-gray-600">Kios Pak Ketut</p>
                                            </div>


                                            <div class="flex items-center mt-4">
                                                <img src="/assets/images/Star.svg" alt="" class="h-5 w-5">
                                                <span class="ml-1 mt-1 text-sm text-gray-700 font-medium">3.9</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
        rel="stylesheet">
</template>
