# Dashboard Stasiun Ketapang (Daop 9 Jember)

Aplikasi Dashboard Operasional & Emplasemen Digital Stasiun Ketapang.

## Panduan Deploy ke Google Cloud Run dari GitHub

Jika Anda meng-export repositori ini ke GitHub dan men-deploy ke **Google Cloud Run**, berikut hal-hal penting yang perlu diperhatikan:

### 1. Port Listening (Otomatis)
Google Cloud Run menyuntikkan port melalui variabel lingkungan `PORT` (biasanya `8080`).
Aplikasi ini sudah dikonfigurasi dengan:
- Host: `0.0.0.0`
- Port internal dev container: `3000`

### 2. Opsi Deploy ke Cloud Run

#### Opsi A: Menggunakan Dockerfile (Direkomendasikan)
Repositori ini telah dilengkapi dengan `Dockerfile` multi-stage:
1. Push repository ke GitHub.
2. Buka **Google Cloud Console** -> **Cloud Run** -> **Create Service**.
3. Pilih **Continuously deploy from a repository** (Hubungkan dengan akun GitHub Anda).
4. Pilih repositori dan branch `main`.
5. Build type: Pilih **Dockerfile**.
6. Port container: Biarkan default `8080` (sesuai Dockerfile).
7. Klik **Create**.

#### Opsi B: Menggunakan Google Cloud Buildpacks (Tanpa Dockerfile)
Cloud Run akan otomatis mendeteksi Node.js dan menjalankan:
```bash
npm run build
npm start
```
Skrip `start` di `package.json` akan mengeksekusi `node dist/server.cjs`.

### 3. Persistensi Data
Di Cloud Run, container bersifat *stateless* / sementara. Data di folder `data/` akan diinisialisasi otomatis dari nilai awal jika belum ada.
Jika membutuhkan penyimpanan persisten jangka panjang lintas restart, hubungkan dengan **Cloud Storage / Firestore**.
