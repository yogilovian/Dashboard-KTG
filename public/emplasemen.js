/**
 * Interactive Emplasemen Script - Stasiun Ketapang (Daop 9 Jember)
 * GAPEKA 2025 & Blueprint Asli
 */

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
        initEmplasemenInteractive();
    });
} else {
    initEmplasemenInteractive();
}

// Data Master Jalur Emplasemen Stasiun Ketapang dengan Posisi Pin Paten (Fixed)
const KTG_TRACKS_DATA = [
    {
        id: "jalur-1",
        name: "Jalur I",
        alias: "Peron 1 (Kedatangan/Keberangkatan)",
        totalLength: 330,
        effectiveLength: 315,
        grade: "0,5 ‰",
        type: "main",
        defaultStatus: "clear",
        defaultNote: "Siap menerima kedatangan/keberangkatan KA",
        defaultTrainNumber: "",
        defaultStopblokNumber: "",
        capacity: {
            train: "1 LOK + 14 K",
            gt: "1 LOK + 23 GT (KKBR)",
            gdPpcw: "1 LOK + 20 GD (PPCW)",
            gdPkpkw: "1 LOK + 17 GD (PKPKW)"
        },
        description: "Jalur utama langsung bersebelahan dengan Gedung Stasiun & Peron 1. Digunakan untuk pelayanan naik/turun penumpang KA Utama.",
        hotspotCoords: { top: "36%", left: "46%" }
    },
    {
        id: "jalur-2",
        name: "Jalur II",
        alias: "Peron 2 (Sepur Lurus Utama)",
        totalLength: 357,
        effectiveLength: 342,
        grade: "0,1 ‰",
        type: "main",
        defaultStatus: "clear",
        defaultNote: "Jalur lurus sepur raya utama",
        defaultTrainNumber: "",
        defaultStopblokNumber: "",
        capacity: {
            train: "1 LOK + 15 K",
            gt: "1 LOK + 26 GT (KKBR)",
            gdPpcw: "1 LOK + 22 GD (PPCW)",
            gdPkpkw: "1 LOK + 19 GD (PKPKW)"
        },
        description: "Sepur lurus utama emplasemen Stasiun Ketapang melayani Peron Pulau 2. Prioritas penerimaan KA Jarak Jauh.",
        hotspotCoords: { top: "41%", left: "55%" }
    },
    {
        id: "jalur-3",
        name: "Jalur III",
        alias: "Jalur Pemeriksaan & Langsir",
        totalLength: 373,
        effectiveLength: 358,
        grade: "0,3 ‰",
        type: "main",
        defaultStatus: "clear",
        defaultNote: "Manuver langsir dan pemeriksaan",
        defaultTrainNumber: "",
        defaultStopblokNumber: "",
        capacity: {
            train: "1 LOK + 16 K",
            gt: "1 LOK + 27 GT (KKBR)",
            gdPpcw: "1 LOK + 23 GD (PPCW)",
            gdPkpkw: "1 LOK + 20 GD (PKPKW)"
        },
        description: "Jalur belok untuk kegiatan pemeriksaan sarana harian, langsir lokomotif, serta persilangan KA.",
        hotspotCoords: { top: "44%", left: "48%" }
    },
    {
        id: "jalur-4",
        name: "Jalur IV",
        alias: "Stabling KPJ & Cadangan",
        totalLength: 351,
        effectiveLength: 336,
        grade: "0,3 ‰",
        type: "main",
        defaultStatus: "stopblok",
        defaultNote: "Terpasang Stopblok Pengaman - Rangkaian KPJ Siaga",
        defaultTrainNumber: "KPJ D9/10426",
        defaultStopblokNumber: "SB-04",
        capacity: {
            train: "1 LOK + 15 K",
            gt: "1 LOK + 25 GT (KKBR)",
            gdPpcw: "1 LOK + 21 GD (PPCW)",
            gdPkpkw: "1 LOK + 19 GD (PKPKW)"
        },
        description: "Jalur stabling khusus untuk KPJ (Kereta Penolong / Crane Siaga) dan penempatan rangkaian siap operasi.",
        hotspotCoords: { top: "48%", left: "52%" }
    },
    {
        id: "jalur-5",
        name: "Jalur V",
        alias: "Jalur Simpan Cadangan",
        totalLength: 348,
        effectiveLength: 333,
        grade: "0,5 ‰",
        type: "main",
        defaultStatus: "clear",
        defaultNote: "Bebas stabling cadangan",
        defaultTrainNumber: "",
        defaultStopblokNumber: "",
        capacity: {
            train: "1 LOK + 15 K",
            gt: "1 LOK + 25 GT (KKBR)",
            gdPpcw: "1 LOK + 21 GD (PPCW)",
            gdPkpkw: "1 LOK + 19 GD (PKPKW)"
        },
        description: "Jalur simpan rangkaian kereta cadangan serta pemindahan gerbong kargo.",
        hotspotCoords: { top: "52%", left: "45%" }
    },
    {
        id: "jalur-6",
        name: "Jalur VI",
        alias: "Jalur Simpan Panjang",
        totalLength: 393,
        effectiveLength: 378,
        grade: "0,4 ‰",
        type: "main",
        defaultStatus: "stopblok",
        defaultNote: "Terpasang stopblok pengaman ujung sepur",
        defaultTrainNumber: "",
        defaultStopblokNumber: "SB-06",
        capacity: {
            train: "1 LOK + 17 K",
            gt: "1 LOK + 29 GT (KKBR)",
            gdPpcw: "1 LOK + 24 GD (PPCW)",
            gdPkpkw: "1 LOK + 21 GD (PKPKW)"
        },
        description: "Jalur terpanjang di emplasemen Stasiun Ketapang (393m). Digunakan untuk stabling rangkaian panjang atau kargo.",
        hotspotCoords: { top: "56%", left: "50%" }
    },
    {
        id: "jalur-bongkar",
        name: "Jalur Bongkar",
        alias: "Sepur Simpang Kargo",
        totalLength: 110,
        effectiveLength: 103,
        grade: "0,5 ‰",
        type: "facility",
        defaultStatus: "clear",
        defaultNote: "Area bongkar muat logistik semen & barang",
        defaultTrainNumber: "",
        defaultStopblokNumber: "",
        capacity: {
            train: "1 LOK + 4 K",
            gt: "1 LOK + 7 GT (KKBR)",
            gdPpcw: "1 LOK + 6 GD (PPCW)",
            gdPkpkw: "1 LOK + 5 GD (PKPKW)"
        },
        description: "Sepur simpang area bongkar muat semen/logistik barang Stasiun Ketapang.",
        hotspotCoords: { top: "32%", left: "61%" }
    },
    {
        id: "jalur-cuci-1",
        name: "Jalur Cuci 1",
        alias: "Fasilitas Pencucian Kereta 1",
        totalLength: 248,
        effectiveLength: 240,
        grade: "0,5 ‰",
        type: "facility",
        defaultStatus: "occupied",
        defaultNote: "Stabling Cuci Rangkaian Aktif",
        defaultTrainNumber: "KA 293 Tawangalun",
        defaultStopblokNumber: "",
        capacity: {
            train: "1 LOK + 10 K",
            gt: "1 LOK + 18 GT (KKBR)",
            gdPpcw: "1 LOK + 15 GD (PPCW)",
            gdPkpkw: "1 LOK + 13 GD (PKPKW)"
        },
        description: "Jalur khusus instalasi pencucian, pembersihan, dan pengisian air rangkaian kereta api.",
        hotspotCoords: { top: "30%", left: "19%" }
    },
    {
        id: "jalur-cuci-2",
        name: "Jalur Cuci 2",
        alias: "Fasilitas Pencucian Kereta 2",
        totalLength: 252,
        effectiveLength: 244,
        grade: "0,5 ‰",
        type: "facility",
        defaultStatus: "occupied",
        defaultNote: "Stabling Cuci KA Eksekutif",
        defaultTrainNumber: "KA 147 Blambangan",
        defaultStopblokNumber: "",
        capacity: {
            train: "1 LOK + 10 K",
            gt: "1 LOK + 18 GT (KKBR)",
            gdPpcw: "1 LOK + 15 GD (PPCW)",
            gdPkpkw: "1 LOK + 13 GD (PKPKW)"
        },
        description: "Jalur pencucian dan perawatan eksterior/interior rangkaian KA Jarak Jauh.",
        hotspotCoords: { top: "35%", left: "21%" }
    }
];

