<template>
    <div class="relative">
        <img src="@/assets/images/bg.png" alt="" class="object-cover bg-center w-full h-[400px]" />
        <div class="container mx-auto max-w-[90%] py-20 absolute top-0 left-1/2 -translate-x-1/2 items-center h-full">
            <div class="flex flex-col">
                <div class="w-2/4">
                    <h1 class="text-3xl font-bold mb-3 text-white drop-shadow">RASAKAN KEAJAIBAN KARYA LOKAL</h1>
                    <h2 class="text-3xl font-bold mb-5 text-white drop-shadow">PASAR KESENIAN UBUD</h2>
                    <p class="font-medium text-white mb-8">Pasar Kesenian Ubud kini hadir secara digital untuk
                        memudahkan
                        anda
                        menjelajahi berbagai produk seni khas Bali. Temukan beragam karya unik dari seniman dan
                        pengrajin lokal.
                    </p>
                    <form>
                        <button
                            class="rounded-full bg-transparent text-white border border-white px-6 py-2 hover:bg-[#FFB800]/80 transition duration-300 ease-in-out">
                            Jelajahi Katalog
                        </button>
                    </form>
                </div>
            </div>

            <div class="pt-[150px]">
                <h1 class="text-3xl font-bold mb-8">Berita & Acara</h1>
                <div class="flex flex-row">
                    <div class="w-4/6">
                        <img src="/assets/images/contoh.png" alt="Pasar Seni Ubud Kebakaran"
                            class="w-full h-full object-cover">
                    </div>
                    <div class="relative w-2/4 p-5 my-5 ms-[50px] me-[120px] rounded-3xl drop-shadow-lg bg-white">
                        <div class="container h-auto">
                            <h2 class="text-2xl font-semibold mb-2">Pasar Seni Ubud Kebakaran, Pedagang Akan Direlokasi
                            </h2>
                            <p class="font-medium mb-4">Pasar Seni Ubud, Kabupaten Gianyar, Bali, pada Sabtu (17/8/2024)
                                siang. Menindaklanjuti insiden ini, pemerintah setempat saat ini fokus untuk rencana
                                relokasi pedagang.</p>
                            <div class="absolute bottom-4 right-8">
                                <a href="#" class="font-semibold text-blue-500 hover:underline">Baca
                                    Selengkapnya →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Isikan Pagination -->
                <div class="container my-8">
                    <div class="flex justify-center space-x-2">
                        <button class="px-3 py-2 rounded-md"><img src="/assets/images/Ellipse.svg" alt=""></button>
                        <button class="px-3 py-2 rounded-md"><img src="/assets/images/Ellipse_selected.svg"
                                alt=""></button>
                        <button class="px-3 py-2 rounded-md"><img src="/assets/images/Ellipse.svg" alt=""></button>
                        <button class="px-3 py-2 rounded-md"><img src="/assets/images/Ellipse.svg" alt=""></button>
                    </div>
                </div>
            </div>

            <h1 class="text-3xl font-bold mb-8">Katalog</h1>

        </div>
    </div>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
        rel="stylesheet">
</template>
