<script>
export default {
  name: 'LandingPage',
  data() {
    return {
      activeFaq: null,
      faqs: [
        {
          question: "Jam Operasional Pasar Seni Ubud",
          answer:
            "Pasar Seni Ubud umumnya buka setiap hari mulai pukul 06.00 hingga 18.00 WITA. Namun, waktu paling aktif biasanya antara pukul 08.00 hingga 17.00 WITA. Beberapa pedagang mulai menutup lapaknya lebih awal menjelang sore hari."
        },
        {
          question: "Apakah pasar tetap buka saat hari libur atau akhir pekan?",
          answer:
            "Pasar tetap buka setiap hari termasuk akhir pekan dan hari libur. Namun, pasar tutup pada hari Nyepi, hari raya besar keagamaan di Bali di mana seluruh aktivitas dihentikan."
        },
        {
          question: "Apa saja yang dijual di Ubud Art Market?",
          answer:
            "Ubud Art Market menyuguhkan berbagai kerajinan tangan autentik Bali, mulai dari tas rotan dan kain tenun, hingga ukiran kayu, lukisan, perhiasan, dan topeng tradisional yang dibuat dengan penuh keterampilan oleh para seniman lokal."
        },
        {
          question: "Bagaimana cara memesan produk di sini?",
          answer:
            "Untuk memesan produk, anda cukup mencari produk yang diinginkan melalui kolom pencarian. Anda bisa mengetikkan kata kunci, judul produk, atau konten terkait yang berhubungan dengan produk tersebut. Setelah menemukan produk yang diinginkan, anda bisa menekan tombol “Pesan Sekarang” agar langsung diarahkan ke nomor whatsapp penjual. Setelah itu anda bisa memberikan ulasan serta rating pada produk tersebut."
        }
      ],
      highlightItems: [
        {
          image: 'souvenir.jpg',
          title: 'Souvenir',
          description:
            'Temukan suvenir yang bukan hanya cantik, tapi juga punya nilai budaya. Setiap barang di sini mencerminkan tradisi, keahlian, dan jiwa Bali.'
        },
        {
          image: 'images/tradisibudaya.jpeg',
          title: 'Tradisi dan Budaya',
          description:
            'Nikmati kekayaan seni dan budaya Bali yang tercermin dalam setiap produk lokal. Temukan karya yang menggabungkan nilai tradisional dengan sentuhan kreatif para pengrajin Ubud.'
        },
        {
          image: 'images/tawar.jpg',
          title: 'Tawar Menawar',
          description:
            'Rasakan pengalaman berbelanja khas pasar tradisional Bali. Proses tawar-menawar bukan sekadar transaksi, tapi interaksi yang hangat dan menyenangkan dengan para pedagang lokal.'
        }
      ]
    };
  },
  methods: {
    scrollToSection() {
      const section = document.getElementById('tentangUbud');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    },
    toggleFaq(index) {
      this.activeFaq = this.activeFaq === index ? null : index;
    }
  },
  mounted() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    });

    const elements = document.querySelectorAll('.animate-left, .animate-right');
    elements.forEach((el) => observer.observe(el));
  }
};
</script>