// Data Jadwal Kereta Api Berdasarkan Halaman Daftar Jalur (GAPEKA 2025 & PDPS Ketapang)
let GAPEKA_TRAINS_DATA = [
    {
        no: "D9/10426 - D9/10131",
        name: "KPJ",
        relasi: "Ketapang - Kalibaru",
        jamDatang: "22:37",
        jamBerangkat: "00:05",
        masukJalur: "Jalur IV",
        berangkatJalur: "Jalur IV",
        stablingJalur: "Jalur IV"
    },
    {
        no: "211F - 212F",
        name: "Mutiara Timur",
        relasi: "Ketapang - Surabaya Gubeng",
        jamDatang: "03:40",
        jamBerangkat: "08:40",
        masukJalur: "Jalur II",
        berangkatJalur: "Jalur I",
        stablingJalur: "Cuci 1"
    },
    {
        no: "147 - 148",
        name: "Blambangan Ekspres",
        relasi: "Ketapang - Pasar Senen",
        jamDatang: "04:40",
        jamBerangkat: "15:45",
        masukJalur: "Jalur II",
        berangkatJalur: "Jalur I",
        stablingJalur: "Cuci 2"
    },
    {
        no: "293 - 294",
        name: "Tawangalun",
        relasi: "Ketapang - Malang",
        jamDatang: "23:55",
        jamBerangkat: "05:00",
        masukJalur: "Jalur I",
        berangkatJalur: "Jalur I",
        stablingJalur: "Cuci 1"
    },
    {
        no: "159 - 160",
        name: "Wijayakusuma",
        relasi: "Ketapang - Pasarsenen",
        jamDatang: "05:40",
        jamBerangkat: "11:00",
        masukJalur: "Jalur II",
        berangkatJalur: "Jalur I",
        stablingJalur: "Cuci 2"
    },
    {
        no: "249 - 250",
        name: "Logawa",
        relasi: "Ketapang - Purwokerto",
        jamDatang: "21:20",
        jamBerangkat: "06:15",
        masukJalur: "Jalur II",
        berangkatJalur: "Jalur I",
        stablingJalur: "Cuci 2"
    },
    {
        no: "279 - 280",
        name: "Sritanjung",
        relasi: "Ketapang - Lempuyangan",
        jamDatang: "20:00",
        jamBerangkat: "07:15",
        masukJalur: "Jalur I",
        berangkatJalur: "Jalur III",
        stablingJalur: "Cuci 1 - Jalur III"
    },
    {
        no: "491 - 492",
        name: "Pandanwangi",
        relasi: "Ketapang - Jember",
        jamDatang: "07:45",
        jamBerangkat: "10:00",
        masukJalur: "Jalur III",
        berangkatJalur: "Jalur III",
        stablingJalur: "Jalur III"
    },
    {
        no: "297 - 298",
        name: "Probowangi",
        relasi: "Ketapang - Surabaya Gubeng",
        jamDatang: "12:45",
        jamBerangkat: "17:20",
        masukJalur: "Jalur I",
        berangkatJalur: "Jalur I",
        stablingJalur: "Cuci 1"
    },
    {
        no: "209 - 210",
        name: "Mutiara Timur",
        relasi: "Ketapang - Surabaya Gubeng",
        jamDatang: "15:30",
        jamBerangkat: "22:00",
        masukJalur: "Jalur II",
        berangkatJalur: "Jalur I",
        stablingJalur: "Cuci 2"
    },
    {
        no: "239F - 240F",
        name: "Ijen Ekspres",
        relasi: "Ketapang - Malang",
        jamDatang: "14:55",
        jamBerangkat: "19:30",
        masukJalur: "Jalur III",
        berangkatJalur: "Jalur I",
        stablingJalur: "Cuci 1"
    },
    {
        no: "7045a - 7046a",
        name: "Sangkuriang",
        relasi: "Ketapang - Bandung",
        jamDatang: "06:55",
        jamBerangkat: "15:00",
        masukJalur: "Jalur II",
        berangkatJalur: "Jalur I",
        stablingJalur: "Cuci 1"
    }
];

