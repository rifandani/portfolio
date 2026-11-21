---
title: Monorepo Boilerplates
description: Dua monorepo starter open source, dengan React dan Expo di sisi klien serta Hono dan Effect di sisi server.
previewAlt: Jendela browser dan ponsel di atas paket core bersama, dengan garis bertitik ke dua kotak server bertumpuk berlabel Hono dan Effect
translatedAt: 2026-11-21
---

Setiap proyek baru dulu menghabiskan minggu pertama yang sama. Saya menyiapkan linter, router, alur login, test, dan CI sebelum menulis satu fitur pun. Sekarang saya mulai dari salah satu dari dua monorepo: [fe-monorepo](https://github.com/rifandani/fe-monorepo) untuk aplikasi klien dan [be-monorepo](https://github.com/rifandani/be-monorepo) untuk aplikasi server. Keduanya open source dengan lisensi MIT, dan saya masih merawat keduanya.

## Isinya

Kedua repo berisi lima workspace. Bun menginstalnya, dan setiap workspace memakai TypeScript.

- `apps/spa`: React 19, Vite 8, TanStack Router, Query, dan Form, React Aria Components, dan Tailwind 4.
- `apps/expo`: Expo SDK 53, Expo Router, Tamagui, MMKV, dan React Hook Form.
- `packages/core`: API client, i18n, hooks, dan utilitas yang dipakai bersama oleh kedua aplikasi klien.
- `apps/hono`: Hono 4 dengan Zod OpenAPI, Better Auth, Drizzle, dan PostgreSQL.
- `apps/effect`: HTTP API Effect 4 yang berjalan di Node atau Bun.

## Aplikasi web

[Demo](https://rifandani-fe-monorepo-spa.vercel.app/) menjalankan aplikasi web dengan [DummyJSON](https://dummyjson.com/).

- Login: Guard di setiap route yang dilindungi mengirim tamu ke halaman login, lalu kembali ke halaman yang dia minta.
- Tema dan bahasa: Tema terang dan gelap, dalam bahasa Inggris dan Indonesia.
- Master Design: Satu halaman menampilkan lebih dari 80 varian komponen. Sebuah feature flag menyembunyikannya di production, dan panel devtools mengubah flag itu selama pengembangan.
- PWA: Service worker menyimpan aplikasi di cache untuk penggunaan offline, meminta pengguna memuat ulang untuk versi baru, dan menampilkan push notification.
- SEO: Judul halaman, tag Open Graph, data schema.org, dan script sitemap.
- Telemetri: Browser mengirim trace dan metrik OpenTelemetry, dan melaporkan Core Web Vitals.

## Aplikasi mobile

Aplikasi Expo memakai API client dan terjemahan dari `packages/core`, sehingga perubahan pada skema endpoint sampai ke aplikasi web dan mobile dalam satu commit. Aplikasi ini menyimpan data di MMKV terenkripsi. EAS mem-build-nya untuk tiga varian (development, preview, dan production), dan EAS Update mengirim perubahan JavaScript secara over the air. Flow Maestro menguji layar login, home, dan profil di perangkat atau simulator.

## Aplikasi server

Kedua aplikasi server menjalankan middleware yang sama dengan urutan yang hampir sama: request ID, CORS, timing, timeout, deteksi bahasa, CSRF, dan secure headers. Kamu bisa membandingkan handler Hono dan handler Effect untuk request yang sama.

Aplikasi Hono punya login email dan password dari Better Auth, dengan rate limit. Drizzle mengelola skema, migrasi, dan seed data PostgreSQL. Scalar menyajikan dokumentasi OpenAPI di `/openapi/docs`, dan `/llms.txt` memberikan dokumentasi yang sama kepada AI agent.

Aplikasi Effect mendeskripsikan endpoint-nya dengan `HttpApi`, menyajikan dokumentasi Scalar, dan menambahkan probe liveness dan readiness serta metrik request.

Kedua aplikasi tidak punya langkah build. Node 26 menghapus type saat memuat file `.ts`, dan Bun menjalankan file yang sama. Docker Compose menjalankan PostgreSQL dan stack Grafana yang menerima trace, metrik, dan log.

## Opini dalam struktur

Boilerplate seharusnya membuat keputusan, jadi repo ini membuat banyak keputusan. Setiap keputusan punya architecture decision record (ADR) sendiri, sehingga tim bisa mempertahankan atau menghapusnya.

- Folder per fitur: `auth/`, `user/`, dan `core/` masing-masing berisi komponen, hooks, dan utilitasnya sendiri.
- Satu jalur ke setiap modul: Paket workspace hanya di-resolve lewat map `exports`-nya. Repo ini tidak memakai alias `paths` di tsconfig, karena Node tidak membaca tsconfig.
- Lapisan di aplikasi Effect: `domain/` datang sebelum `api/`, dan `api/` datang sebelum `server/`. Sebuah folder hanya mengimpor dari folder sebelumnya, sehingga klien bisa memuat deskripsi API tanpa kode database atau secret.
- Test: Unit test mencakup logika modul murni. MSW me-mock batas jaringan. Mutation test Stryker bersifat saran dan tidak memblokir merge.

## Pemeriksaan di setiap perubahan

GitHub Actions menjalankan pemeriksaan ini di kedua repo:

- Setiap pull request: deteksi secret dengan gitleaks, Fallow (dead code, duplikasi, dan kompleksitas), lint, typecheck, dan unit test dengan coverage. Aplikasi web juga mendapat build production.
- Setiap push ke `main`: test end-to-end Playwright untuk aplikasi web.
- Setiap minggu: scan dependensi dengan osv-scanner, CodeQL, dan scan OWASP ZAP untuk setiap aplikasi yang di-deploy.
- Setiap tag versi: rilis GitHub dengan changelog yang dibuat otomatis.

Oxlint dan oxfmt melakukan lint dan format kode melalui Ultracite, dan Husky menjalankannya sebelum setiap commit.

## Siap untuk coding agent

Setiap repo memberikan aturan yang sama kepada AI agent seperti kepada manusia. Setiap repo punya lebih dari 40 skill agent, dan 25 di antaranya berasal dari [skill Matt Pocock](https://github.com/mattpocock/skills). Skill-skillnya berbagi satu set dokumen domain, sehingga setiap skill membaca keputusan dan istilah yang ditulis oleh skill sebelumnya.

## Memulai proyek darinya

README utama setiap repo punya checklist "Getting Started". Setiap langkah menyebutkan file yang berisi nilai placeholder, seperti nama aplikasi, bundle ID, hostname lokal, dan user demo. Langkah terakhir menjalankan satu perintah `git grep` yang menemukan setiap placeholder yang tersisa.

## Rencana berikutnya

README setiap aplikasi punya bagian "Todo" yang selalu saya perbarui:

- [`apps/spa`](https://github.com/rifandani/fe-monorepo/blob/main/apps/spa/README.md)
- [`apps/expo`](https://github.com/rifandani/fe-monorepo/blob/main/apps/expo/README.md)
- [`apps/hono`](https://github.com/rifandani/be-monorepo/blob/main/apps/hono/README.md)
- [`apps/effect`](https://github.com/rifandani/be-monorepo/blob/main/apps/effect/README.md)

## Referensi

- [Demo aplikasi web](https://rifandani-fe-monorepo-spa.vercel.app/)
- [fe-monorepo di GitHub](https://github.com/rifandani/fe-monorepo)
- [be-monorepo di GitHub](https://github.com/rifandani/be-monorepo)
