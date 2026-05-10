# 🎓 Web Digital Signage Kampus (B-Signage)

Aplikasi Web Digital Signage adalah platform berbasis web *Full-Stack* (MERN) yang dirancang untuk menampilkan informasi satu arah secara dinamis pada layar monitor atau Smart TV yang tersebar di area kampus. 

Aplikasi ini mempermudah pihak administrasi atau humas kampus untuk menyebarkan pengumuman, menampilkan waktu yang akurat, dan membagikan dokumentasi visual (galeri kegiatan) kepada mahasiswa dan staf secara *real-time*.

---

## ✨ Fitur Utama

### 🖥️ 1. Layar Penampil Publik (Display Area)
- **Jam Digital Real-time:** Menampilkan waktu, hari, dan tanggal secara aktual.
- **Slideshow Galeri:** Menampilkan foto-foto dokumentasi kampus secara bergantian setiap 5 detik dengan efek transisi yang halus (*fade*).
- **Running Text (Ticker):** Menampilkan teks pengumuman yang berjalan di bagian bawah layar. 
- **Peringatan Penting (Urgent Alert):** Jika terdapat pesan bersifat *Urgent*, pita teks otomatis berubah merah (*alert mode*) dengan ikon peringatan berkedip untuk menarik perhatian.
- **Auto-Refresh Data:** Layar otomatis memperbarui data dari *server* setiap 60 detik tanpa perlu *refresh* halaman secara manual.

### 🔐 2. Panel Admin (Content Management System)
- **Secure Authentication:** Dilindungi oleh login berbasis JWT (*JSON Web Tokens*) untuk memastikan hanya administrator yang dapat mengelola konten.
- **Dashboard Overview:** Melihat statistik jumlah foto dan pengumuman yang sedang aktif.
- **Gallery Manager:** Mengunggah, mengedit, dan menghapus gambar untuk *slideshow*.
- **Running Text Manager:** Menambah, mengubah status, mengedit, dan menghapus pengumuman.
- **Settings:** Pengaturan untuk mengubah *password* administrator dengan aman.

---

## 🛠️ Teknologi yang Digunakan
- **Frontend:** React.js (Vite), Tailwind CSS, Lucide React (Icons).
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB (menggunakan Mongoose ORM).
- **Security:** bcryptjs (Enkripsi Password), JSON Web Token (JWT).

---

## 🚀 Cara Menjalankan Proyek di Komputer Lokal

Proyek ini terbagi menjadi dua bagian utama: `frontend` dan `backend`. Keduanya harus dijalankan secara bersamaan agar aplikasi berfungsi penuh.

### Langkah 1: Jalankan Backend Server
1. Buka terminal baru dan masuk ke folder `backend`.
   ```bash
   cd backend
   ```
2. Install dependensi (hanya saat pertama kali).
   ```bash
   npm install
   ```
3. Jalankan server (Mode Development).
   ```bash
   npm run dev
   ```
   *Pesan "Server running on port 5003" dan "MongoDB Connected" akan muncul jika berhasil.*

### Langkah 2: Jalankan Frontend Server
1. Buka terminal baru (biarkan terminal backend tetap berjalan) dan masuk ke folder `frontend`.
   ```bash
   cd frontend
   ```
2. Install dependensi (hanya saat pertama kali).
   ```bash
   npm install
   ```
3. Jalankan Vite server.
   ```bash
   npm run dev
   ```
4. Buka tautan yang muncul di terminal (contoh: `http://localhost:5174`) di *browser* Anda untuk melihat layar Display Publik.

---

## 🔑 Akses Administrator
Aplikasi ini otomatis membuatkan akun admin standar (Default) pada saat database pertama kali terhubung. 

Akses CMS / Admin Panel melalui URL:
`http://localhost:5174/admin`

Gunakan kredensial berikut untuk login:
- **Username:** `admin`
- **Password:** `admin123`

*(Sangat disarankan untuk segera mengubah password ini melalui menu **Settings**).*

---

## 📞 Informasi Kontak & Dukungan (Contact Person)

Jika Anda memiliki pertanyaan, kendala teknis, atau ingin mendiskusikan kustomisasi lebih lanjut untuk sistem Signage ini, silakan hubungi tim pengembang:

- **Nama / Tim:** [Nama Anda / BudiLab]
- **Email:** [email.anda@domain.com]
- **WhatsApp / Telepon:** [+62 8XX-XXXX-XXXX]
- **Departemen:** [Lab IT / Humas]

*(Silakan hapus atau ubah teks di dalam tanda kurung siku `[...]` di atas dengan data kontak Anda yang sebenarnya).*
