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
          {{ $t("about.hero") }}
        </h1>
        <h2 class="text-3xl md:text-5xl font-light mb-6 text-emerald-700">
          {{ $t("about.hero2") }}
        </h2>
        <p class="text-base md:text-lg max-w-2xl mx-auto mb-8 font-light">
          {{ $t("about.subtitle") }}
        </p>
        <a href="#tentang-ubud" class="group inline-flex flex-col items-center text-emerald-800 hover:text-emerald-600 transition-colors duration-300">
          <span class="font-semibold tracking-wider">{{ $t("about.cta") }}</span>
          <svg class="w-8 h-8 mt-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </a>
      </div>
    </section>

    <!-- Section 2: Tentang & Sejarah -->
    <section id="tentang-ubud" class="snap-center h-screen w-screen flex items-center justify-center bg-white p-6 md:p-12">
      <div class="container mx-auto">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="reveal">
            <img src="/assets/images/suasana_ubud.jpg" alt="Suasana Pasar Seni Ubud" class="rounded-2xl shadow-2xl w-full h-auto object-cover" />
          </div>
          <div class="reveal">
            <h2 class="text-lg font-semibold text-emerald-600 tracking-widest mb-2">{{ $t("about.sectiontitle") }}</h2>
            <h3 class="text-3xl md:text-4xl font-bold text-slate-800 mb-4">{{ $t("about.section") }}</h3>
            <p class="text-slate-600 mb-4">
              {{ $t("about.subsection") }}
            </p>
            <p class="text-slate-600 mb-4">
              {{ $t("about.subsection2") }}
            </p>
            <p class="text-slate-600 mb-4">
              {{ $t("about.subsection3") }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Highlights -->
    <section class="snap-center h-screen w-screen flex flex-col items-center justify-center bg-emerald-50 p-6 md:p-12">
       <div class="text-center mb-12 reveal">
          <h2 class="text-lg font-semibold text-emerald-600 tracking-widest mb-2">{{ $t("about.sectiontitle2") }}</h2>
          <h3 class="text-3xl md:text-4xl font-bold text-slate-800">{{ $t("about.section") }}</h3>
       </div>
       <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

          <div class="group relative overflow-hidden rounded-2xl shadow-lg reveal">
            <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="/assets/images/souvenir.jpeg" alt="" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-6 text-white">
              <h4 class="text-2xl font-bold mb-3 transition-transform duration-300 group-hover:-translate-y-16">{{ $t("about.cardtitle") }}</h4>
              <p class="opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-sm font-light">{{ $t("about.subcard") }}</p>
            </div>
          </div>

          <div class="group relative overflow-hidden rounded-2xl shadow-lg reveal">
            <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="/assets/images/tradisiubud.jpeg" alt="" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-6 text-white">
              <h4 class="text-2xl font-bold mb-3 transition-transform duration-300 group-hover:-translate-y-16">{{ $t("about.cardtitle2") }}</h4>
              <p class="opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-sm font-light">{{ $t("about.subcard2") }}</p>
            </div>
          </div>

          <div class="group relative overflow-hidden rounded-2xl shadow-lg reveal">
            <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="/assets/images/interaksiubud.jpeg" alt="" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-6 text-white">
              <h4 class="text-2xl font-bold transition-transform duration-300 group-hover:-translate-y-16">{{ $t("about.cardtitle3") }}</h4>
              <p class="opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-sm font-light">{{ $t("about.subcard3") }}</p>
            </div>
          </div>
       </div>
    </section>

    <!-- Section 4: FAQ -->
    <section class="snap-center h-screen w-screen flex items-center justify-center bg-white p-6 md:p-12">
      <div class="container max-w-4xl mx-auto">
        <div class="text-center mb-12 reveal">
           <h2 class="text-lg font-semibold text-emerald-600 tracking-widest mb-2">{{ $t("about.sectiontitle3") }}</h2>
           <h3 class="text-3xl md:text-4xl font-bold text-slate-800">{{ $t("about.section3") }}</h3>
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
        <div class="grid md:grid-cols-2 gap-12 items-start">
            
            <div class="reveal">
                <h2 class="text-lg font-semibold text-emerald-300 tracking-widest mb-2">{{ $t("about.sectiontitle4") }}</h2>
                <h3 class="text-3xl md:text-4xl font-bold mb-4">{{ $t("about.section4") }}</h3>
                <p class="text-emerald-200 mb-2">
                    {{ $t("about.subsection4") }}
                </p>
                <p class="text-emerald-300 font-light mb-8">
                    {{ $t("about.subsection5") }}
                </p>

                <form class="space-y-4">
                    <input type="email" :placeholder="$t('about.formplaceholder')" required class="w-full px-4 py-3 bg-emerald-800 border border-emerald-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-emerald-400" />
                    <input type="text" :placeholder="$t('about.formplaceholder2')" class="w-full px-4 py-3 bg-emerald-800 border border-emerald-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-emerald-400" />
                    <textarea rows="4" :placeholder="$t('about.formplaceholder3')" required class="w-full px-4 py-3 bg-emerald-800 border border-emerald-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none placeholder-emerald-400"></textarea>
                    <button type="submit" class="w-full bg-white text-emerald-900 font-bold px-6 py-3 rounded-md hover:bg-emerald-100 transition duration-300">
                        {{ $t("about.buttonsubmit") }}
                    </button>
                </form>
            </div>

            <div class="reveal w-full h-96 md:h-full min-h-[450px]">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.919843479883!2d115.26297249999999!3d-8.5071639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd23de2db450aa1%3A0x409d0777de9a0ded!2sPasar%20Seni%20Ubud!5e0!3m2!1sid!2sid!4v1750421987385!5m2!1sid!2sid" 
                    width="100%" 
                    height="100%" 
                    style="border:0;" 
                    allowfullscreen="true" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade"
                    class="rounded-lg shadow-2xl">
                </iframe>
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
