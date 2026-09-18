document.addEventListener("DOMContentLoaded", function () {
    // --- 1. INISIALISASI FUNGSI ---
    initDigitalClock();
    initSidebarLogic();
    initHeaderDate();
    initDinasanFetcher();
    initImageZoom();
    // initTrackingClock();
});

// --- 2. LOGIKA BUKA/TUTUP SIDEBAR (RESPONSIF HP, TABLET & DESKTOP) ---
function initSidebarLogic() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('mySidebar');
    const mainContent = document.querySelector('.main-content');

    if (!sidebar) return;

    // Tambahkan ikon tombol jika tombol toggle belum memiliki ikon
    if (sidebarToggle && !sidebarToggle.querySelector('i')) {
        sidebarToggle.innerHTML = `<i class="ti ti-menu-2"></i> <span>Menu</span>`;
    }

    // Buat elemen overlay latar belakang dinamis jika belum ada di DOM
    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        overlay.id = 'sidebarOverlay';
        document.body.appendChild(overlay);
    }

    function openMobileSidebar() {
        sidebar.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Cegah background scrolling saat menu terbuka
    }

    function closeMobileSidebar() {
        sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            if (window.innerWidth > 992) {
                // Mode Desktop: Collapse / Expand sidebar
                sidebar.classList.toggle('hidden');
                if (mainContent) mainContent.classList.toggle('full-width');
            } else {
                // Mode Mobile / Tablet: Drawer slide-in
                if (sidebar.classList.contains('active')) {
                    closeMobileSidebar();
                } else {
                    openMobileSidebar();
                }
            }
        });
    }

    if (closeSidebar) {
        closeSidebar.addEventListener('click', function (e) {
            e.stopPropagation();
            closeMobileSidebar();
        });
    }

    if (overlay) {
        overlay.addEventListener('click', function () {
            closeMobileSidebar();
        });
    }

    // Tutup saat tombol ESC ditekan
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeMobileSidebar();
        }
    });

    // Otomatis reset overflow jika ukuran layar di-resize ke desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth > 992) {
            closeMobileSidebar();
        }
    });

    // Dukungan gestur swipe ke kiri pada sidebar di layar sentuh untuk menutup
    let touchStartX = 0;
    let touchEndX = 0;

    sidebar.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sidebar.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        // Jika swipe ke kiri sejauh lebih dari 50px
        if (touchStartX - touchEndX > 50 && window.innerWidth <= 992) {
            closeMobileSidebar();
        }
    }, { passive: true });
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

// --- 5. AMBIL DATA DINASAN DARI CSV & NAVIGASI TANGGAL ---
let cachedCSVText = null;
let activeDinasDate = null;

function getTodayDateString() {
    const today = new Date();
    return today.getFullYear() + '-' + 
           String(today.getMonth() + 1).padStart(2, '0') + '-' + 
           String(today.getDate()).padStart(2, '0');
}

function shiftDateByDays(dateString, days) {
    const parts = dateString.split('-');
    const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    d.setDate(d.getDate() + days);
    return d.getFullYear() + '-' + 
           String(d.getMonth() + 1).padStart(2, '0') + '-' + 
           String(d.getDate()).padStart(2, '0');
}

function formatDateIndonesian(dateString) {
    const parts = dateString.split('-');
    const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return d.toLocaleDateString('id-ID', options);
}

