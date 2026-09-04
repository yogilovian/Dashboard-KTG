document.addEventListener("DOMContentLoaded", function () {
    // --- 1. INISIALISASI FUNGSI ---
    initDigitalClock();
    initSidebarLogic();
    initHeaderDate();
    initDinasanFetcher();
    initImageZoom();
    initTrackingClock();
    populateTrackDropdowns();
    populateGanjilDropdowns();
    // HUBUNGKAN DAN LIVE-SYNC DATA DENGAN FIREBASE CLOUD
    listenToCloudDatabase();
    setupCloudAutoSave();
});
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-analytics.js";

// --- 2. LOGIKA BUKA/TUTUP SIDEBAR ---
function initSidebarLogic() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('mySidebar');
    const mainContent = document.querySelector('.main-content');

    if (sidebarToggle && sidebar && mainContent) {
        sidebarToggle.addEventListener('click', function () {
            if (window.innerWidth > 768) {
                sidebar.classList.toggle('hidden');
                mainContent.classList.toggle('full-width');
            } else { 
                sidebar.classList.toggle('active');
            }
        });
    }

    if (closeSidebar && sidebar) {
        closeSidebar.addEventListener('click', function () {
            sidebar.classList.remove('active');
        });
    }
}

// --- 3. JAM DIGITAL & REFRESH PERGANTIAN HARI ---
function initDigitalClock() {
    const clockElement = document.getElementById('live-clock');
    if (!clockElement) return;

    let currentDayIndex = new Date().getDate();

    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('id-ID', { hour12: false });
        
        clockElement.innerText = `${timeString} WIB`;

        // Auto reload saat berganti hari
        if (now.getDate() !== currentDayIndex) {
            currentDayIndex = now.getDate();
            window.location.reload();
        }
    }
    updateTime();
    setInterval(updateTime, 1000);
}

// --- 4. TAMPILKAN TANGGAL HEADER ---
function initHeaderDate() {
    const dateElement = document.getElementById("current-date");
    if (!dateElement) return;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.innerText = new Date().toLocaleDateString('id-ID', options);
}
// 4.1. Mengisi Tanggal Pendek di Board Card (Contoh: 04-09-2026)
    const boardDateElement = document.getElementById("board-date");
    if (boardDateElement) {
        // Format tanggal ringkas DD-MM-YYYY sesuai standar papan operasional
        const tglSistem = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
        boardDateElement.innerText = tglSistem;
    }

// --- 5. AMBIL DATA DINASAN DARI CSV ---
function initDinasanFetcher() {
    // Format tanggal target ke YYYY-MM-DD sesuai ISO lokal
    const today = new Date();
    const targetDate = today.getFullYear() + '-' + 
                       String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                       String(today.getDate()).padStart(2, '0');

    fetch('data_dinas.csv')
        .then(response => {
            if (!response.ok) throw new Error("File CSV tidak ditemukan");
            return response.text();
        })
        .then(csvText => {
            parseCSVAndRender(csvText, targetDate);
        })
        .catch(err => {
            console.error("Gagal membaca file data dinasan (.csv): ", err);
        });
}

function parseCSVAndRender(csvText, targetDate) {
    const lines = csvText.split('\n');
    const elementIds = [
        'ppka-pagi', 'ppka-siang', 'ppka-malam',
        'plr-pagi', 'plr-siang', 'plr-malam',
        'prs-pagi', 'prs-siang', 'prs-malam'
    ];

    // Reset kontainer HTML dengan aman
    elementIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = '';
    });

    let counters = Object.fromEntries(elementIds.map(id => [id, 0]));

    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;

        // Menggunakan regex untuk split agar aman dari celah koma di dalam teks jika ada
        const columns = lines[i].split(',');
        if (columns.length < 5) continue; 
        
        const tanggal = columns[0].trim();
        const nama = columns[1].trim();
        const kelompok = columns[2].trim().toLowerCase();
        const shift = columns[3].trim().toLowerCase();
        const foto = columns[4].trim();

        if (tanggal === targetDate) {
            const targetId = `${kelompok}-${shift}`;
            const targetElement = document.getElementById(targetId);
            
            if (targetElement && elementIds.includes(targetId)) {
                const profileHTML = `
                    <div class="staff-profile">
                        <div class="avatar-circle">
                            <img src="images/${foto}" alt="${nama}" onerror="this.src='https://placehold.co'">
                        </div>
                        <div class="staff-name">${nama}</div>
                    </div>
                `;
                targetElement.innerHTML += profileHTML;
                counters[targetId]++;
            }
        }
    }

    // Beri info jika shift kosong
    elementIds.forEach(id => {
        const el = document.getElementById(id);
        if (el && counters[id] === 0) {
            el.innerHTML = "<p style='color:#888;font-size:11px;padding:5px;'>Tidak Ada Dinasan</p>";
        }
    });
}

