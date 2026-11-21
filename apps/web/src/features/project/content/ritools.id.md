---
title: Ritools
description: Sepuluh tool gratis untuk gambar, video, PDF, tabel, dan teks. Semuanya berjalan di browser, dan file kamu tetap di perangkatmu.
previewAlt: Jendela browser dengan sepuluh kotak Tool di dalam garis putus-putus berlabel your device, dan awan yang dicoret di luar garis itu
translatedAt: 2026-11-21
---

Sebuah portal lowongan kerja menolak foto 3,5 MB kamu. Batasnya 300 KB. Kamu mencari kompresor, dan hasil pertama meminta file kamu diunggah ke server mereka, meminta akun, atau meminta paket berbayar untuk sisa batch-nya. Ritools melakukan pekerjaan yang sama di satu tab browser: tanpa akun, tanpa upload, dan tanpa batas selain perangkatmu.

![Halaman utama Ritools: judul Free and Local, sidebar dengan sepuluh Tool, dan kartu Tool dengan nama yang terpotong seperti surat tebusan](/images/projects/ritools/catalog.webp)

## Laundry dan mesin cuci

Tool online bekerja seperti laundry. Kamu menyerahkan pakaianmu kepada orang asing, memercayai ruang belakangnya, dan membayar per potong. Ritools adalah mesin cuci di rumahmu sendiri: pakaian tetap di rumah, dan tidak ada yang menghitung berapa kali kamu mencuci.

![Dua jalur beranimasi. Tool online biasa mengirim file kamu ke server lalu kembali. Ritools menyimpan file di dalam perangkatmu, tempat tab browser mengubahnya menjadi file baru.](/images/projects/ritools/no-upload.svg)

Janji ini datang dari strukturnya. Kebijakan privasi memintamu memercayai sebuah server; Ritools tidak punya endpoint upload dan tidak punya penyimpanan server, jadi tidak ada yang perlu dipercaya. Awalnya saya membangunnya untuk pekerjaan kecil saya sendiri. Sebuah Tool baru dirilis kalau bisa menggantikan layanan yang dibatasi atau berbayar.

## Yang kamu dapat

- **File privat:** Setiap Tool membaca dan menulis file kamu di dalam tab.
- **Tanpa akun:** Buka halamannya dan langsung mulai.
- **Tanpa batas:** Memori dan CPU kamu adalah satu-satunya batas, dan situs ini mengatakannya.
- **Bisa offline:** Setelah dipakai pertama kali, sebuah Tool tetap berfungsi di pesawat.
- **Siap untuk agent:** Enam Tool mendukung WebMCP, sehingga agent di browser kamu bisa menjalankannya untukmu.
- **Tanpa instalasi:** Setiap Tool adalah tautan, dan situs ini bisa diinstal sebagai PWA kalau kamu ingin ikonnya.
- **Penggunaan komersial:** Pekerjaan untuk klien dipersilakan, tanpa biaya.

## Sepuluh Tool, satu tab

Semua Tool berbagi satu shell, jadi kamu cukup mempelajari sidebar-nya sekali. Lima Tool membuat file, dan lima lainnya membuka dokumen untuk diedit. Kelima pembuat file itu dan Easel juga menerima perintah dari AI agent melalui WebMCP.

- **Squeeze** mengompres satu batch gambar sampai ukuran file target.
- **Expose** membaca metadata file, lalu menghapus grup yang kamu pilih.
- **Qraft** membuat kode QR dan lebih dari 40 jenis kode lainnya.
- **Unmask** menghapus latar belakang gambar dan membiarkanmu memperbaiki hasilnya.
- **Cinch** mengompres satu batch video sampai ukuran file target.
- **Tabular** menampilkan, mengedit, dan mengonversi file CSV dan Excel.
- **Folio** menampilkan, mengedit, dan mengompres PDF.
- **Quill** menyimpan pustaka Markdown di browser kamu.
- **Cleave** membandingkan dua teks dan menyelesaikan setiap perubahan.
- **Easel** memotong, menyesuaikan, memberi anotasi, dan menyensor satu gambar dalam satu waktu.

## Squeeze: kemas sampai batas berat

Slider kualitas itu seperti mengemas koper dengan mata tertutup, lalu berharap timbangan bandara setuju. Squeeze mulai dari batasnya. Kamu memberinya Target, dan Squeeze menemukan kualitas terbaik yang muat, untuk setiap gambar dalam Batch.

![Squeeze mengambil empat gambar dengan Target 300 KB, memprosesnya, dan menunjukkan 7,9 MB berkurang menjadi 854,5 KB](/images/projects/ritools/squeeze.svg)