function initDinasanFetcher() {
    activeDinasDate = getTodayDateString();

    initDateNavControls();

    // Ambil data dinasan dari Cloud API (/api/dinas) dengan fallback otomatis ke CSV lokal
    fetch('/api/dinas')
        .then(response => {
            if (!response.ok) throw new Error("Cloud API dinas tidak tersedia");
            return response.json();
        })
        .then(res => {
            if (res.success && Array.isArray(res.data) && res.data.length > 0) {
                let csvStr = "Tanggal,Nama,Unit,Shift,Foto\n";
                res.data.forEach(item => {
                    csvStr += `${item.tanggal || ''},${item.nama || ''},${item.unit || ''},${item.shift || ''},${item.foto || ''}\n`;
                });
                cachedCSVText = csvStr;
                renderDinasanForDate(activeDinasDate);
            } else {
                throw new Error("Data dinasan kosong");
            }
        })
        .catch(() => {
            fetch('data_dinas.csv')
                .then(response => {
                    if (!response.ok) throw new Error("File CSV tidak ditemukan");
                    return response.text();
                })
                .then(csvText => {
                    cachedCSVText = csvText;
                    renderDinasanForDate(activeDinasDate);
                })
                .catch(err => {
                    console.error("Gagal membaca file data dinasan: ", err);
                });
        });
}

function initDateNavControls() {
    const btnPrev = document.getElementById('btnPrevDay');
    const btnToday = document.getElementById('btnToday');
    const btnNext = document.getElementById('btnNextDay');
    const datePicker = document.getElementById('dinasDatePicker');

    if (btnPrev) {
        btnPrev.addEventListener('click', function () {
            const newDate = shiftDateByDays(activeDinasDate, -1);
            renderDinasanForDate(newDate);
        });
    }

    if (btnToday) {
        btnToday.addEventListener('click', function () {
            renderDinasanForDate(getTodayDateString());
        });
    }

    if (btnNext) {
        btnNext.addEventListener('click', function () {
            const newDate = shiftDateByDays(activeDinasDate, 1);
            renderDinasanForDate(newDate);
        });
    }

    if (datePicker) {
        datePicker.value = activeDinasDate;
        datePicker.addEventListener('change', function () {
            if (this.value) {
                renderDinasanForDate(this.value);
            }
        });
    }
}

function renderDinasanForDate(targetDate) {
    activeDinasDate = targetDate;
    const todayStr = getTodayDateString();
    const yesterdayStr = shiftDateByDays(todayStr, -1);
    const tomorrowStr = shiftDateByDays(todayStr, 1);

    const btnToday = document.getElementById('btnToday');
    const datePicker = document.getElementById('dinasDatePicker');
    const dateBadge = document.getElementById('dateStatusBadge');
    const dateDisplay = document.getElementById('selectedDateDisplay');
    const periodLabels = document.querySelectorAll('.dinas-period-label');

    if (datePicker) {
        datePicker.value = targetDate;
    }

    const formattedDate = formatDateIndonesian(targetDate);
    if (dateDisplay) {
        dateDisplay.innerText = formattedDate;
    }

    // Update status badge & tombol Hari Ini
    if (targetDate === todayStr) {
        if (btnToday) btnToday.classList.add('active');
        if (dateBadge) {
            dateBadge.className = 'date-status-badge today';
            dateBadge.innerHTML = '<i class="ti ti-circle-check-filled"></i> Menampilkan Dinasan Hari Ini (Otomatis)';
        }
        periodLabels.forEach(el => el.innerText = 'Hari Ini');
    } else {
        if (btnToday) btnToday.classList.remove('active');
        if (dateBadge) {
            dateBadge.className = 'date-status-badge custom';
            if (targetDate === yesterdayStr) {
                dateBadge.innerHTML = '<i class="ti ti-history"></i> Menampilkan Arsip Kemarin';
                periodLabels.forEach(el => el.innerText = 'Kemarin (' + formattedDate + ')');
            } else if (targetDate === tomorrowStr) {
                dateBadge.innerHTML = '<i class="ti ti-calendar-forward"></i> Menampilkan Jadwal Besok';
                periodLabels.forEach(el => el.innerText = 'Besok (' + formattedDate + ')');
            } else {
                dateBadge.innerHTML = '<i class="ti ti-calendar"></i> Menampilkan Tanggal Pilihan';
                periodLabels.forEach(el => el.innerText = '(' + formattedDate + ')');
            }
        }
    }

    if (cachedCSVText) {
        parseCSVAndRender(cachedCSVText, targetDate);
    }
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