// --- 6. LOGIKA ZOOM GAMBAR ---
function initImageZoom() {
    const img = document.getElementById('static-img');
    if (!img) return;

    img.addEventListener('click', function () {
        this.classList.toggle('zoomed');
    });
}

// Script khusus halaman pantauan stopblok
  const firebaseConfig = {
    apiKey: "AIzaSyD2iwBlXPV32UpjO-6Svp-33BFpnCmo6cQ",
    authDomain: "dashboard-ketapang.firebaseapp.com",
    projectId: "dashboard-ketapang",
    storageBucket: "dashboard-ketapang.firebasestorage.app",
    messagingSenderId: "893363056589",
    appId: "1:893363056589:web:a070059c7819255d9bde84",
    measurementId: "G-5SE78JZH03"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

    // Array berisi daftar nomor KA operasional di Stasiun Ketapang
    const daftarNoKA =[211, 212, 147, 148, 293, 294, 159, 160, 249, 250, 279, 280, 492, 492, 297, 298, 209, 210, 239, 240, 7045, 7046];

    // --- LOGIKA UTAMA: SINKRONISASI OTOMATIS ANTAR-PERANGKAT (REAL-TIME CLOUD) ---

    // Fungsi Mendengarkan Perubahan Data Cloud (Device Lain Mengisi -> Layar Ini Otomatis Update)
    function listenToCloudDatabase() {
        const boardRef = database.ref('pantauan_stopblok_ketapang');
        
        boardRef.on('value', (snapshot) => {
            const data = snapshot.val();
            if (!data) return;

            // Kembalikan semua nilai Input Text & Textarea dari Cloud
            const inputs = document.querySelectorAll(".table-textarea, .custom-input, .manual-textarea");
            inputs.forEach((input, idx) => {
                const saveId = input.getAttribute("data-save-id") || `input-field-${idx}`;
                if (!input.getAttribute("data-save-id")) input.setAttribute("data-save-id", saveId);
                
                // Pastikan fokus ketikan tidak terganggu saat sinkronisasi data masuk
                if (data[saveId] !== undefined && document.activeElement !== input) {
                    input.value = data[saveId];
                }
            });

            // Kembalikan semua pilihan Dropdown dari Cloud
            document.querySelectorAll(".track-dropdown, .ganjil-dropdown").forEach((select, idx) => {
                const saveId = select.getAttribute("data-save-id") || `${select.classList.contains('track-dropdown')?'track':'ganjil'}-select-${idx}`;
                if (!select.getAttribute("data-save-id")) select.setAttribute("data-save-id", saveId);

                if (data[saveId] !== undefined) {
                    select.value = data[saveId];
                    
                    // Munculkan textarea manual jika di cloud statusnya terpilih 'custom'
                    if (select.classList.contains("track-dropdown")) {
                        const container = select.nextElementSibling;
                        if (container) {
                            if (data[saveId] === "custom") {
                                container.classList.remove("hidden-input");
                            } else {
                                container.classList.add("hidden-input");
                            }
                        }
                    }
                }
            });
        });
    }

    // Fungsi Pengiriman Data ke Cloud (Setiap Ketikan / Perubahan Pilihan Langsung Terkirim Global)
    function setupCloudAutoSave() {
        const boardRef = database.ref('pantauan_stopblok_ketapang');

        // Deteksi ketikan pada textarea & manual input
        const inputs = document.querySelectorAll(".table-textarea, .custom-input, .manual-textarea");
        inputs.forEach((input, idx) => {
            const saveId = input.getAttribute("data-save-id") || `input-field-${idx}`;
            
            input.addEventListener("input", function() {
                boardRef.child(saveId).set(input.value);
            });
        });

        // Deteksi perubahan pada pilihan dropdown jalur maupun keterangan ganjil
        document.querySelectorAll(".track-dropdown, .ganjil-dropdown").forEach((select, idx) => {
            const saveId = select.getAttribute("data-save-id") || `${select.classList.contains('track-dropdown')?'track':'ganjil'}-select-${idx}`;
            
            select.addEventListener("change", function() {
                boardRef.child(saveId).set(select.value);
            });
        });
    }

    // 1 & 2. Mengisi Dropdown Kondisi Jalur I - VI (Semua KA + Custom Manual)
    function populateTrackDropdowns() {
        const dropdowns = document.querySelectorAll(".track-dropdown");
        dropdowns.forEach(select => {
            select.innerHTML = "";

            // Pilihan 1: Kosong
            const optEmpty = document.createElement("option");
            optEmpty.value = "";
            optEmpty.text = "- Kosong -";
            select.appendChild(optEmpty);
            
            // Pilihan 2: KPJ
            const optKpj = document.createElement("option");
            optKpj.value = "kpj";
            optKpj.text = "KPJ";
            select.appendChild(optKpj);
            
            // Tambahkan daftar Nomer KA dengan aturan Ganjil (Ex KA) & Genap (KA)
            daftarNoKA.forEach(no => {
                const opt = document.createElement("option");
                opt.value = no;
                if (no % 2 === 0) {
                    opt.text = `KA ${no}`; // Perbaikan: menggunakan backtick (`)
                } else {
                    opt.text = `Ex KA ${no}`; // Perbaikan: menggunakan backtick (`)
                }
                select.appendChild(opt);
            });
            
            // Pilihan Akhir: Isian Kustom Manual
            const optCustom = document.createElement("option");
            optCustom.value = "custom";
            optCustom.text = "📝 Input Manual...";
            select.appendChild(optCustom);
        });
    }

    // Fungsi pengendali jika user memilih "Input Manual..."
    function handleDropdownChange(selectElement) {
            const container = selectElement.nextElementSibling;
            const textareaField = container.querySelector(".manual-textarea");
            const saveId = selectElement.getAttribute("data-save-id");
            
            if (selectElement.value === "custom") {
                container.classList.remove("hidden-input");
                textareaField.focus();
            } else {
                container.classList.add("hidden-input");
                textareaField.value = "";
                database.ref('pantauan_stopblok_ketapang').child(textareaField.getAttribute("data-save-id")).remove();
            }
            // Kirim perubahan status dropdown ke Firebase cloud
            database.ref('pantauan_stopblok_ketapang').child(saveId).set(selectElement.value);
    }

// 4. Mengisi Dropdown Keterangan Khusus Nomor KA Ganjil Saja
function populateGanjilDropdowns() {
    const dropdowns = document.querySelectorAll(".ganjil-dropdown");
    dropdowns.forEach(select => {
        select.innerHTML = "";
        
        const optEmpty = document.createElement("option");
        optEmpty.value = "";
        optEmpty.text = "-";
        select.appendChild(optEmpty);
        
        // Filter hanya mengambil No KA yang bernilai Ganjil
        const ganjilKA = daftarNoKA.filter(no => no % 2 !== 0);
        ganjilKA.forEach(no => {
            const opt = document.createElement("option");
            opt.value = no;
            opt.text = `Ex KA ${no}`; // Perbaikan: menggunakan backtick (`)
            select.appendChild(opt);
        });
    });
}
