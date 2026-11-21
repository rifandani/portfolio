---
title: Hanepyon Layover Planner
description: PWA yang dipandu maskot untuk mengubah layover di Haneda menjadi perjalanan singkat ke Kamata.
previewAlt: Sebuah ponsel dengan tumpukan kartu swipe di samping rute bertitik yang berjalan dari pesawat, melewati tiga perhentian bernomor, sampai ke gerbang kuil
translatedAt: 2026-11-21
---

Dengan tiga jam sebelum boarding, kamu bisa menunggu di gate atau naik kereta 12 menit ke Kamata untuk mandi di sento berpemanas kayu dan makan gyoza bersayap. Hanepyon Layover Planner membantumu merencanakan perjalanan itu dan kembali tepat waktu.

## Tantangannya

Hackathon ini berlangsung selama tiga hari pada November 2023 di Haneda Innovation City, Tokyo. Temanya adalah "Trip." Panitia meminta setiap tim menghubungkan wisatawan dengan Ota City, distrik di sekitar Bandara Haneda. Bagi banyak pengunjung, Haneda adalah tempat pertama mereka di Jepang, dan mereka pergi tanpa melihat Ota City.

Kami membuat ide perjalanan kota singkat untuk wisatawan yang punya waktu luang. Maskot Ota City akan memandu mereka.

## Produknya

Hanepyon, maskot Ota City, memandu wisatawan di dalam aplikasi. Setiap layar punya satu kalimat suara.

![Tiga layar ponsel: Hanepyon bertanya apakah penerbanganmu masih beberapa jam lagi, kartu kategori Cultural untuk di-swipe, dan rencana dengan biaya, durasi, peta rute, dan perhentian pertamanya](/images/projects/hanepyon-layover-planner/screens.webp)

1. Landing: "Hi bud, is your flight still a few hours away?" Ada satu tombol: "YUPPP!"
2. Avatar: Pilih pemandu. Hanya Hanepyon yang siap untuk demo.
3. Tutorial swipe: Dua kartu latihan mengajarkan cara swipe. Geser ke kanan untuk menyukai tempat, atau ke kiri untuk melewatinya.
4. Penerbangan berikutnya: "When is your next flight?" Pilih 3, 6, atau 12 jam.
5. Kategori: Swipe kartu foto layar penuh untuk Culinary, Recreational, Relaxation, Shopping, dan Cultural. Sukai tiga kartu, lalu Hanepyon berkata, "Great choice!"
6. Rencananya: Lihat rute, biaya, durasi, dan waktu kereta: ¥2.500, 2 jam 30 menit, dan 12 menit dengan kereta. Rencana ini mengunjungi Kuil Kamata Hachiman, sento Taishoyu, dan Shunkoen untuk gyoza bersayap. Ketuk peta untuk petunjuk transit dari Haneda di Google Maps, atau pindai kode QR untuk membawa rencana itu.

Tidak ada pendaftaran atau pencarian. Wisatawan cukup swipe kategori dan mendapat satu rencana.

![Panduan aplikasi di ponsel: Hanepyon bertanya tentang penerbanganmu, kamu memilih avatar, berlatih swipe, memilih 3 jam, menyukai tiga kategori, dan mendapat rencana dengan tiga perhentian di Kamata](/images/projects/hanepyon-layover-planner/flow.svg)

## Siap sebelum waktu dimulai

Saya membuat template React seminggu sebelum hackathon, supaya tim kecil kami bisa langsung mengerjakan aplikasi saat acara dimulai:

- Vite, TypeScript, ESLint, dan Prettier, dengan Husky dan commitlint untuk setiap commit.
- Mantine dan Tailwind untuk UI, React Query dan Zustand untuk state, Zod untuk validasi, dan React Hook Form untuk form.
- Firebase untuk autentikasi, Firestore, Storage, Realtime Database, dan hosting.
- Firebase Emulator Suite untuk pengembangan lokal. Emulator ini mengimpor seed data saat mulai dan mengekspor data terbaru saat berhenti, sehingga setiap developer memakai data yang sama.
- Dukungan PWA dengan Workbox, dan i18n untuk bahasa Inggris dan Indonesia.
- GitHub Actions yang men-deploy ke Firebase Hosting pada setiap push ke `main` dan membuat preview channel untuk setiap pull request.

