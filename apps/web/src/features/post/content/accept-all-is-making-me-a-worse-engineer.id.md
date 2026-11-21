---
title: '"Accept All" membuat saya menjadi engineer yang lebih buruk'
summary: Coding agent membuat saya lebih cepat mengirim kode dan lebih lambat berpikir. Enam tanda bahwa kemampuan saya menumpul, riset yang menjelaskannya, dan aturan yang sekarang saya ikuti untuk merebutnya kembali.
previewAlt: Tombol Accept all besar di bawah kursor mouse, di samping tiga batang, dokumentasi yang saya baca, diff yang saya baca, dan ide saya sendiri, yang terus berkurang hingga kosong
translatedAt: 2026-11-21
---

Saya rasa saya makin buruk sebagai engineer. Saya mengirim kode lebih banyak dari sebelumnya, jadi hasilnya terlihat baik-baik saja. Penurunannya terlihat di tempat-tempat kecil: apa yang saya baca, apa yang saya ingat, dan berapa lama saya bisa bertahan pada satu masalah. Saya curiga semua orang yang bekerja dengan agent merasakan sebagian dari ini, walaupun hanya sedikit yang mengatakannya terang-terangan.

Pada Februari 2025, Andrej Karpathy [menggambarkan vibe coding](https://simonwillison.net/2025/Feb/6/andrej-karpathy/) seperti ini: "I 'Accept All' always, I don't read the diffs anymore." Yang dia maksud adalah proyek akhir pekan yang sekali pakai. Sekarang saya melakukannya di pekerjaan sungguhan, dan beginilah sesi saya terlihat:

![Sesi agent di terminal. Saya memintanya me-refactor alur checkout. Agent membaca 23 file, mengubah 14, lalu minta izin menerapkan semua perubahan. Pilihan Accept all tersorot, dan saya mengetik: ok, use it.](/images/posts/accept-all-is-making-me-a-worse-engineer/accept-all.svg)

Berikut enam tandanya, dari yang pertama kali saya sadari sampai yang paling membuat saya takut.

## 1. Saya berhenti membaca changelog

Saya tidak lagi mengikuti perkembangan bahasa, library, atau pola baru. Rilis React, update PyTorch, atau spesifikasi ECMAScript berikutnya tidak saya lirik sama sekali. Saya tidak bisa memaksa diri membaca sekilas dokumentasi selama lima menit, karena agent-nya "sudah tahu".

Rasanya seperti naik taksi ke mana-mana. Anda sampai di setiap alamat, tetapi tidak pernah mengenal kotanya. Pada hari taksi tidak datang, Anda berdiri di sudut jalan tanpa peta di kepala.

Lisanne Bainbridge menamai jebakan ini pada 1983, dalam [Ironies of Automation](https://en.wikipedia.org/wiki/Ironies_of_Automation). Otomatiskan pekerjaan rutin, maka operator kehilangan latihan yang menjaga kemampuannya tetap hidup. Lalu mesin mengembalikan kendali di saat terburuk, ketika ada yang salah, kepada orang yang paling tidak siap menerimanya. Addy Osmani menyebut efek yang sama sebagai [skill atrophy](https://addyo.substack.com/p/avoiding-skill-atrophy-in-the-age): berhenti melatih suatu kemampuan, dan perlahan Anda kehilangannya.

## 2. "Ok, use it"

Konteks yang saya simpan di kepala menyusut hampir habis. Dulu, saat meriset topik dengan Google, saya mengumpulkan temuan sampingan di sepanjang jalan: blog post tentang bug yang belum pernah saya temui, sebuah RFC, library yang lebih bagus yang tersembunyi di balasan forum. Jalan memutar itu membuat wawasan saya lebih luas. Sekarang agent mengirim rencana, dan saya menjawab "ok, use it" tanpa membacanya.

![Dua rute dari pertanyaan ke jawaban. Dengan search, rutenya berkelok melewati blog post, RFC, balasan forum, dan library yang lebih bagus. Dengan agent, rutenya garis lurus dan saya tidak memungut apa pun di jalan.](/images/posts/accept-all-is-making-me-a-worse-engineer/detour.svg)

Risetnya cocok dengan perasaan itu. Dalam [uji acak oleh Anthropic](https://www.anthropic.com/research/AI-assistance-coding-skills) pada Januari 2026, 52 engineer mempelajari sebuah library Python baru. Kelompok yang memakai AI mendapat skor sekitar 50% di kuis sesudahnya; kelompok yang menulis kode sendiri mendapat 67%. Kelompok AI tidak lebih cepat, dan selisih terbesar ada di debugging. Orang yang menyerahkan seluruh tugas ke AI mendapat skor terendah. Orang yang mengajukan pertanyaan lanjutan ke AI mendapat skor terbaik.

Sebuah studi MIT Media Lab, [Your Brain on ChatGPT](https://www.media.mit.edu/publications/your-brain-on-chatgpt/), mengukur konektivitas otak paling lemah pada kelompok LLM, dan banyak peserta di kelompok itu tidak bisa mengutip esai yang baru saja mereka "tulis". Para penulisnya menyebutnya cognitive debt. Sebuah [survei Microsoft dan Carnegie Mellon](https://www.theregister.com/2025/02/11/microsoft_study_ai_critical_thinking/) terhadap 319 pekerja pengetahuan menemukan pola yang sama: makin orang percaya pada AI, makin sedikit mereka berpikir kritis. Studi-studi ini kecil, tetapi menggambarkan minggu saya.

## 3. Lima menit menunggu, tiga puluh menit hilang

Sebagian besar hari saya habis untuk menunggu. Saya lebih memilih itu daripada hiperproduktivitas palsu: sepuluh agent paralel, jutaan token terbakar, dan hasil kerja yang makin buruk. Saya percaya pada pendekatan linear: satu tugas, satu agent, dan satu review.

Tapi menunggu ada harganya. Satu run lima menit berubah menjadi tiga puluh menit. Saya membuka Slack, lalu X, lalu repo lain. Saat agent selesai, saya sudah tidak ingat kenapa saya memintanya. Seperti makanan microwave: Anda menekan start, keluar dari dapur, dan menemukan makanannya sudah dingin sejam kemudian.

![Linimasa 30 menit. Rencananya: agent berjalan 5 menit lalu review. Kenyataannya agent selesai di menit ke-5 saat saya di Slack, X, repo lain, dan email, dan di menit ke-30 saya bertanya pada diri sendiri tadi saya sedang apa.](/images/posts/accept-all-is-making-me-a-worse-engineer/wait.svg)

Gloria Mark, yang meneliti perhatian di UC Irvine, [menemukan](https://www.universityofcalifornia.edu/news/how-sharpen-your-attention-and-meet-your-goals-2024) bahwa orang sekarang rata-rata hanya bertahan 47 detik di satu layar sebelum berpindah. Pada 2003 angkanya dua setengah menit. Setiap run agent memberi otak saya izin gratis untuk berpindah.

Rasa cepat itu juga menipu. Dalam [uji METR 2025](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/), developer open-source berpengalaman butuh waktu 19% lebih lama dengan tool AI. Sesudahnya, mereka yakin AI membuat mereka 20% lebih cepat.

## 4. Agent sekarang tinggal di kepala saya

Kecemasan saya meningkat. Saya bangun tidur sambil memikirkan agent. Saya makan, berjalan, dan mengobrol dengan orang sambil memikirkan agent. Saat tidak memakainya, saya merencanakan sesi berikutnya dengan agent.

Saya tidak sendirian. Armin Ronacher, pembuat Flask, menyebutnya [agent psychosis](https://lucumr.pocoo.org/2026/1/18/agent-psychosis/) dan menceritakan berbulan-bulan kurang tidur dan prompt yang tak ada habisnya. Marketplace memberitakan ["token anxiety"](https://www.marketplace.org/episode/2026/05/11/ai-agents-are-10xing-productivity), yaitu rasa takut agent Anda menganggur saat Anda pergi. [Axios](https://www.axios.com/2026/04/04/ai-agents-burnout-addiction-claude-code-openclaw) menulis bahwa agent memicu "sesuatu yang sangat mirip kecanduan" pada sebagian performer terbaik di dunia tech.

Tarikan ini bentuknya familier. Setiap prompt adalah satu tarikan [mesin slot](https://dev.to/desty2k/your-coding-agent-is-a-slot-machine-1a2h): kadang diff yang sempurna, kadang sampah, sering kali hampir benar. Hadiah yang acak membuat Anda terus menarik.

![Mesin slot berlabel satu prompt lagi. Gulungannya berputar melewati pass, fail, dan almost, tuasnya ditarik lagi dan lagi, dan batang token yang terpakai terus terisi.](/images/posts/accept-all-is-making-me-a-worse-engineer/slot-machine.svg)

## 5. Kalau agent tidak bisa, saya lewati

Saya jadi super malas. Ketika agent tidak bisa menyelesaikan sebuah tugas, saya berusaha untuk tidak mengerjakan tugas itu sama sekali.

Setelah sebulan naik eskalator, dua lantai tangga terasa seperti gunung. Tangganya tetap sama; kaki Anda yang berubah. Setiap tugas yang saya lewati membuat tugas manual berikutnya terasa lebih berat, jadi saya lewati juga.

## 6. Kreativitas saya jadi datar

Kreativitas selalu jadi kekuatan saya. Saya bukan engineer terkuat, tetapi saya selalu bisa menemukan solusi yang menarik. Ide-ide itu datang saat saya bekerja: saya menemui masalah, menyerap informasi baru, dan otak saya tetap dalam flow. Sekarang saya merasa tumpul dan satu dimensi. Saya tidak bisa lagi membolak-balik sebuah masalah dan melihatnya dari sisi yang baru.

Kreativitas itu api unggun. Ia butuh gesekan untuk menyala dan bahan bakar untuk terus menyala, dan agent menghilangkan keduanya.

Sebuah [studi tahun 2024 di Science Advances](https://pmc.ncbi.nlm.nih.gov/articles/PMC11244532) oleh Anil Doshi dan Oliver Hauser menunjukkan harganya dalam skala besar. Penulis yang mendapat ide cerita dari AI menulis cerita yang lebih bagus, tetapi cerita-cerita itu lebih mirip satu sama lain. Setiap penulis menang; kelompoknya kehilangan keragaman.

![Dua kelompok berisi dua belas ide cerita yang digambar sebagai titik. Penulis yang sendirian menyebarkan idenya lebar-lebar. Penulis dengan ide dari AI mulai sama lebarnya, lalu bergeser berkumpul menjadi satu klaster rapat.](/images/posts/accept-all-is-making-me-a-worse-engineer/converge.svg)

## Gelembung

Kekhawatiran terbesar saya lebih besar dari diri saya. AI tidak menyelesaikan setiap masalah atau menyembuhkan setiap penyakit. AI adalah tool yang bertindak seperti agent tersendiri, dan dengan arsitekturnya sekarang, AI tidak bisa melampaui batas dari apa yang pernah dilihatnya. Manusia bisa.

Para peneliti sudah tahu apa yang terjadi saat model memakan output-nya sendiri. Di [Nature pada 2024](https://www.nature.com/articles/s41586-024-07566-y), Ilia Shumailov dan rekan-rekannya menunjukkan bahwa model yang dilatih dengan data hasil generate kehilangan ekor-ekor langka dari data aslinya. Mereka menyebutnya model collapse. Pada generasi kesembilan, sebuah teks tentang arsitektur abad pertengahan berubah menjadi daftar kelinci jackrabbit.

Manusia bisa runtuh dengan cara yang sama. Kalau engineer berhenti melangkah ke luar apa yang diketahui model, kemajuan melambat dan tertahan di dalam gelembung seukuran kemampuan AI.

![Gelembung bergaris putus-putus berlabel apa yang pernah dilihat model, penuh titik abu-abu yang bergerak tetapi tidak pernah keluar. Satu titik merah, seorang manusia, berjalan keluar menembus tepinya dan menjadi ide baru.](/images/posts/accept-all-is-making-me-a-worse-engineer/bubble.svg)

## Yang masih diberikan agent kepada saya

Saya tidak berhenti. Agent memberi saya hal-hal nyata:

- **Kecepatan di bagian yang membosankan:** setup, migrasi, dan kerangka test selesai dalam hitungan menit.
- **Keberanian:** saya memulai side project yang tidak akan pernah saya mulai sendirian.
- **Jawaban tentang kode saya sendiri:** saat saya bertanya kenapa sesuatu berjalan, agent menjelaskannya dengan file di repo saya, bukan dengan contoh generik.

Tool-nya bekerja. Masalahnya adalah kebiasaan saya menyerahkan proses berpikir kepadanya.

## Aturan saya untuk merebutnya kembali

1. **Berpikir dulu, prompt kemudian.** Saya menulis rencana saya sendiri dalam tiga baris sebelum agent menulis rencananya.
2. **Baca keputusan tingkat tinggi dan diff.** Pertama saya memeriksa keputusan di rencana agent, lalu saya membaca diff-nya. Accept All hanya untuk kode sekali pakai.
3. **Tanya kenapa.** Dalam uji Anthropic, orang yang mengajukan pertanyaan lanjutan tetap menjaga kemampuannya. Saya meminta agent menjelaskan satu keputusan di setiap perubahan.
4. **Tetap bersama run-nya.** Selama menunggu, saya me-review diff terakhir atau membuat sketsa langkah berikutnya. Slack dan X juga bisa menunggu.
5. **Satu jam manual setiap hari.** Saya memperbaiki satu bug atau membaca satu changelog tanpa agent.
6. **Berjalan tanpa agent.** Saat berjalan kaki, saya memikirkan masalahnya sendiri, bukan prompt untuk sesi berikutnya.

Setiap aturan hanya memakan beberapa menit. Sebagai gantinya, saya tetap punya peta, perhatian, dan jalan memutar yang membuat saya bagus di pekerjaan ini. Agent bisa membawa saya ke mana pun yang pernah didatangi model. Hanya saya yang bisa pergi ke tempat baru, dan itu pun hanya kalau kaki saya tetap cukup kuat untuk berjalan ke sana.