Proses ini memakai empat gambar dan Target 300 KB. Batch turun dari 7,9 MB menjadi 854,5 KB. Satu JPEG sudah muat, jadi Squeeze mempertahankan file aslinya.

Pencariannya membagi dua sebuah tangga pengaturan, dari yang terbaik, sehingga setiap gambar hanya butuh `log2(steps)` percobaan encode:

```ts title="squeeze.ts" mark="fits(probe.result)"
while (low <= high) {
  const middle = Math.floor((low + high) / 2);
  const probe = yield * probeAt(middle);
  if (fits(probe.result)) {
    best = probe;
    high = middle - 1;
  } else {
    low = middle + 1;
  }
}
```

Squeeze juga jujur saat fisika menang. Dengan Target 200 KB, foto 26 megapiksel berhenti di 274,6 KB. Squeeze menandai gambar itu sebagai Miss dan tetap memberikan file terkecil yang bisa dibuatnya.

## Expose: baca bagian belakang kartu pos

Sebuah foto adalah kartu pos dengan alamatmu di baliknya. Kameramu yang menulisnya, dan kebanyakan orang tidak pernah membalik kartunya. Expose membaliknya.

![Expose membaca 428 field metadata dari foto kamera, preset Personal dipilih, dan Verification menunjukkan 0 field tersisa di samping titik GPS pada peta offline](/images/projects/ritools/expose.svg)

Sampel kamera ini berisi 428 field, termasuk satu titik GPS. Preset Personal menghapus 66 di antaranya dari lima grup. Expose lalu membaca Cleaned File sekali lagi dan melaporkan 0 field tersisa di grup-grup itu, jadi kamu mendapat bukti bersama file-nya.

Petanya adalah Offline Locator. Peta ini tidak memuat tile, sehingga tidak ada server peta yang tahu di mana foto itu diambil.

## Qraft: cat alamatnya di pintu

Kebanyakan layanan QR menyewakan kotak surat. Kodenya mengarah ke redirect mereka, mereka menghitung setiap scan, dan alamatnya bisa kedaluwarsa. Qraft mengecat alamatnya di pintu: Payload ada di dalam gambar, sehingga kodenya tidak butuh server di belakangnya.

![Qraft membuat kode QR, memuat Batch tautan untuk Label Sheet, dan memberi gaya pada kode dengan gradien merah dan logo](/images/projects/ritools/qraft.svg)

Atur titik, sudut, gradien, dan logo, dan Scan Warnings menandai gaya yang bisa merusak scan. Mode Batch mengubah daftar atau CSV menjadi satu Label Sheet dengan gaya yang sama. Unduh SVG untuk mempertahankan gaya lengkapnya, atau PNG untuk gambar datar dengan ukuran yang tepat.

## Unmask: gunting, lalu penghapus

Kebanyakan penghapus latar belakang memberimu hasil potongan lalu pergi. Unmask juga memberimu guntingnya: model membuat potongan pertama, dan Magic Brush memberimu keputusan terakhir.

![Unmask membuka foto beruang kutub, memotong beruangnya dengan tampilan Ghost untuk piksel yang dihapus, menunjukkan Cutout yang bersih, dan menaruhnya di Backdrop merah polos](/images/projects/ritools/unmask.svg)

Model berjalan di tab kamu dengan ONNX Runtime Web, memakai WebGPU kalau browser menyediakannya dan WASM kalau tidak. Ritools mengambil model itu sekali, sekitar 42 MB, dari origin-nya sendiri. Gambar kamu tidak pernah berjalan ke arah sebaliknya.

Tampilan Ghost menunjukkan piksel yang dihapus, sehingga kamu bisa melihat apa yang perlu dikembalikan. Wand mengambil area dengan warna yang mirip, dan Brush melukis goresan. Setiap edit masuk ke log operasi, dan export memutar ulang log itu pada Matte beresolusi penuh. Gambar akhir tetap tajam walaupun kamu melukis di pratinjau yang lebih kecil.

## Cinch: batas berat yang sama, untuk video

Rekaman layar sering terlalu besar untuk aplikasi chat atau email. Cinch melakukan untuk video apa yang Squeeze lakukan untuk gambar. Beri Cinch Target ukuran file, atau pilih Video Preset (Light, Balanced, atau Strong) kalau kamu hanya ingin file yang lebih kecil.

![Cinch mengambil video 1080p berukuran 12,8 MB dengan Target 3 MB, mengompresnya menjadi 2,5 MB, dan membandingkan keduanya berdampingan](/images/projects/ritools/cinch.svg)

Dalam mode Target, Cinch menghitungnya untukmu. Kalau Target terlalu kecil untuk resolusi input, Cinch memilih Fit Scale yang lebih rendah dan menyebutkannya di baris itu. Kalau output pertama masih melebihi Target, Cinch melakukan encode sekali lagi. Kamu juga bisa mengatur Max Resolution, membatasi frame rate, atau menghapus audio.