// State Cache Sinkronisasi Cloud (Menggantikan LocalStorage agar tersinkron di semua device)
let currentTrackStatesCache = {};

function getSavedTrackStates() {
    if (Object.keys(currentTrackStatesCache).length > 0) {
        return currentTrackStatesCache;
    }
    const initial = {};
    KTG_TRACKS_DATA.forEach(t => {
        initial[t.id] = {
            status: t.defaultStatus,
            note: t.defaultNote,
            trainNumber: t.defaultTrainNumber || "",
            stopblokNumber: t.defaultStopblokNumber || ""
        };
    });
    return initial;
}

// Mengambil status terkini dari Cloud API (/api/tracks)
async function fetchTrackStatesFromCloud(isInitial = false) {
    try {
        const res = await fetch("/api/tracks");
        if (!res.ok) throw new Error("HTTP " + res.status);
        const data = await res.json();
        if (data.success && data.states) {
            currentTrackStatesCache = data.states;
            updateSummaryStats();
            initHotspotPins();
            updateCloudStatusUI(true, data.timestamp);
        }
    } catch (e) {
        console.warn("Gagal sinkron status jalur dari server cloud:", e);
        updateCloudStatusUI(false);
    }
}

// Menyimpan pembaruan status ke Cloud API (/api/tracks)
async function saveTrackStateToCloud(trackId, stateObj) {
    currentTrackStatesCache[trackId] = stateObj;
    updateSummaryStats();
    initHotspotPins();

    try {
        const res = await fetch("/api/tracks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                trackId: trackId,
                status: stateObj.status,
                trainNumber: stateObj.trainNumber,
                stopblokNumber: stateObj.stopblokNumber,
                note: stateObj.note
            })
        });
        const data = await res.json();
        if (data.success) {
            currentTrackStatesCache = data.states;
            updateCloudStatusUI(true, data.timestamp);
            showToastNotification("Status jalur berhasil disimpan ke Cloud!", "success");

            // Otomatis sinkronkan ke Google Sheets jika akun terhubung
            if (GoogleSheetsService.isConnected()) {
                GoogleSheetsService.syncCurrentStatesToSheet(false);
            }
        }
    } catch (err) {
        console.error("Gagal menyimpan ke cloud:", err);
        showToastNotification("Gagal menyimpan ke cloud. Periksa koneksi.", "error");
        updateCloudStatusUI(false);
    }
}

// Reset status jalur ke default di Cloud
async function resetTrackStateOnCloud(trackId) {
    try {
        const res = await fetch("/api/tracks/reset", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ trackId })
        });
        const data = await res.json();
        if (data.success) {
            currentTrackStatesCache = data.states;
            updateSummaryStats();
            initHotspotPins();
            showToastNotification("Status jalur dikembalikan ke kondisi awal", "info");

            if (GoogleSheetsService.isConnected()) {
                GoogleSheetsService.syncCurrentStatesToSheet(false);
            }
        }
    } catch (err) {
        console.error("Gagal reset status di cloud:", err);
    }
}

