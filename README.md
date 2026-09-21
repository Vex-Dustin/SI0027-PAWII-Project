# SI0027-PAWII-Project - Mini Project

Repositori **mini-project** (starter kit latihan) pendamping mata kuliah **Pengembangan Aplikasi Web II**, Program Studi Sistem Informasi, Universitas Multi Data Palembang.

Repositori ini **bukan** kumpulan jawaban tugas. Setiap folder pertemuan berisi starter kit latihan singkat (berisi `// TODO` yang perlu dilengkapi mahasiswa) yang dikerjakan bersama di kelas, ditampilkan pada slide materi sebagai bahan praktik.

## Struktur Repositori

```
SI0027-PAWII-Project/
├── pertemuan-01-full-stack-arsitektur-decoupled/
├── pertemuan-02-uiux-figma-deployment-paas/
├── pertemuan-03-04-restful-api-expressjs/
├── ...
├── pertemuan-17-18-arsitektur-komponen-spa/
│   ├── react/
│   └── angular/
└── ...
```

Topik SPA (Pertemuan 17-28) disediakan dalam dua varian stack, masing-masing di subfolder `react/` dan `angular/`; Pertemuan 26-27 dan 28 juga menyertakan subfolder `backend/`.

## Peta Materi (mengikuti Tabel H - RPS PAW II)

> **Progres pribadi:** kolom **Status** dimulai kosong. Setelah Anda **mengerjakan sendiri** latihan pada suatu pertemuan (bukan sekadar membaca solusinya), isi sel pada baris tersebut dengan tulisan `Selesai` di **fork Anda sendiri**, lalu commit & push.

| Pertemuan | Pokok Bahasan | Folder | Selesai |
|---|---|---|---|
| 1 | Full Stack Development & Arsitektur Aplikasi Web Decoupled | [`pertemuan-01-full-stack-arsitektur-decoupled`](pertemuan-01-full-stack-arsitektur-decoupled) |  |
| 2 | UI/UX Design (Figma) & Ekosistem Deployment Modern (PaaS) | [`pertemuan-02-uiux-figma-deployment-paas`](pertemuan-02-uiux-figma-deployment-paas) | Selesai |
| 3, 4 | Membangun RESTful API dengan Express.js | [`pertemuan-03-04-restful-api-expressjs`](pertemuan-03-04-restful-api-expressjs) | Selesai |
| 5 | Middleware & Konfigurasi Backend | [`pertemuan-05-middleware-konfigurasi-backend`](pertemuan-05-middleware-konfigurasi-backend) |  |
| 6, 7 | Arsitektur Backend Terstruktur (MVC/Layered) | [`pertemuan-06-07-arsitektur-mvc-layered`](pertemuan-06-07-arsitektur-mvc-layered) |  |
| 8 | Pengujian API dengan Postman Automation | [`pertemuan-08-pengujian-api-postman`](pertemuan-08-pengujian-api-postman) |  |
| 9, 10 | NoSQL Data Modeling (MongoDB, Mongoose & MongoDB Atlas) | [`pertemuan-09-10-nosql-data-modeling-mongodb`](pertemuan-09-10-nosql-data-modeling-mongodb) |  |
| 11, 12 | RESTful API CRUD untuk Data NoSQL | [`pertemuan-11-12-restful-api-crud-nosql`](pertemuan-11-12-restful-api-crud-nosql) |  |
| 13, 14 | Autentikasi Stateless dengan JWT & Keamanan API | [`pertemuan-13-14-autentikasi-jwt-keamanan-api`](pertemuan-13-14-autentikasi-jwt-keamanan-api) |  |
| 15, 16 | Ujian Tengah Semester (UTS) | - | - |
| 17, 18 | Arsitektur Komponen SPA Framework-Agnostik (React/MERN atau Angular Standalone) | [`pertemuan-17-18-arsitektur-komponen-spa`](pertemuan-17-18-arsitektur-komponen-spa) |  |
| 19, 20 | Build Tools/CLI Modern untuk Proyek SPA | [`pertemuan-19-20-build-tools-cli-spa`](pertemuan-19-20-build-tools-cli-spa) |  |
| 21, 22 | Form dan Validasi Sisi Klien pada SPA | [`pertemuan-21-22-form-validasi-spa`](pertemuan-21-22-form-validasi-spa) |  |
| 23, 24, 25 | Konsumsi API Asinkron (Axios/Fetch) & Autentikasi JWT dari SPA | [`pertemuan-23-24-25-konsumsi-api-asinkron-jwt-spa`](pertemuan-23-24-25-konsumsi-api-asinkron-jwt-spa) |  |
| 26, 27 | Deployment Modern: Backend (Render/Railway) & Frontend (Vercel/Netlify) | [`pertemuan-26-27-deployment-backend-frontend`](pertemuan-26-27-deployment-backend-frontend) |  |
| 28 | Integrasi Full Stack, Debugging Arsitektur Decoupled & Review Proyek | [`pertemuan-28-integrasi-fullstack-debugging-review`](pertemuan-28-integrasi-fullstack-debugging-review) |  |
| 29, 30 | Konsultasi dan Presentasi Proyek Akhir | - | - |
| 31 | Ujian Akhir Semester (UAS) - Presentasi Project | - | - |

> Catatan: topik SPA (Pertemuan 17-28) disediakan dalam dua varian stack: **React (MERN)** dan **Angular Standalone Components**, mengikuti opsi pada RPS.

## Cara Menjalankan Setiap Project

Setiap folder pertemuan umumnya berupa aplikasi Node.js/Express dan/atau frontend statis. Petunjuk detail tersedia di README masing-masing folder pertemuan. Pola umum:

```bash
cd <folder-pertemuan>
npm install
npm start
```

## Lisensi & Penggunaan

Kode pada repositori ini disediakan untuk keperluan pembelajaran mata kuliah Pengembangan Aplikasi Web II di Universitas Multi Data Palembang.