Cinch menulis MP4 (H.264 dan AAC) atau WebM (VP9 dan Opus). Cinch melakukan encode dengan WebCodecs milik browser melalui Mediabunny, sehingga bisa memakai encoder video hardware di perangkatmu. Cinch tidak membawa ffmpeg.wasm, jadi tidak ada mesin besar yang perlu diunduh.

## Lima editor

**Tabular adalah multitool untuk tabel.** Tabular membuka beberapa file di tab, mengedit nilai sel, menghapus duplikat, memisah dan menggabungkan file CSV, dan membandingkan dua versi berdasarkan kunci yang kamu pilih. Tabular juga membuat laporan PDF.

![Tabular menampilkan grafik garis dari daftar saham, dengan Diff, Dedupe, Split, dan Merge di toolbar](/images/projects/ritools/tabular.webp)

**Folio adalah percetakan di mejamu.** Folio mengubah kata-kata, menyensor, menandatangani, mengisi form, menyusun halaman, dan menambahkan lapisan OCR yang tidak terlihat. Edit kata-kata harus lolos pemeriksaannya sendiri: Folio membaca kembali teks baru, lalu me-render halaman dan memeriksa bahwa tidak ada yang bergeser di luar edit itu. Kalau pemeriksaan gagal, Folio tidak menulis apa pun.

![Folio dengan sampel PDF terbuka di tab Redact, di samping View, Annotate, Shapes, Insert, Form, dan Measure](/images/projects/ritools/folio.webp)

**Quill adalah buku catatan yang tinggal di browser kamu.** Quill menyimpan dokumen dan folder di perangkatmu, dan me-render matematika, tabel, dan diagram Mermaid saat kamu mengetik.

![Quill dalam mode Split dengan sumber Markdown di kiri dan matematika serta flowchart yang sudah di-render di kanan](/images/projects/ritools/quill.webp)

**Cleave adalah meja lampu untuk dua draf.** Setiap perbedaan dalam teks atau kode kamu langsung terlihat. Resolve lalu mempertahankan Before, After, atau keduanya untuk setiap Change. Cleave juga membuka file yang penuh dengan penanda konflik git dan menawarkan pilihan yang sama, sehingga kamu bisa mengurai merge di tab browser.

![Cleave mengambil dua versi sebuah fungsi, menunjukkan Change secara berdampingan, membuka Resolve, dan menerima satu Change](/images/projects/ritools/cleave.svg)

**Easel adalah kertas kalkir di atas fotomu.** Easel memotong, memutar, meluruskan, membalik, menyesuaikan warna, menerapkan filter, mengisi area, dan menambahkan teks, bentuk, dan watermark. Easel tidak pernah mengubah piksel aslinya. Easel menyimpan perubahanmu di Edit Stack dan menggambar ulang gambarnya dari yang asli setiap kali, sehingga undo dan redo selalu tepat. Reload tetap mempertahankan gambar yang terbuka beserta editnya.

![Easel membuka foto beruang kutub, memotongnya menjadi persegi Instagram, menerapkan filter Noir, dan menambahkan watermark teks merah](/images/projects/ritools/easel.svg)

Redaction (Cover atau Mosaic) masuk ke dalam piksel saat export, sehingga file tidak menyimpan piksel tersembunyi di bawahnya. Hasil export juga tidak menyimpan metadata.

## WebMCP: enam Tool menerima perintah dari agent kamu

Agent di situs web biasa memesan dengan menunjuk gambar. Agent membaca screenshot, menebak tombol mana yang penting, dan berharap tata letaknya tidak berubah. WebMCP memberinya menu: setiap aksi punya nama, deskripsi, dan skema bertipe.

Squeeze, Expose, Qraft, Unmask, Cinch, dan Easel menerbitkan menu itu. Di sini agent browser menjalankan Qraft di situs live tanpa klik. Setiap frame menunjukkan panggilan nyata dan hasilnya.

![Agent browser mengendalikan Qraft tanpa klik: agent menampilkan daftar Agent Actions, membuka Qraft, mengatur payload, dan memberi gaya pada kode dengan gradien merah](/images/projects/ritools/webmcp.svg)

Masing-masing dari keenam Tool menambahkan aksinya sendiri saat kamu membukanya, totalnya 48:

- **Squeeze (6):** Atur Target, jalankan Batch, hentikan, hapus gambar, dan unduh.
- **Expose (8):** Buka sampel, baca Metadata Report, pilih preset, bersihkan, dan unduh.
- **Qraft (9):** Atur kode dan gayanya, render, buat batch dan label sheet, dan unduh.
- **Unmask (11):** Muat sampel, ubah pengaturan, potong, edit Matte, undo, redo, dan unduh.
- **Cinch (6):** Ubah pengaturan, jalankan Batch, hentikan, kosongkan, dan unduh.
- **Easel (8):** Buka sampel, potong ke preset, putar, balik, sesuaikan, terapkan filter, dan export.

