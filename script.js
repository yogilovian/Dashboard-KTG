document.addEventListener("DOMContentLoaded", function () {
initDigitalClock();
    
// --- LOGIKA BUKA/TUTUP SIDEBAR YANG STABIL ---
const sidebarToggle = document.getElementById('sidebarToggle');
const closeSidebar = document.getElementById('closeSidebar');
const sidebar = document.getElementById('mySidebar');
const mainContent = document.querySelector('.main-content');

if (sidebarToggle && sidebar && mainContent) {
    sidebarToggle.addEventListener('click', function () {
        if (window.innerWidth > 768) {
            // Komputer/Laptop
            sidebar.classList.toggle('hidden');
            mainContent.classList.toggle('full-width');
        } else { 
            // Smartphone/Tablet
            sidebar.classList.toggle('active');
        }
    });
}
    // Fungsi khusus menutup sidebar ketika tombol (X) diklik di HP/Tablet
    if (closeSidebar && sidebar) {
        closeSidebar.addEventListener('click', function () {
            sidebar.classList.remove('active'); // Hapus kelas active untuk menyembunyikan menu
        });
    }

    // --- FUNGSIONAL: JAM DIGITAL & AUTO REFRESH PERGANTIAN HARI ---
function initDigitalClock() {
    const clockElement = document.getElementById('live-clock');
    let currentDayIndex = new Date().getDate();

   // Format jam digital ke sistem HH:MM:SS
    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        if (clockElement) {
            clockElement.innerText = `${hours}:${minutes}:${seconds} WIB`;
        }

        // CEK PERGANTIAN HARI: Jika tanggal saat ini berubah dibanding simpanan awal
        if (now.getDate() !== currentDayIndex) {
            currentDayIndex = now.getDate();
            window.location.reload(); // Reload halaman otomatis
        }
    }
     // Jalankan fungsi satu kali di awal agar jam langsung muncul tanpa menunggu 1 detik pertama
    updateTime();

    setInterval(updateTime, 1000); // Interval berjalan setiap 1 detik (1000ms)

}

    // Tampilkan Tanggal Hari ini di Header
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const todayStr = new Date().toLocaleDateString('id-ID', options);
    document.getElementById("current-date").innerText = todayStr;

    // Ambil tanggal format YYYY-MM-DD
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const targetDate = `${year}-${month}-${day}`;

    // Mengambil file data_dinas.csv dari repositori
    fetch('data_dinas.csv')
        .then(response => response.text())
        .then(csvText => {
            parseCSVAndRender(csvText, targetDate);
        })
        .catch(err => {
            console.error("Gagal membaca file data dinasan (.csv): ", err);
        });
});

function parseCSVAndRender(csvText, targetDate) {
    const lines = csvText.split('\n');
    
    // ID Elemen yang ada di HTML
    const elementIds = [
        'ppka-pagi', 'ppka-siang', 'ppka-malam',
        'plr-pagi', 'plr-siang', 'plr-malam',
        'prs-pagi', 'prs-siang', 'prs-malam'
    ];

    // Reset kontainer HTML
    elementIds.forEach(id => {
        document.getElementById(id).innerHTML = '';
    });

    let counters = {};
    elementIds.forEach(id => counters[id] = 0);

    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;

        const columns = lines[i].split(',');
        if (columns.length < 5) continue; 
        
        // Parsing data baris CSV
        // const columns = lines[i].split(',');
        const tanggal = columns[0].trim();
        const nama = columns[1].trim();
        const kelompok = columns[2].trim().toLowerCase(); // ppka, plr, prs
        const shift = columns[3].trim().toLowerCase();    // pagi, siang, malam
        const foto = columns[4].trim();

        // Cocokkan tanggal baris CSV dengan tanggal hari ini
        if (tanggal === targetDate) {
            // Gabungkan kata kunci untuk menembak ID HTML (contoh: 'perjalanan-pagi')
            const targetId = `${kelompok}-${shift}`;
            
            // Periksa apakah gabungan ID tersebut terdaftar di sistem
            if (elementIds.includes(targetId)) {
                const profileHTML = `
                    <div class="staff-profile">
                        <div class="avatar-circle">
                            <img src="images/${foto}" alt="${nama}" onerror="this.src='https://placeholder.com'">
                        </div>
                        <div class="staff-name">${nama}</div>
                    </div>
                `;

                // Masukkan kartu ke dalam ID kontainer yang tepat
                document.getElementById(targetId).innerHTML += profileHTML;
                counters[targetId]++;
            }
        }
    }

    // Pasang pesan kosong jika ada shift kelompok yang tidak terisi data hari ini
    elementIds.forEach(id => {
        if (counters[id] === 0) {
            document.getElementById(id).innerHTML = "<p style='color:#888;font-size:11px;padding:5px;'>Kosong</p>";
        }
    });
    // Inisialisasi Pustaka Zoom & Geser Gambar
        const elem = document.getElementById('panzoom-wrapper');
        const panzoom = Panzoom(elem, {
            maxScale: 5, // Batas maksimal perbesaran (5x lipat)
            minScale: 0.5, // Batas maksimal perkecil
            contain: 'outside', // Gambar tidak akan hilang keluar batas wadah kotak
            startScale: 1
        });

        // Hubungkan fungsi Zoom ke tombol fisik di kanan bawah
        document.getElementById('btn-zoom-in').addEventListener('click', panzoom.zoomIn);
        document.getElementById('btn-zoom-out').addEventListener('click', panzoom.zoomOut);
        document.getElementById('btn-reset').addEventListener('click', panzoom.reset);

        // Aktifkan juga fitur zoom menggunakan Scroll Roda Mouse
        elem.parentElement.addEventListener('wheel', panzoom.zoomWithWheel);
}
