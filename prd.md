# Product Requirements Document (PRD) - Simple Event RSVP

## 1. Project Overview
Aplikasi web sederhana untuk undangan acara (Event RSVP) di mana tampilan publik dan informasi acara dapat dikustomisasi secara dinamis melalui Dashboard Admin.

## 2. Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI (khusus untuk Admin Dashboard)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Form Handling & Data Fetching:** Next.js Server Actions (tanpa Route Handlers API terpisah)

## 3. Database Schema (Prisma)
Buat dua model utama:

1. `EventSetting` (Hanya ada 1 baris/record di database untuk pengaturan global):
   - `id` (String/UUID)
   - `title` (String)
   - `description` (Text)
   - `eventDate` (DateTime)
   - `location` (String)
   - `themeColor` (String, default: '#000000' - kode HEX)
   - `coverImageUrl` (String, nullable)

2. `Guest` (Data tamu yang RSVP):
   - `id` (String/UUID)
   - `name` (String)
   - `email` (String, unique)
   - `isAttending` (Boolean)
   - `message` (Text, nullable)
   - `createdAt` (DateTime)

## 4. App Routes
- `/` : Halaman Publik (Undangan & Form RSVP)
- `/admin` : Dashboard Admin (Melihat daftar tamu)
- `/admin/settings` : Dashboard Admin (Form untuk mengedit `EventSetting`)

## 5. Core Features & UX
**A. Halaman Publik (/)**
- Menampilkan `title`, `description`, `eventDate`, `location`, dan `coverImageUrl` dari database.
- Warna utama tombol dan elemen hero menggunakan `themeColor` dari database (Gunakan *inline style* React `style={{ backgroundColor: themeColor }}` untuk elemen ini karena Tailwind tidak bisa memproses kelas dinamis dari database saat build time).
- Terdapat form RSVP (Nama, Email, Hadir/Tidak, Pesan).
- Form menggunakan Next.js Server Actions dengan `useFormStatus` untuk *loading state* dan `useOptimistic` (opsional) agar UI responsif.

**B. Dashboard Admin (/admin)**
- Menampilkan tabel/daftar tamu yang sudah RSVP (`Guest` model).
- Ada ringkasan statistik (Total Hadir, Total Tidak Hadir).

**C. Admin Settings (/admin/settings)**
- Form untuk melakukan operasi UPDATE pada tabel `EventSetting`.
- Setelah di-save, gunakan `revalidatePath('/')` agar perubahan tampilan di halaman publik langsung terjadi tanpa perlu *build* ulang.

## 6. Development Rules untuk AI Agent
- Gunakan TypeScript secara ketat.
- Jangan buat REST API `/api/...` jika bisa menggunakan Server Actions.
- Pisahkan komponen UI menjadi modul-modul kecil (misal: `RsvpForm.tsx`, `GuestList.tsx`).
- Gunakan komponen *Server Components* secara default, dan tambahkan `'use client'` hanya pada komponen interaktif (form, button onClick).