// UI Badge Status Cloud
function updateCloudStatusUI(isOnline, timestamp) {
    const badge = document.getElementById("cloudStatusBadge");
    const lastSync = document.getElementById("cloudLastSyncText");
    if (!badge) return;

    if (isOnline) {
        badge.className = "cloud-badge active";
        badge.innerHTML = `<span class="cloud-dot"></span> Online &bull; Terhubung Server Cloud`;
        if (lastSync) {
            const timeStr = timestamp ? new Date(timestamp).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) + " WIB" : "Baru saja";
            lastSync.innerHTML = `Status jalur, pemantauan stopblok & KA stabling otomatis tersinkron ke seluruh perangkat tanpa localStorage. Terakhir sinkron: <strong>${timeStr}</strong>`;
        }
    } else {
        badge.className = "cloud-badge offline";
        badge.innerHTML = `<span class="cloud-dot"></span> Menghubungkan ke Server Cloud...`;
    }
}

// Notifikasi Toast
function showToastNotification(message, type = "info") {
    let container = document.querySelector(".ktg-toast-container");
    if (!container) {
        container = document.createElement("div");
        container.className = "ktg-toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `ktg-toast ${type}`;
    const icon = type === "success" ? "ti ti-check" : type === "error" ? "ti ti-alert-triangle" : "ti ti-info-circle";
    toast.innerHTML = `<i class="${icon}" style="font-size: 18px;"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(8px)";
        setTimeout(() => toast.remove(), 250);
    }, 3500);
}

let currentSelectedTrackId = null;

function initEmplasemenInteractive() {
    updateSummaryStats();
    initHotspotPins();
    initModalEvents();
    initBlueprintZoom();
    tryFetchDaftarJalurData();

    // Inisialisasi Sinkronisasi Cloud
    fetchTrackStatesFromCloud(true);
    // Polling setiap 3.5 detik untuk pembaruan real-time antar perangkat
    setInterval(() => fetchTrackStatesFromCloud(false), 3500);

    // Inisialisasi Integrasi Google Sheets
    GoogleSheetsService.init();
}

// Coba ambil data terbaru dari daftar_jalur.html secara asinkron bila memungkinkan
function tryFetchDaftarJalurData() {
    fetch("daftar_jalur.html")
        .then(res => {
            if (!res.ok) throw new Error("HTTP " + res.status);
            return res.text();
        })
        .then(htmlText => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, "text/html");
            const rows = doc.querySelectorAll(".kai-table tbody tr");
            if (rows && rows.length > 0) {
                const fetchedTrains = [];
                rows.forEach(r => {
                    const cells = r.querySelectorAll("td");
                    if (cells.length >= 8) {
                        fetchedTrains.push({
                            no: cells[0].textContent.trim(),
                            name: cells[1].textContent.trim(),
                            relasi: cells[2].textContent.trim(),
                            jamDatang: cells[3].textContent.trim(),
                            jamBerangkat: cells[4].textContent.trim(),
                            masukJalur: cells[5].textContent.trim(),
                            berangkatJalur: cells[6].textContent.trim(),
                            stablingJalur: cells[7].textContent.trim()
                        });
                    }
                });
                if (fetchedTrains.length > 0) {
                    GAPEKA_TRAINS_DATA = fetchedTrains;
                }
            }
        })
        .catch(err => {
            // Menggunakan data cadangan GAPEKA_TRAINS_DATA yang sudah komprehensif
        });
}

function getTrackStatusLabel(status) {
    switch (status) {
        case "clear": return "Bebas";
        case "stopblok": return "Terpasang Stopblok";
        case "occupied": return "Terisi KA / Stabling";
        default: return "Bebas";
    }
}

function updateSummaryStats() {
    const states = getSavedTrackStates();
    let clearCount = 0;
    let stopblokCount = 0;
    let occupiedCount = 0;

    KTG_TRACKS_DATA.forEach(t => {
        const currentStatus = states[t.id]?.status || t.defaultStatus;
        if (currentStatus === "clear") clearCount++;
        else if (currentStatus === "stopblok") stopblokCount++;
        else if (currentStatus === "occupied") occupiedCount++;
    });

    const elTotal = document.getElementById("statTotalJalur");
    const elClear = document.getElementById("statJalurBebas");
    const elStopblok = document.getElementById("statJalurStopblok");
    const elOccupied = document.getElementById("statJalurTerisi");

    if (elTotal) elTotal.innerText = KTG_TRACKS_DATA.length;
    if (elClear) elClear.innerText = clearCount;
    if (elStopblok) elStopblok.innerText = stopblokCount;
    if (elOccupied) elOccupied.innerText = occupiedCount;
}

// Inisialisasi Pin Interaktif Berbentuk Persegi Panjang di atas Blueprint
function initHotspotPins() {
    const overlay = document.getElementById("blueprintPinsOverlay");
    if (!overlay) return;

    overlay.innerHTML = "";
    const states = getSavedTrackStates();

    KTG_TRACKS_DATA.forEach(track => {
        const coords = track.hotspotCoords;
        const state = states[track.id] || {
            status: track.defaultStatus,
            note: track.defaultNote,
            trainNumber: track.defaultTrainNumber || "",
            stopblokNumber: track.defaultStopblokNumber || ""
        };
        const currentStatus = state.status || track.defaultStatus;

        // Buat pin persegi panjang
        const pin = document.createElement("div");
        pin.className = `track-hotspot ${currentStatus}`;
        pin.id = `hotspot-${track.id}`;
        pin.setAttribute("data-track-id", track.id);
        pin.style.top = coords.top;
        pin.style.left = coords.left;

        // Tampilkan info ekstra pada pin jika ada nomor rangkaian atau nomor stopblok
        let extraBadge = "";
        if (state.trainNumber) {
            extraBadge = `<span class="track-hotspot-extra" title="Rangkaian: ${state.trainNumber}">🚆 ${state.trainNumber}</span>`;
        } else if (state.stopblokNumber) {
            extraBadge = `<span class="track-hotspot-extra" title="Stopblok: ${state.stopblokNumber}">🛑 ${state.stopblokNumber}</span>`;
        }

        pin.innerHTML = `
            <span class="track-hotspot-name">${track.name}</span>
            <div class="track-hotspot-label">
                ${track.name} &bull; ${getTrackStatusLabel(currentStatus)}
                ${state.trainNumber ? `<br>🚆 Rangkaian: ${state.trainNumber}` : ""}
                ${state.stopblokNumber ? `<br>🛑 Stopblok: ${state.stopblokNumber}` : ""}
            </div>
        `;

        pin.addEventListener("click", (e) => {
            e.stopPropagation();
            openTrackModal(track.id);
        });

        overlay.appendChild(pin);
    });
}

// Filter dan kumpulkan KA Masuk, Berangkat, Stabling untuk jalur tertentu
function getScheduleForTrack(track) {
    const normalize = (str) => (str || "").toLowerCase().replace(/\s+/g, "");

    let targetKey = "";
    if (track.id === "jalur-1") targetKey = "jaluri";
    else if (track.id === "jalur-2") targetKey = "jalurii";
    else if (track.id === "jalur-3") targetKey = "jaluriii";
    else if (track.id === "jalur-4") targetKey = "jaluriv";
    else if (track.id === "jalur-5") targetKey = "jalurv";
    else if (track.id === "jalur-6") targetKey = "jalurvi";
    else if (track.id === "jalur-cuci-1") targetKey = "cuci1";
    else if (track.id === "jalur-cuci-2") targetKey = "cuci2";
    else if (track.id === "jalur-bongkar") targetKey = "bongkar";

    const incoming = [];
    const outgoing = [];
    const stabling = [];

    GAPEKA_TRAINS_DATA.forEach(t => {
        const m = normalize(t.masukJalur);
        const b = normalize(t.berangkatJalur);
        const s = normalize(t.stablingJalur);

        if (m.includes(targetKey)) {
            incoming.push(t);
        }
        if (b.includes(targetKey)) {
            outgoing.push(t);
        }
        if (s.includes(targetKey)) {
            stabling.push(t);
        }
    });

    return { incoming, outgoing, stabling };
}

function renderTrainItemHtml(item, type) {
    let timeLabel = "";
    if (type === "masuk") {
        timeLabel = `<span class="schedule-train-time"><i class="ti ti-clock"></i> Datang: ${item.jamDatang} WIB</span>`;
    } else if (type === "berangkat") {
        timeLabel = `<span class="schedule-train-time"><i class="ti ti-clock"></i> Berangkat: ${item.jamBerangkat} WIB</span>`;
    } else {
        timeLabel = `<span class="schedule-train-time"><i class="ti ti-clock"></i> Jam: ${item.jamDatang} - ${item.jamBerangkat}</span>`;
    }

    return `
        <div class="schedule-train-item">
            <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 6px;">
                <span class="schedule-train-no">${item.no}</span>
                <span class="schedule-train-name">${item.name}</span>
            </div>
            <div style="font-size: 11px; color: #475569; margin-top: 2px;">${item.relasi}</div>
            ${timeLabel}
        </div>
    `;
}

function openTrackModal(trackId) {
    const track = KTG_TRACKS_DATA.find(t => t.id === trackId);
    if (!track) return;

    currentSelectedTrackId = trackId;
    const states = getSavedTrackStates();
    const currentState = states[trackId] || {
        status: track.defaultStatus,
        note: track.defaultNote,
        trainNumber: track.defaultTrainNumber || "",
        stopblokNumber: track.defaultStopblokNumber || ""
    };

    const modal = document.getElementById("trackModalOverlay");
    if (!modal) return;

    document.getElementById("modalTrackTitle").innerText = `${track.name} - ${track.alias}`;
    document.getElementById("modalTotalLength").innerText = `${track.totalLength} m`;
    document.getElementById("modalEffectiveLength").innerText = `${track.effectiveLength} m`;
    document.getElementById("modalGrade").innerText = track.grade;
    document.getElementById("modalDescription").innerText = track.description;

    document.getElementById("modalCapTrain").innerText = track.capacity.train;
    document.getElementById("modalCapGt").innerText = track.capacity.gt;
    document.getElementById("modalCapGdPpcw").innerText = track.capacity.gdPpcw;
    document.getElementById("modalCapGdPkpkw").innerText = track.capacity.gdPkpkw;

    // Ambil data jadwal KA dari GAPEKA 2025 / Daftar Jalur
    const schedules = getScheduleForTrack(track);

    const inContainer = document.getElementById("modalIncomingTrainsList");
    const outContainer = document.getElementById("modalOutgoingTrainsList");
    const stabContainer = document.getElementById("modalStablingTrainsList");

    if (inContainer) {
        if (schedules.incoming.length > 0) {
            inContainer.innerHTML = schedules.incoming.map(t => renderTrainItemHtml(t, "masuk")).join("");
        } else {
            inContainer.innerHTML = `<div class="schedule-empty-note">- Tidak ada KA masuk terjadwal -</div>`;
        }
    }

    if (outContainer) {
        if (schedules.outgoing.length > 0) {
            outContainer.innerHTML = schedules.outgoing.map(t => renderTrainItemHtml(t, "berangkat")).join("");
        } else {
            outContainer.innerHTML = `<div class="schedule-empty-note">- Tidak ada KA berangkat terjadwal -</div>`;
        }
    }

    if (stabContainer) {
        if (schedules.stabling.length > 0) {
            stabContainer.innerHTML = schedules.stabling.map(t => renderTrainItemHtml(t, "stabling")).join("");
        } else {
            stabContainer.innerHTML = `<div class="schedule-empty-note">- Tidak ada stabling terjadwal -</div>`;
        }
    }

    // Set status radio buttons
    const radios = document.querySelectorAll('input[name="trackStatusRadio"]');
    radios.forEach(r => {
        r.checked = (r.value === currentState.status);
        const parent = r.closest(".status-radio-label");
        if (parent) {
            if (r.checked) parent.classList.add("selected");
            else parent.classList.remove("selected");
        }
    });

    // Set input values untuk Nomor Rangkaian, Nomor Stopblok, dan Catatan
    const inputTrain = document.getElementById("trackTrainNumberInput");
    const inputStopblok = document.getElementById("trackStopblokNumberInput");
    const noteInput = document.getElementById("trackNoteInput");

    if (inputTrain) inputTrain.value = currentState.trainNumber || "";
    if (inputStopblok) inputStopblok.value = currentState.stopblokNumber || "";
    if (noteInput) noteInput.value = currentState.note || "";

    modal.classList.add("active");
}

function initModalEvents() {
    const modal = document.getElementById("trackModalOverlay");
    const btnClose = document.getElementById("modalCloseBtn");
    const btnCancel = document.getElementById("modalCancelBtn");
    const btnSave = document.getElementById("modalSaveBtn");
    const btnResetTrack = document.getElementById("modalResetTrackBtn");

    if (btnClose) btnClose.onclick = closeModal;
    if (btnCancel) btnCancel.onclick = closeModal;

    if (modal) {
        modal.onclick = (e) => {
            if (e.target === modal) closeModal();
        };
    }

    // Radio style change listener
    const radios = document.querySelectorAll('input[name="trackStatusRadio"]');
    radios.forEach(r => {
        r.addEventListener("change", function () {
            radios.forEach(other => {
                const parent = other.closest(".status-radio-label");
                if (parent) parent.classList.remove("selected");
            });
            const p = this.closest(".status-radio-label");
            if (p) p.classList.add("selected");
        });
    });

    if (btnSave) {
        btnSave.onclick = function () {
            if (!currentSelectedTrackId) return;

            const selectedRadio = document.querySelector('input[name="trackStatusRadio"]:checked');
            const newStatus = selectedRadio ? selectedRadio.value : "clear";
            
            const inputTrain = document.getElementById("trackTrainNumberInput");
            const inputStopblok = document.getElementById("trackStopblokNumberInput");
            const noteInput = document.getElementById("trackNoteInput");

            const newTrain = inputTrain ? inputTrain.value.trim() : "";
            const newStopblok = inputStopblok ? inputStopblok.value.trim() : "";
            const newNote = noteInput ? noteInput.value.trim() : "";

            const stateObj = {
                status: newStatus,
                trainNumber: newTrain,
                stopblokNumber: newStopblok,
                note: newNote || (newStatus === "clear" ? "Jalur Bebas" : newStatus === "stopblok" ? "Terpasang Stopblok" : "Terisi Rangkaian KA")
            };

            saveTrackStateToCloud(currentSelectedTrackId, stateObj);
            closeModal();
        };
    }

    if (btnResetTrack) {
        btnResetTrack.onclick = function () {
            if (!currentSelectedTrackId) return;
            resetTrackStateOnCloud(currentSelectedTrackId);
            closeModal();
        };
    }
}

function closeModal() {
    const modal = document.getElementById("trackModalOverlay");
    if (modal) modal.classList.remove("active");
    currentSelectedTrackId = null;
}

// Blueprint Zoom Controller
function initBlueprintZoom() {
    const btnZoomIn = document.getElementById("btnZoomInBlueprint");
    const btnZoomOut = document.getElementById("btnZoomOutBlueprint");
    const btnReset = document.getElementById("btnResetZoomBlueprint");
    const stage = document.getElementById("blueprintStage");

    if (!stage) return;

    let currentScale = 1.0;

    const applyScale = () => {
        stage.style.transform = `scale(${currentScale})`;
        stage.style.transformOrigin = "center center";
        stage.style.transition = "transform 0.2s ease-out";
    };

    if (btnZoomIn) {
        btnZoomIn.addEventListener("click", () => {
            if (currentScale < 2.5) {
                currentScale = Math.min(2.5, +(currentScale + 0.2).toFixed(2));
                applyScale();
            }
        });
    }

    if (btnZoomOut) {
        btnZoomOut.addEventListener("click", () => {
            if (currentScale > 0.6) {
                currentScale = Math.max(0.6, +(currentScale - 0.2).toFixed(2));
                applyScale();
            }
        });
    }

    if (btnReset) {
        btnReset.addEventListener("click", () => {
            currentScale = 1.0;
            applyScale();
        });
    }
}

// === LAYANAN GOOGLE SHEETS API & GOOGLE DRIVE INTEGRATION ===
const GoogleSheetsService = {
    tokenClient: null,
    accessToken: null,
    spreadsheetId: null,
    spreadsheetUrl: null,
    clientId: "186406862864-in4aeul1p7hsebl8a8ml8ombr8vpto4b.apps.googleusercontent.com",
    scopes: "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.file",

    async init() {
        // Ambil info Google Sheet dari backend
        try {
            const res = await fetch("/api/sheets-info");
            if (res.ok) {
                const info = await res.json();
                if (info.spreadsheetId) {
                    this.spreadsheetId = info.spreadsheetId;
                    this.spreadsheetUrl = info.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${info.spreadsheetId}/edit`;
                }
            }
        } catch (e) {
            console.warn("Gagal mengambil info sheet:", e);
        }

        try {
            const resConf = await fetch("/api/oauth-config");
            if (resConf.ok) {
                const conf = await resConf.json();
                if (conf.clientId) this.clientId = conf.clientId;
            }
        } catch (e) {}

        this.updateButtonsUI();
        this.bindEvents();
    },

    bindEvents() {
        const btnConnect = document.getElementById("btnConnectGoogleSheets");
        const btnSync = document.getElementById("btnSyncToSheets");
        const btnPull = document.getElementById("btnPullFromSheets");

        if (btnConnect) {
            btnConnect.addEventListener("click", () => {
                this.requestLoginAndSync();
            });
        }
        if (btnSync) {
            btnSync.addEventListener("click", () => {
                if (!this.accessToken) {
                    this.requestLoginAndSync();
                } else {
                    this.syncCurrentStatesToSheet(true);
                }
            });
        }
        if (btnPull) {
            btnPull.addEventListener("click", () => {
                if (!this.accessToken) {
                    this.requestLoginAndSync();
                } else {
                    this.pullFromSheet();
                }
            });
        }
    },

    isConnected() {
        return !!this.accessToken && !!this.spreadsheetId;
    },

    requestLoginAndSync() {
        if (!window.google || !window.google.accounts || !window.google.accounts.oauth2) {
            alert("Google Identity Services sedang dimuat. Mohon tunggu beberapa detik lalu klik kembali.");
            return;
        }

        this.tokenClient = window.google.accounts.oauth2.initTokenClient({
            client_id: this.clientId,
            scope: this.scopes,
            callback: async (resp) => {
                if (resp.error) {
                    console.error("Kesalahan Autentikasi Google:", resp);
                    alert("Gagal autentikasi Google: " + resp.error);
                    return;
                }
                this.accessToken = resp.access_token;
                showToastNotification("Autentikasi Google berhasil!", "success");

                if (!this.spreadsheetId) {
                    await this.createOrFindSpreadsheet();
                } else {
                    await this.syncCurrentStatesToSheet(true);
                }
                this.updateButtonsUI();
            }
        });

        this.tokenClient.requestAccessToken({ prompt: "" });
    },

    async createOrFindSpreadsheet() {
        try {
            showToastNotification("Membuat Google Spreadsheet Operasional...", "info");
            const res = await fetch("https://sheets.googleapis.com/v4/spreadsheets", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    properties: {
                        title: "Emplasemen & Operasional Stasiun Ketapang (KTG)"
                    },
                    sheets: [
                        {
                            properties: {
                                title: "Status_Emplasemen",
                                gridProperties: { frozenRowCount: 1 }
                            }
                        },
                        {
                            properties: {
                                title: "Data_Dinasan",
                                gridProperties: { frozenRowCount: 1 }
                            }
                        }
                    ]
                })
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error?.message || "HTTP " + res.status);
            }

            const sheetData = await res.json();
            this.spreadsheetId = sheetData.spreadsheetId;
            this.spreadsheetUrl = sheetData.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${this.spreadsheetId}/edit`;

            // Simpan info ke server agar semua device tahu ID spreadsheet yang sama
            await fetch("/api/sheets-info", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    spreadsheetId: this.spreadsheetId,
                    spreadsheetUrl: this.spreadsheetUrl
                })
            });

            // Tulis baris data jalur saat ini
            await this.syncCurrentStatesToSheet(false);
            showToastNotification("Google Sheets operasional berhasil dibuat & disinkronkan!", "success");
            this.updateButtonsUI();
        } catch (err) {
            console.error("Gagal membuat Google Spreadsheet:", err);
            alert("Gagal membuat Google Spreadsheet: " + err.message);
        }
    },

    async syncCurrentStatesToSheet(notify = false) {
        if (!this.accessToken || !this.spreadsheetId) return;

        try {
            if (notify) showToastNotification("Mengirim data ke Google Sheets...", "info");
            const states = getSavedTrackStates();
            const rows = [
                ["ID Jalur", "Nama Jalur", "Status Operasional", "Nomor Rangkaian / KA", "Nomor Stopblok", "Catatan Operasional", "Waktu Sinkronisasi (WIB)"]
            ];

            KTG_TRACKS_DATA.forEach(t => {
                const s = states[t.id] || {};
                const statusLabel = s.status === "clear" ? "Bebas" : s.status === "stopblok" ? "Terpasang Stopblok" : "Terisi Rangkaian KA";
                rows.push([
                    t.id,
                    t.name,
                    statusLabel,
                    s.trainNumber || "-",
                    s.stopblokNumber || "-",
                    s.note || "-",
                    new Date().toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "medium" }) + " WIB"
                ]);
            });

            const range = "Status_Emplasemen!A1:G10";
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`;

            const res = await fetch(url, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${this.accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    range: range,
                    majorDimension: "ROWS",
                    values: rows
                })
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error?.message || "HTTP " + res.status);
            }

            // Juga cadangkan data dinasan ke sheet Data_Dinasan jika ada
            this.syncDinasanToSheet();

            // Update timestamp di server
            await fetch("/api/sheets-info", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    spreadsheetId: this.spreadsheetId,
                    spreadsheetUrl: this.spreadsheetUrl
                })
            });

            if (notify) showToastNotification("Data berhasil diperbarui di Google Sheets!", "success");
            this.updateButtonsUI();
        } catch (err) {
            console.error("Gagal sinkron ke Google Sheets:", err);
            if (notify) alert("Gagal mengirim ke Google Sheets: " + err.message);
        }
    },

    async syncDinasanToSheet() {
        if (!this.accessToken || !this.spreadsheetId) return;
        try {
            const resDinas = await fetch("/api/dinas");
            if (!resDinas.ok) return;
            const dinasData = await resDinas.json();
            if (!dinasData.data || !Array.isArray(dinasData.data)) return;

            const rows = [
                ["Tanggal", "Nama Pegawai", "Unit / Kelompok", "Shift", "File Foto", "Waktu Dicatat"]
            ];
            dinasData.data.forEach(d => {
                rows.push([
                    d.tanggal || "-",
                    d.nama || "-",
                    d.unit || "-",
                    d.shift || "-",
                    d.foto || "-",
                    d.createdAt || new Date().toISOString()
                ]);
            });

            const range = "Data_Dinasan!A1:F" + (rows.length + 1);
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`;

            await fetch(url, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${this.accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    range: range,
                    majorDimension: "ROWS",
                    values: rows
                })
            });
        } catch (e) {
            console.warn("Gagal sinkron dinasan ke sheets:", e);
        }
    },

    async pullFromSheet() {
        if (!this.accessToken || !this.spreadsheetId) {
            this.requestLoginAndSync();
            return;
        }

        try {
            showToastNotification("Mengambil status terbaru dari Google Sheets...", "info");
            const range = "Status_Emplasemen!A2:G15";
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${encodeURIComponent(range)}`;

            const res = await fetch(url, {
                headers: { "Authorization": `Bearer ${this.accessToken}` }
            });

            if (!res.ok) throw new Error("Gagal membaca lembar kerja Google Sheets");
            const data = await res.json();

            if (data.values && data.values.length > 0) {
                const updatedBulk = {};
                data.values.forEach(row => {
                    const id = row[0];
                    if (!id) return;
                    const statusText = (row[2] || "").toLowerCase();
                    let status = "clear";
                    if (statusText.includes("stopblok")) status = "stopblok";
                    else if (statusText.includes("terisi") || statusText.includes("stabling")) status = "occupied";

                    updatedBulk[id] = {
                        status: status,
                        trainNumber: (row[3] === "-" ? "" : row[3]) || "",
                        stopblokNumber: (row[4] === "-" ? "" : row[4]) || "",
                        note: (row[5] === "-" ? "" : row[5]) || "",
                        updatedAt: new Date().toISOString()
                    };
                });

                // Simpan bulk ke server cloud
                const saveRes = await fetch("/api/tracks", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ states: updatedBulk })
                });
                const saveData = await saveRes.json();
                if (saveData.success) {
                    currentTrackStatesCache = saveData.states;
                    updateSummaryStats();
                    initHotspotPins();
                    showToastNotification("Data dari Google Sheets berhasil disinkronkan ke seluruh sistem!", "success");
                }
            } else {
                showToastNotification("Tidak ada baris data di Google Sheets.", "info");
            }
        } catch (err) {
            console.error("Gagal menarik data dari Google Sheets:", err);
            alert("Gagal menarik data dari Google Sheets: " + err.message);
        }
    },

    updateButtonsUI() {
        const btnConnect = document.getElementById("btnConnectGoogleSheets");
        const btnSync = document.getElementById("btnSyncToSheets");
        const btnPull = document.getElementById("btnPullFromSheets");
        const linkOpen = document.getElementById("linkOpenGoogleSheets");

        if (this.spreadsheetId) {
            if (btnConnect) {
                btnConnect.style.background = "#10B981";
                btnConnect.innerHTML = '<i class="ti ti-check"></i> Google Sheets Terhubung';
            }
            if (btnSync) btnSync.style.display = "inline-flex";
            if (btnPull) btnPull.style.display = "inline-flex";
            if (linkOpen) {
                linkOpen.style.display = "inline-flex";
                linkOpen.href = this.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${this.spreadsheetId}/edit`;
            }
        } else {
            if (btnConnect) {
                btnConnect.style.background = "#0F9D58";
                btnConnect.innerHTML = '<i class="ti ti-file-spreadsheet"></i> Hubungkan Google Sheets';
            }
            if (btnSync) btnSync.style.display = "none";
            if (btnPull) btnPull.style.display = "none";
            if (linkOpen) linkOpen.style.display = "none";
        }
    }
};

