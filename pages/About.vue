<script setup lang="ts">
import { ref, onMounted } from 'vue';

// --- State Management (Reactive Data) ---
// Menggunakan ref untuk state primitif dan reactive untuk objek/array
const activeFaq = ref<number | null>(null);

const faqs = ref([
  {
    question: "Jam Operasional Pasar Seni Ubud",
    answer: "Pasar Seni Ubud umumnya buka setiap hari mulai pukul 08.00 hingga 18.00 WITA. Waktu paling ideal untuk berkunjung adalah di pagi hari saat suasana masih segar dan belum terlalu ramai."
  },
  {
    question: "Apakah pasar tetap buka saat hari libur?",
    answer: "Ya, pasar tetap buka setiap hari termasuk akhir pekan dan sebagian besar hari libur nasional. Namun, pasar akan tutup sepenuhnya pada saat Hari Raya Nyepi."
  },
  {
    question: "Apa saja yang dijual di Ubud Art Market?",
    answer: "Ubud Art Market adalah surga kerajinan tangan Bali, mulai dari tas rotan ikonik, kain tenun, ukiran kayu, lukisan, perhiasan perak, hingga topeng tradisional yang dibuat oleh seniman lokal."
  },
  {
    question: "Bagaimana cara memesan produk di sini?",
    answer: "Untuk memesan produk, Anda cukup mencari produk yang diinginkan. Setelah menemukan produk yang cocok, tekan tombol “Pesan Sekarang” untuk langsung terhubung dengan penjual melalui WhatsApp. Anda juga bisa memberikan ulasan dan rating setelahnya."
  }
]);

const highlightItems = ref([
  {
    image: 'https://placehold.co/600x800/22c55e/ffffff?text=Souvenir',
    title: 'Souvenir Khas',
    description: 'Bawa pulang kenangan yang bukan hanya cantik, tapi juga sarat akan nilai budaya. Setiap barang mencerminkan tradisi, keahlian, dan jiwa Bali.'
  },
  {
    image: 'https://placehold.co/600x800/16a34a/ffffff?text=Tradisi',
    title: 'Tradisi dan Budaya',
    description: 'Nikmati kekayaan seni Bali yang tercermin dalam setiap produk. Temukan karya yang menggabungkan nilai tradisional dengan sentuhan kreatif para pengrajin Ubud.'
  },
  {
    image: 'https://placehold.co/600x800/15803d/ffffff?text=Interaksi',
    title: 'Interaksi Hangat',
    description: 'Rasakan pengalaman berbelanja khas pasar tradisional. Proses tawar-menawar bukan sekadar transaksi, tapi interaksi yang hangat dan menyenangkan dengan para pedagang lokal.'
  }
]);

// --- Methods ---
const toggleFaq = (index: number) => {
  activeFaq.value = activeFaq.value === index ? null : index;
};

// --- Lifecycle Hooks & DOM Manipulation ---
onMounted(() => {
  // Intersection Observer untuk animasi fade-in saat elemen masuk ke viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target); // Hentikan observasi setelah animasi berjalan
      }
    });
  }, {
    threshold: 0.1 // Picu animasi saat 10% elemen terlihat
  });

  const elementsToAnimate = document.querySelectorAll('.reveal');
  elementsToAnimate.forEach((el) => observer.observe(el));
});
</script>