Template sudah siap, jadi kami bisa membangun fitur aplikasi sejak jam pertama.

## Cara kami membangunnya

Kami berenam: dua software engineer, satu desainer, dan tiga system consultant. Para consultant menemukan ide dan membuat pitch deck. Desainer membuat layar-layarnya. Rekan engineer saya membangun tutorial swipe, layar waktu penerbangan, dan halaman rencana. Dia juga merekam suara Hanepyon dan mempresentasikan produk di hari terakhir.

Saya membangun mesin swipe dan alur layar, beserta layar landing, avatar, dan kategori. Saya juga menambahkan tautan peta.

Saya memakai dukungan drag dari Framer Motion untuk kartu kategori. Swipe lebih dari 30px ke kanan dihitung sebagai suka; lebih dari 30px ke kiri dihitung sebagai lewati. Kartu lalu bergerak keluar layar ke arah itu.

![Kartu kategori di ponsel: drag 220 px ke kanan menyukai Cultural, drag ke kiri melewati Shopping, dua suka lagi menjadi tiga, dan Hanepyon berkata Great choice](/images/projects/hanepyon-layover-planner/swipe.svg)

```tsx title="Category.tsx" mark="onDragEnd"
<motion.div
  exit={{ x: leaveX, opacity: 0, scale: 0.5, transition: { duration: 1 } }}
  drag
  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
  onDragEnd={(_e, info) => {
    const liking = info.offset.x > 30;
    const skipping = info.offset.x < -30;

    if (liking) {
      setLeaveX(1000);
      onSwipe("liking");
    }
    if (skipping) {
      setLeaveX(-1000);
      onSwipe("skipping");
    }
  }}
>
```

Alur onboarding memakai satu route. Query parameter `step` (`landing`, `avatar`, `how-to-use`, `time`, atau `category`) memilih layarnya. Tombol back browser tetap berfungsi. Saat pitch, kami juga bisa membuka layar mana pun lewat URL.

Browser memblokir audio sampai pengguna berinteraksi dengan halaman. Kalimat suara pertama diputar saat pengguna mengetuk Hanepyon; setelah itu setiap layar bisa memutar kalimatnya sendiri.

## Yang nyata dan yang diskenariokan

Demo selalu menampilkan tiga perhentian yang sama. Swipe dan waktu penerbangan menggerakkan wisatawan melalui alurnya, tetapi rencananya tetap sama. Kami hanya punya tiga hari, jadi kami fokus pada pengalaman pengguna dan menunda mesin rekomendasi.

Versi nyata akan membutuhkan data tempat yang terkini, rekomendasi yang berguna, waktu yang akurat, dan lebih banyak bahasa:

- Data tempat terkini: Pemerintah kota atau toko lokal perlu menjaga jam buka, harga, dan foto tetap terbaru.
- Rekomendasi: Kategori yang disukai dan waktu yang tersedia akan menyaring dan mengurutkan tempat. Layover tiga jam tidak cukup untuk mandi selama dua jam.
- Waktu: Aplikasi perlu jadwal kereta langsung dan waktu cadangan untuk kembali melewati pemeriksaan keamanan bandara.
- Bahasa: Aplikasi perlu bahasa Jepang dan bahasa-bahasa yang dipakai wisatawan di Haneda.

## Hasilnya

Kami tidak memenangkan penghargaan. Juri menyukai UI dan UX-nya dan menganggap idenya valid, tetapi mengatakan bahwa aplikasi ini akan sulit di-deploy di bandara.

Masukan mereka masuk akal. Kami sudah membangun layar dan alurnya, sementara versi nyata masih membutuhkan data tempat terkini, waktu yang andal, mitra toko lokal, dan logika rekomendasi.

## Referensi

- [Tautan resmi acara](https://bitconnect.nri.co.jp/2023/)
- [Di balik layar: visi para staf](https://note.nri-digital.jp/n/n2b3ae7ced0cb?hl=en)
- [Foto dari hackathon](/gallery#hackathon-2023)