Aksi ke-49, `open_tool`, berfungsi di setiap halaman dan membuka salah satu dari keenam Tool itu. Editor lainnya tetap manual: Tabular, Folio, Quill, dan Cleave tidak menerbitkan aksi sendiri.

Janji lokal tetap berlaku. Byte file tidak pernah masuk ke atau keluar dari Agent Action, sehingga agent hanya bekerja pada file yang kamu buka. Hanya kamu yang memilih logo Qraft, dan unduhan melewati jalur yang sama dengan klikmu sendiri. Hasil yang berisi teks dari file membawa petunjuk peringatan, karena sebuah file bisa berisi teks yang ditulis untuk mengarahkan agent.

Ritools memakai WebMCP native kalau browser memilikinya. Kalau tidak, Ritools memuat polyfill untuk agent di transport MCP-B, dan mengunci polyfill itu ke origin-nya sendiri. Pengaturan default-nya akan membiarkan frame atau extension mana pun memanggil sebuah aksi.

## Bagaimana satu tab melakukan semua ini

Tab browser punya ruang mesin yang lebih besar dari dugaan kebanyakan orang. Setiap Tool membawa mesinnya sendiri dan memuatnya saat pertama dipakai, sehingga kunjungan ke Squeeze tidak pernah membayar mesin PDF.

- Squeeze: codec jSquash, termasuk MozJPEG dan AVIF.
- Expose: ExifTool 13.59 dalam WebAssembly.
- Unmask: ISNet di ONNX Runtime Web.
- Cinch: Mediabunny di atas WebCodecs milik browser.
- Folio: PDFium melalui EmbedPDF, pdf-lib, dan Tesseract.
- Quill: Tiptap, dengan Pele untuk Mermaid.
- Cleave: Pierre Diffs.
- Easel: pass WebGL2, Fabric.js, dan jSquash.

Pekerjaan berat berjalan di Web Worker, sehingga halaman tetap responsif. Service worker menyimpan setiap mesin di cache setelah pertama dipakai. TanStack Start dan React menggambar situsnya, dan Effect menjalankan logika aplikasinya.

Tampilannya adalah surat tebusan: huruf yang digunting, tinta, dan satu warna merah, dalam bahasa visual Persona 5. Gaya ini cocok untuk situs yang menyandera file kamu dari cloud.

Shell bersama juga membuat Tool baru tetap murah. Sebuah Tool menambahkan konten, dan shell membawa sidebar, tema, dua bahasa, dukungan offline, dan halaman error.

## Batas yang jujur

Ritools mengatakan "no cap", bukan "unlimited", karena batasnya ada: perangkatmu. Batas-batas lainnya juga perlu ditulis di sini.

- Penggunaan pertama setiap mesin butuh koneksi jaringan.
- Unmask tidak menjanjikan tepi yang sempurna pada rambut, bulu, kaca, atau motion blur, dan tidak membaca file HEIC, TIFF, atau RAW.
- Expose hanya menghapus metadata. Expose tidak bisa menghapus watermark piksel.
- Cinch hanya membaca MP4, MOV, WebM, dan MKV, dan browser kamu menentukan codec mana yang bisa dibacanya.
- Easel membuka paling banyak 10 gambar sekaligus, dan tidak menyimpan file proyek.
- Tabular mengedit nilai sel dan tidak mempertahankan formula Excel.
- Folio menganggap pengubahan kata-kata sebagai beta: font yang sama, tanpa reflow.
- Hasil Agent Action masuk ke agent browser kamu, dan agent itu mungkin mengirimnya ke model remote. Ritools tidak mengunggah apa pun, tetapi hasil Expose berisi nilai metadata, jadi pilih agent kamu dengan hati-hati.
- Saya belum punya benchmark atau angka penggunaan, jadi halaman ini tidak mengklaimnya.

## Kredit

Gambar sampel bersifat publik, dan potret di Squeeze adalah milik saya: beruang kutub oleh Terry Debruyne, U.S. Fish and Wildlife Service (domain publik); potret dengan anjing oleh Harris & Ewing (domain publik); bunga oleh The People's Internet (CC0); foto kamera oleh Andy Parsons, hak cipta Adobe, dari file uji publik C2PA (CC BY-SA 4.0).

Ritools open source dengan lisensi MIT. [Buka Ritools](https://ritools.vercel.app/) dan coba, atau [baca kodenya di GitHub](https://github.com/rifandani/ritools).