<template>
  <div class="container-snap">

    <!-- Section 1: Hero -->
    <section class="snap-center h-screen w-screen flex flex-col items-center justify-center text-center bg-emerald-50 text-slate-800 p-4">
      <div class="reveal">
        <h1 class="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          Seni yang Lahir dari Warisan.
        </h1>
        <h2 class="text-3xl md:text-5xl font-light mb-6 text-emerald-700">
          Tumbuh dalam Keaslian.
        </h2>
        <p class="text-base md:text-lg max-w-2xl mx-auto mb-8 font-light">
          Dari anyaman tangan hingga lukisan bernilai sejarah, setiap produk menyimpan nilai estetika, spiritualitas, dan filosofi budaya Bali yang mendalam.
        </p>
        <a href="#tentang-ubud" class="group inline-flex flex-col items-center text-emerald-800 hover:text-emerald-600 transition-colors duration-300">
          <span class="font-semibold tracking-wider">JELAJAHI</span>
          <svg class="w-8 h-8 mt-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </a>
      </div>
    </section>

    <!-- Section 2: Tentang & Sejarah -->
    <section id="tentang-ubud" class="snap-center h-screen w-screen flex items-center justify-center bg-white p-6 md:p-12">
      <div class="container mx-auto">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="reveal">
            <img src="https://placehold.co/800x600/e5e7eb/333333?text=Pasar+Ubud" alt="Suasana Pasar Seni Ubud" class="rounded-2xl shadow-2xl w-full h-auto object-cover" />
          </div>
          <div class="reveal">
            <h2 class="text-lg font-semibold text-emerald-600 tracking-widest mb-2">TENTANG KAMI</h2>
            <h3 class="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Jantung Kesenian Bali</h3>
            <p class="text-slate-600 mb-4">
              Sejak awal abad ke-20, pasar ini telah menjadi saksi bagaimana seni tradisional Bali berkembang, bertahan di tengah modernitas tanpa kehilangan akarnya. Pengunjung datang bukan hanya untuk berbelanja, tapi untuk merasakan keaslian.
            </p>
            <p class="text-slate-600">
              Didirikan sekitar tahun 1800-an bersamaan dengan Puri Ubud, pasar ini adalah pusat kehidupan dan denyut nadi kreativitas masyarakat Ubud.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Highlights -->
    <section class="snap-center h-screen w-screen flex flex-col items-center justify-center bg-emerald-50 p-6 md:p-12">
       <div class="text-center mb-12 reveal">
          <h2 class="text-lg font-semibold text-emerald-600 tracking-widest mb-2">PENGALAMAN UNIK</h2>
          <h3 class="text-3xl md:text-4xl font-bold text-slate-800">Apa yang Anda Temukan di Sini?</h3>
       </div>
       <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(item, index) in highlightItems" :key="index" class="group relative overflow-hidden rounded-2xl shadow-lg reveal">
            <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" :src="item.image" :alt="item.title" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-6 text-white">
              <h4 class="text-2xl font-bold mb-2 transition-transform duration-300 group-hover:-translate-y-16">{{ item.title }}</h4>
              <p class="opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-sm font-light">{{ item.description }}</p>
            </div>
          </div>
       </div>
    </section>

    <!-- Section 4: FAQ -->
    <section class="snap-center h-screen w-screen flex items-center justify-center bg-white p-6 md:p-12">
      <div class="container max-w-4xl mx-auto">
        <div class="text-center mb-12 reveal">
           <h2 class="text-lg font-semibold text-emerald-600 tracking-widest mb-2">BUTUH BANTUAN?</h2>
           <h3 class="text-3xl md:text-4xl font-bold text-slate-800">Pertanyaan Umum</h3>
        </div>
        <div class="space-y-4 reveal">
          <div v-for="(item, index) in faqs" :key="index" class="border border-slate-200 rounded-lg overflow-hidden">
            <button @click="toggleFaq(index)" class="w-full p-5 text-left flex justify-between items-center hover:bg-slate-50 transition-colors duration-200">
              <span class="font-semibold text-slate-700">{{ item.question }}</span>
              <svg :class="{'rotate-180': activeFaq === index}" class="w-5 h-5 text-emerald-500 transform transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <transition name="faq">
              <div v-show="activeFaq === index">
                <p class="p-5 pt-0 text-slate-600 text-sm font-light">{{ item.answer }}</p>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Section 5: Kontak & Peta -->
    <section class="snap-center h-screen w-screen flex items-center justify-center bg-emerald-900 text-white p-6 md:p-12">
        <div class="container mx-auto">
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div class="reveal">
                    <h2 class="text-lg font-semibold text-emerald-300 tracking-widest mb-2">KUNJUNGI KAMI</h2>
                    <h3 class="text-3xl md:text-4xl font-bold mb-4">Temukan Lokasi Kami</h3>
                    <p class="text-emerald-200 mb-2">
                        Jl. Raya Ubud No.35, Ubud, Kecamatan Ubud, Kabupaten Gianyar, Bali 80571
                    </p>
                    <p class="text-emerald-300 font-light mb-6">
                        Punya pertanyaan atau saran? Kami siap mendengarkan. Silakan hubungi kami melalui formulir di samping.
                    </p>
                </div>
                <div class="reveal">
                    <form class="space-y-4">
                        <input type="email" placeholder="Alamat Email Anda" required class="w-full px-4 py-3 bg-emerald-800 border border-emerald-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-emerald-400" />
                        <textarea rows="4" placeholder="Tulis pesan Anda di sini..." required class="w-full px-4 py-3 bg-emerald-800 border border-emerald-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none placeholder-emerald-400"></textarea>
                        <button type="submit" class="w-full bg-white text-emerald-900 font-bold px-6 py-3 rounded-md hover:bg-emerald-100 transition duration-300">
                            Kirim Pesan
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>

  </div>
</template>

<style>
/* --- Scroll Snapping & Styling --- */
html {
  scroll-behavior: smooth;
}

.container-snap {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
}

.snap-center {
  scroll-snap-align: center;
  flex-shrink: 0;
}

/* --- Animasi FAQ --- */
.faq-enter-active, .faq-leave-active {
  transition: all 0.3s ease-in-out;
  max-height: 100px;
}
.faq-enter-from, .faq-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

/* --- Animasi Reveal on Scroll --- */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.reveal.animate-in {
  opacity: 1;
  transform: translateY(0);
}
</style>