<template>
  <div class="container mx-auto px-4">
    <!-- Header Section -->
    <section class="text-center py-20">
      <h1 class="text-5xl font-bold mb-6">
        Seni yang lahir dari warisan<br />tumbuh dalam keaslian.
      </h1>
      <p class="text-lg max-w-2xl mx-auto mb-6">
        Dari anyaman tangan hingga lukisan bernilai sejarah, setiap produk yang ditawarkan menyimpan nilai estetika, spiritualitas, dan filosofi budaya Bali yang mendalam.
      </p>
      <!-- Tombol Jelajahi Lebih Lanjut -->
    <div class="flex flex-col items-center gap-2">
      <button 
        @click="scrollToSection"
        class="bg-white text-black px-6 py-2 rounded-lg hover:bg-white-800 transition duration-300">
        JELAJAHI LEBIH LANJUT
      </button>

      <!-- Ikon panah bawah dengan animasi bounce -->
      <svg class="w-6 h-6 text-black animate-bounce" fill="none" stroke="currentColor" stroke-width="2"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
      <div class="mt-3">
        <i class="bi bi-chevron-down text-2xl"></i>
      </div>
    </section>

    <!-- Tentang Section -->
    <section id="tentangUbud" class="py-16 text-center group">
      <h2 class="text-green-600 text-3xl font-bold mb-6 transform transition-all duration-1000 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-10">
        Tentang Ubud Art Market
      </h2>
      <p class="max-w-3xl mx-auto text-lg transform transition-all duration-1000 delay-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-10">
        Sejak awal abad ke-20, pasar ini telah menjadi saksi bagaimana seni tradisional Bali berkembang seiring waktu, tetap bertahan di tengah modernitas tanpa kehilangan akarnya. Pengunjung dari berbagai belahan dunia datang bukan hanya untuk berbelanja, tapi untuk merasakan sesuatu yang lebih dalam: keaslian.
      </p>
    </section>

    <!-- Sejarah Section -->
    <section class="py-16 group">
      <div class="flex flex-col md:flex-row items-center gap-10">
        <!-- Gambar -->
        <img
          src="@/assets/images/ubudartmarket.png"
          alt="Patung Ubud"
          class="w-full md:w-1/2 rounded-lg shadow-md transform transition-all duration-1000 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-10"
        />
        
        <!-- Teks -->
        <div class="md:w-1/2 transform transition-all duration-1000 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-10">
          <h3 class="text-2xl font-bold text-green-600 mb-4">SEJARAH UBUD ART MARKET</h3>
          <p class="mb-4 text-lg">
            Pasar Ubud sudah berdiri sejak sekitar tahun 1800-an, bersamaan dengan pembangunan Puri Ubud di masa pemerintahan Raja Ida Tjokorde Kandel. Pasar ini didirikan untuk meningkatkan kesejahteraan masyarakat Ubud. Awalnya, transaksi di pasar menggunakan sistem barter, namun setelah mata uang dikenal, pembayaran beralih menggunakan uang.
          </p>
          <p class="text-lg">
            Sejak kedatangan gelombang pertama wisatawan yang dibawa oleh Tjokorde Agung Sukawati ke Ubud, Pasar Ubud berkembang tidak hanya menjual kebutuhan sehari-hari, tetapi juga menjajakan berbagai kerajinan tangan untuk turis. Meski begitu, fungsi utama pasar sebagai pusat pemenuhan kebutuhan masyarakat tetap berjalan.
          </p>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16">
    <div class="container mx-auto px-4">
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-center text-green-600 text-3xl font-bold mb-8">
          FAQ (FREQUENTLY ASKED QUESTIONS)
        </h2>

        <div class="space-y-4">
          <div
            v-for="(item, index) in faqs"
            :key="index"
            class="bg-white shadow rounded-lg p-4"
          >
            <button
              class="w-full text-left flex items-start justify-between font-medium focus:outline-none"
              @click="toggleFaq(index)"
            >
              <div class="flex items-center space-x-3">
                <!-- Icon panah kanan yang bisa rotate -->
                <svg
                  :class="[
                    'w-5 h-5 text-green-600 transform transition-transform duration-300',
                    activeFaq === index ? 'rotate-90' : 'rotate-0'
                  ]"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <span>{{ item.question }}</span>
              </div>

              <!-- Icon kanan (boleh kamu ganti dengan rotate juga jika mau) -->
              <i
                :class="activeFaq === index ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"
                class="text-xl text-gray-600"
              ></i>
            </button>

            <transition name="fade">
              <div
                v-show="activeFaq === index"
                class="mt-3 text-gray-700 text-sm pl-8"
              >
                {{ item.answer }}
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
    </section>

    <!-- Hovering Section -->
    <section class="py-16">
      <h2 class="text-center text-3xl font-bold text-gray-800 mb-10">
        Hal yang Bisa Dilakukan di Ubud Art Market
      </h2>

      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">

          <!-- Card Template (Souvenir) -->
          <div class="group relative w-[350px] h-[450px] overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="assets/images/souvenir.jpg" alt="Souvenir" />
            
            <!-- Overlay Green Gradient -->
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-emerald-900/90 group-hover:from-emerald-800/80 group-hover:via-emerald-800/80 group-hover:to-emerald-800/90 transition-all duration-500"></div>

            <!-- Initial Title (Bottom Left) -->
            <div class="absolute bottom-5 left-6 z-10 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4">
              <h3 class="text-2xl font-bold text-white ">Souvenir</h3>
            </div>

            <!-- Hover Text (Center Top) -->
            <div class="absolute inset-0 flex flex-col items-left justify-center text-left px-6 transition-all duration-500 opacity-0 translate-y-10 group-hover:translate-y-0 group-hover:opacity-100">
              <h3 class="text-2xl font-bold text-white mb-2">Souvenir</h3>
              <p class="text-sm italic text-white">
                Temukan souvenir yang bukan hanya cantik, tapi juga punya nilai budaya. Setiap barang di sini mencerminkan tradisi, keahlian, dan jiwa Bali.
              </p>
            </div>
          </div>

          <!-- Card Template (Tradisi & Budaya) -->
          <div class="group relative w-[350px] h-[450px] overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="assets/images/tradisibudaya.jpg" alt="Tradisi dan Budaya" />
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-emerald-900/90 group-hover:from-emerald-800/80 group-hover:via-emerald-800/80 group-hover:to-emerald-800/90 transition-all duration-500"></div>

            <div class="absolute bottom-5 left-6 z-10 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4">
              <h3 class="text-2xl font-bold text-white">Tradisi & Budaya</h3>
            </div>

            <div class="absolute inset-0 flex flex-col items-left justify-center text-left px-6 transition-all duration-500 opacity-0 translate-y-10 group-hover:translate-y-0 group-hover:opacity-100">
              <h3 class="text-2xl font-bold text-white mb-2">Tradisi & Budaya</h3>
              <p class="text-sm italic text-white">
                Nikmati kekayaan seni dan budaya Bali yang tercermin dalam setiap produk lokal. Temukan karya yang menggabungkan nilai tradisional dengan sentuhan kreatif para pengrajin Ubud.
              </p>
            </div>
          </div>

          <!-- Card Template (Tawar Menawar) -->
          <div class="group relative w-[350px] h-[450px] overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="assets/images/tawar.jpg" alt="Tawar Menawar" />
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-emerald-900/90 group-hover:from-emerald-800/80 group-hover:via-emerald-800/80 group-hover:to-emerald-800/90 transition-all duration-500"></div>

            <div class="absolute bottom-5 left-6 z-10 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4">
              <h3 class="text-2xl font-bold text-white">Tawar Menawar</h3>
            </div>

            <div class="absolute inset-0 flex flex-col items-left justify-center text-left px-6 transition-all duration-500 opacity-0 translate-y-10 group-hover:translate-y-0 group-hover:opacity-100">
              <h3 class="text-2xl font-bold text-white mb-2">Tawar Menawar</h3>
              <p class="text-sm italic text-white">
                Rasakan pengalaman berbelanja khas pasar tradisional Bali. Proses tawar-menawar bukan sekadar transaksi, tapi interaksi yang hangat dan menyenangkan dengan para pedagang lokal.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Hubungi Kami Section -->
    <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-2 gap-8 items-start">
        
        <!-- Form Kontak -->
        <div class="text-left">
          <h2 class="text-4xl font-bold mb-4 text-center md:text-left">Hubungi Kami</h2>
          <p class="text-lg text-gray-500 mb-1 text-center md:text-left">
            Jl. Raya Ubud No.35, Ubud, Kecamatan Ubud, Kabupaten Gianyar, Bali 80571
          </p>
          <p class="mb-6 text-lg text-gray-500 text-center md:text-left">
            Punya pertanyaan dan saran seputar Ubud Art Market? Hubungi kami lewat formulir di bawah ini
          </p>

          <form class="space-y-6 w-full max-w-[500px]">
            <div>
              <input type="email" placeholder="Email" required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div>
              <input type="text" placeholder="Nama (Optional)"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div>
              <textarea rows="4" placeholder="Tulis pesan anda disini"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>
            </div>
            <button type="submit"
              class="w-full bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-300">
              Kirim
            </button>
          </form>
        </div>

        <!-- Google Maps Embed -->
        <div class="w-full h-full">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.919843479883!2d115.26297249999999!3d-8.5071639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd23de2db450aa1%3A0x409d0777de9a0ded!2sPasar%20Seni%20Ubud!5e0!3m2!1sid!2sid!4v1750421987385!5m2!1sid!2sid" 
            width="80%" 
            height="520" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade"
            class="rounded-md shadow-md">
          </iframe>
        </div>

      </div>
    </div>
    </section>
  </div>
</template>
