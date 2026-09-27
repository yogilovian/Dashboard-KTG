/**
 * Struktur Organisasi & Biodata Petugas - Stasiun Ketapang (KTG) Daop 9 Jember
 * Mendukung Popup Biodata Interaktif, Edit Data, Foto Profil, serta Integrasi Google Sheets Mandiri & Realtime Cloud
 */

const DEFAULT_BIODATA = {
    "ks-efandi": {
        id: "ks-efandi",
        name: "Efandi Setyo Budi",
        role: "Kepala Stasiun (KS)",
        category: "Pimpinan Stasiun",
        nipp: "61245",
        unit: "Pimpinan Operasional Stasiun",
        shift: "Reguler / Dinas Harian (Non-Shift)",
        ttl: "Banyuwangi, 14 Mei 1982",
        phone: "0812-3456-7890",
        address: "Jl. Stasiun Ketapang No. 1, Banyuwangi",
        status: "Pegawai Organik PT KAI (Persero)",
        photo: "images/efandi.jpg",
        notes: "Penanggung jawab operasional, pelayanan, keselamatan, dan tata kelola Stasiun Ketapang.",
        updatedAt: new Date().toISOString()
    },
    "wks-deddy": {
        id: "wks-deddy",
        name: "Deddy Prasetya",
        role: "Wakil Kepala Stasiun",
        category: "Pimpinan Stasiun",
        nipp: "62381",
        unit: "Pimpinan Operasional Stasiun",
        shift: "Reguler / Dinas Harian (Non-Shift)",
        ttl: "Jember, 20 Agustus 1985",
        phone: "0813-2345-6789",
        address: "Perumahan Ketapang Indah Blok B-4, Banyuwangi",
        status: "Pegawai Organik PT KAI (Persero)",
        photo: "images/deddy.jpg",
        notes: "Koordinator wakil operasional harian dan koordinasi lintas unit kerja stasiun.",
        updatedAt: new Date().toISOString()
    },
    "spv-riki": {
        id: "spv-riki",
        name: "Riki Riyanda Saidi",
        role: "Supervisor Customer Care",
        category: "Supervisor",
        nipp: "63490",
        unit: "Customer Care & Pelayanan Penumpang",
        shift: "Reguler / Dinas Harian",
        ttl: "Surabaya, 11 Maret 1988",
        phone: "0812-4567-8901",
        address: "Jl. Gatot Subroto No. 45, Banyuwangi",
        status: "Pegawai Organik PT KAI (Persero)",
        photo: "images/riki.jpg",
        notes: "Pengawas layanan pelanggan, penanganan keluhan, informasi stasiun & fasilitas pengguna jasa.",
        updatedAt: new Date().toISOString()
    },
    "spv-prasetyo": {
        id: "spv-prasetyo",
        name: "Prasetyo Utomo",
        role: "Supervisor Pelayanan",
        category: "Supervisor",
        nipp: "64512",
        unit: "Pelayanan Stasiun & Boarding",
        shift: "Reguler / Dinas Harian",
        ttl: "Malang, 05 Juli 1987",
        phone: "0813-5678-9012",
        address: "Jl. Basuki Rahmat No. 12, Banyuwangi",
        status: "Pegawai Organik PT KAI (Persero)",
        photo: "images/prasetyo.jpg",
        notes: "Supervisi kebersihan stasiun, alur boarding pass, kenyamanan ruang tunggu, dan fasilitas umum.",
        updatedAt: new Date().toISOString()
    },
    "spv-helmi": {
        id: "spv-helmi",
        name: "Helmi Mukti Wibowo",
        role: "Supervisor Perjalanan KA",
        category: "Supervisor",
        nipp: "65189",
        unit: "Operasional & Perjalanan Kereta Api",
        shift: "Reguler / Supervisi Operasional 24 Jam",
        ttl: "Banyuwangi, 28 September 1986",
        phone: "0812-6789-0123",
        address: "Jl. Lingkar Ketapang No. 8, Banyuwangi",
        status: "Pegawai Organik PT KAI (Persero)",
        photo: "images/helmi.jpg",
        notes: "Supervisi langsung kesiapan PPKA, Petugas Langsir (PLR), dan Petugas Rumah Sinyal (PRS).",
        updatedAt: new Date().toISOString()
    },

    // PPKA (Pengatur Perjalanan Kereta Api)
    "ppka-ibrahim": {
        id: "ppka-ibrahim",
        name: "Mohammad Ibrahim",
        role: "Pengatur Perjalanan Kereta Api (PPKA)",
        category: "PPKA",
        nipp: "67101",
        unit: "Operasional & Pengaturan Perjalanan KA",
        shift: "Shift Operasional (Pola 4 Regu A/B/C/D)",
        ttl: "Banyuwangi, 17 Januari 1993",
        phone: "0852-1122-3344",
        address: "Kalipuro, Banyuwangi",
        status: "Pegawai Organik Bersertifikat PPKA",
        photo: "images/ibrahim.jpg",
        notes: "Bertanggung jawab atas persetujuan warta KA, kendali sinyal utama, dan keselamatan jalur masuk/keluar.",
        updatedAt: new Date().toISOString()
    },
    "ppka-fadli": {
        id: "ppka-fadli",
        name: "Akhmad Fadli",
        role: "Pengatur Perjalanan Kereta Api (PPKA)",
        category: "PPKA",
        nipp: "67102",
        unit: "Operasional & Pengaturan Perjalanan KA",
        shift: "Shift Operasional (Pola 4 Regu)",
        ttl: "Jember, 09 Februari 1994",
        phone: "0852-2233-4455",
        address: "Klatak, Kalipuro, Banyuwangi",
        status: "Pegawai Organik Bersertifikat PPKA",
        photo: "images/fadli.jpg",
        notes: "Bertugas di meja pelayanan sinyal dan warta kereta api Stasiun Ketapang.",
        updatedAt: new Date().toISOString()
    },
    "ppka-alif": {
        id: "ppka-alif",
        name: "Alif Solehudin",
        role: "Pengatur Perjalanan Kereta Api (PPKA)",
        category: "PPKA",
        nipp: "67103",
        unit: "Operasional & Pengaturan Perjalanan KA",
        shift: "Shift Operasional (Pola 4 Regu)",
        ttl: "Banyuwangi, 23 Juli 1995",
        phone: "0852-3344-5566",
        address: "Giri, Banyuwangi",
        status: "Pegawai Organik Bersertifikat PPKA",
        photo: "images/alif.jpg",
        notes: "Pengatur pergerakan lokomotif, langsiran stabling, dan keberangkatan KA Jarak Jauh.",
        updatedAt: new Date().toISOString()
    },
    "ppka-teguh": {
        id: "ppka-teguh",
        name: "Teguh Eko Prasetyo",
        role: "Pengatur Perjalanan Kereta Api (PPKA)",
        category: "PPKA",
        nipp: "67104",
        unit: "Operasional & Pengaturan Perjalanan KA",
        shift: "Shift Operasional (Pola 4 Regu)",
        ttl: "Banyuwangi, 15 Desember 1993",
        phone: "0852-4455-6677",
        address: "Ketapang, Kalipuro, Banyuwangi",
        status: "Pegawai Organik Bersertifikat PPKA",
        photo: "images/teguh.jpg",
        notes: "Pengatur perjalanan KA lintas operasional Daop 9 Jember di wilayah stasiun ujung Ketapang.",
        updatedAt: new Date().toISOString()
    },

    // PLR (Petugas Langsir)
    "plr-danial": {
        id: "plr-danial",
        name: "Danial Syukron",
        role: "Petugas Langsir (PLR)",
        category: "PLR",
        nipp: "68201",
        unit: "Langsir & Penyusunan Sarana Rangkaian KA",
        shift: "Shift Operasional",
        ttl: "Banyuwangi, 12 April 1996",
        phone: "0857-1122-8899",
        address: "Ketapang, Banyuwangi",
        status: "Pegawai Operasional Bersertifikat Langsir",
        photo: "images/danial.jpg",
        notes: "Memandu gerakan langsir sarana lokomotif dan kereta di jalur stabling & pencucian.",
        updatedAt: new Date().toISOString()
    },
    "plr-qomarik": {
        id: "plr-qomarik",
        name: "Qomarik Al Faruq",
        role: "Petugas Langsir (PLR)",
        category: "PLR",
        nipp: "68202",
        unit: "Langsir & Penyusunan Sarana Rangkaian KA",
        shift: "Shift Operasional",
        ttl: "Banyuwangi, 03 Agustus 1995",
        phone: "0857-2233-8899",
        address: "Kalisuro, Banyuwangi",
        status: "Pegawai Operasional Bersertifikat Langsir",
        photo: "images/qomarik.jpg",
        notes: "Pelaksana langsir sarana, pemasangan stopblok, dan penguncian rangkaian KA.",
        updatedAt: new Date().toISOString()
    },
    "plr-taufik": {
        id: "plr-taufik",
        name: "Taufik HIdayat",
        role: "Petugas Langsir (PLR)",
        category: "PLR",
        nipp: "68203",
        unit: "Langsir & Penyusunan Sarana Rangkaian KA",
        shift: "Shift Operasional",
        ttl: "Banyuwangi, 21 Oktober 1994",
        phone: "0857-3344-8899",
        address: "Ketapang, Banyuwangi",
        status: "Pegawai Operasional Bersertifikat Langsir",
        photo: "images/taufik.jpg",
        notes: "Bertanggung jawab memastikan stopblok terpasang paten pada roda rangkaian KA yang stabling.",
        updatedAt: new Date().toISOString()
    },
    "plr-yogi": {
        id: "plr-yogi",
        name: "Yogi Lovian Galis Ismanto",
        role: "Petugas Langsir (PLR)",
        category: "PLR",
        nipp: "68204",
        unit: "Langsir & Penyusunan Sarana Rangkaian KA",
        shift: "Shift Operasional",
        ttl: "Banyuwangi, 27 November 1995",
        phone: "0857-4455-8899",
        address: "Banyuwangi Kota",
        status: "Pegawai Operasional Bersertifikat Langsir",
        photo: "images/yogi.jpg",
        notes: "Petugas pandu langsir lokomotif langsir dan verifikasi stopblok jalur I s.d. VI.",
        updatedAt: new Date().toISOString()
    },
    "plr-agung": {
        id: "plr-agung",
        name: "Agung Wahyu Widodo",
        role: "Petugas Langsir (PLR)",
        category: "PLR",
        nipp: "68205",
        unit: "Langsir & Penyusunan Sarana Rangkaian KA",
        shift: "Shift Operasional",
        ttl: "Banyuwangi, 16 Juni 1997",
        phone: "0857-5566-8899",
        address: "Klatak, Banyuwangi",
        status: "Pegawai Operasional Bersertifikat Langsir",
        photo: "images/agung.jpg",
        notes: "Melayani gerakan langsiran KA Sritanjung, Tawangalun, dan rangkaian Wijayakusuma.",
        updatedAt: new Date().toISOString()
    },
    "plr-listianto": {
        id: "plr-listianto",
        name: "Listianto Dwi L",
        role: "Petugas Langsir (PLR)",
        category: "PLR",
        nipp: "68206",
        unit: "Langsir & Penyusunan Sarana Rangkaian KA",
        shift: "Shift Operasional",
        ttl: "Banyuwangi, 08 Mei 1996",
        phone: "0857-6677-8899",
        address: "Ketapang, Banyuwangi",
        status: "Pegawai Operasional Bersertifikat Langsir",
        photo: "images/listianto.jpg",
        notes: "Penyusun formasi kereta dan pengawas keamanan jalur stabling cuci 1 & 2.",
        updatedAt: new Date().toISOString()
    },
    "plr-yoga": {
        id: "plr-yoga",
        name: "Ahmad Yoga Septian",
        role: "Petugas Langsir (PLR)",
        category: "PLR",
        nipp: "68207",
        unit: "Langsir & Penyusunan Sarana Rangkaian KA",
        shift: "Shift Operasional",
        ttl: "Banyuwangi, 01 September 1997",
        phone: "0857-7788-8899",
        address: "Giri, Banyuwangi",
        status: "Pegawai Operasional Bersertifikat Langsir",
        photo: "images/yoga.jpg",
        notes: "Memastikan koordinasi sinyal langsir dan sambungan selang angin pengereman.",
        updatedAt: new Date().toISOString()
    },
    "plr-rafi": {
        id: "plr-rafi",
        name: "Rafi Hartono",
        role: "Petugas Langsir (PLR)",
        category: "PLR",
        nipp: "68208",
        unit: "Langsir & Penyusunan Sarana Rangkaian KA",
        shift: "Shift Operasional",
        ttl: "Banyuwangi, 14 Februari 1998",
        phone: "0857-8899-8899",
        address: "Banyuwangi",
        status: "Pegawai Operasional Bersertifikat Langsir",
        photo: "images/rafi.jpg",
        notes: "Petugas dinas langsir shift stasiun Ketapang.",
        updatedAt: new Date().toISOString()
    },

    // PRS (Petugas Rumah Sinyal)
    "prs-machrus": {
        id: "prs-machrus",
        name: "Machrus Izunnadi",
        role: "Petugas Rumah Sinyal (PRS)",
        category: "PRS",
        nipp: "69301",
        unit: "Persinyalan, Wesel & Rute Jalur",
        shift: "Shift Operasional",
        ttl: "Banyuwangi, 19 Maret 1992",
        phone: "0821-1122-3301",
        address: "Ketapang, Banyuwangi",
        status: "Pegawai Operasional Rumah Sinyal",
        photo: "images/machrus.jpg",
        notes: "Pengendali wesel mekanik/elektrik dan rute aman peron Stasiun Ketapang.",
        updatedAt: new Date().toISOString()
    },
    "prs-batara": {
        id: "prs-batara",
        name: "Batara Linggar Mukti",
        role: "Petugas Rumah Sinyal (PRS)",
        category: "PRS",
        nipp: "69302",
        unit: "Persinyalan, Wesel & Rute Jalur",
        shift: "Shift Operasional",
        ttl: "Banyuwangi, 25 November 1993",
        phone: "0821-2233-3302",
        address: "Kalipuro, Banyuwangi",
        status: "Pegawai Operasional Rumah Sinyal",
        photo: "images/batara.jpg",
        notes: "Petugas operasional rumah sinyal pos barat / timur.",
        updatedAt: new Date().toISOString()
    },
    "prs-deny": {
        id: "prs-deny",
        name: "Deny Prastyo",
        role: "Petugas Rumah Sinyal (PRS)",
        category: "PRS",
        nipp: "69303",
        unit: "Persinyalan, Wesel & Rute Jalur",
        shift: "Shift Operasional",
        ttl: "Banyuwangi, 04 Juli 1994",
        phone: "0821-3344-3303",
        address: "Klatak, Banyuwangi",
        status: "Pegawai Operasional Rumah Sinyal",
        photo: "images/deny.jpg",
        notes: "Pengawas kedudukan lidah wesel dan sinyal keluar stasiun.",
        updatedAt: new Date().toISOString()
    },
    "prs-roby": {
        id: "prs-roby",
        name: "Roby Prasetyo",
        role: "Petugas Rumah Sinyal (PRS)",
        category: "PRS",
        nipp: "69304",
        unit: "Persinyalan, Wesel & Rute Jalur",
        shift: "Shift Operasional",
        ttl: "Banyuwangi, 30 Januari 1995",
        phone: "0821-4455-3304",
        address: "Banyuwangi Kota",
        status: "Pegawai Operasional Rumah Sinyal",
        photo: "images/roby.jpg",
        notes: "Memastikan rute wesel terkunci sempurna sebelum KA melintas.",
        updatedAt: new Date().toISOString()
    },
    "prs-davin": {
        id: "prs-davin",
        name: "Davin Egik Juniardi",
        role: "Petugas Rumah Sinyal (PRS)",
        category: "PRS",
        nipp: "69305",
        unit: "Persinyalan, Wesel & Rute Jalur",
        shift: "Shift Operasional",
        ttl: "Banyuwangi, 18 Juni 1996",
        phone: "0821-5566-3305",
        address: "Ketapang, Banyuwangi",
        status: "Pegawai Operasional Rumah Sinyal",
        photo: "images/davin.jpg",
        notes: "Petugas jaga rumah sinyal dinas operasional harian.",
        updatedAt: new Date().toISOString()
    },
    "prs-saga": {
        id: "prs-saga",
        name: "Arif Saga Febri A.",
        role: "Petugas Rumah Sinyal (PRS)",
        category: "PRS",
        nipp: "69306",
        unit: "Persinyalan, Wesel & Rute Jalur",
        shift: "Shift Operasional",
        ttl: "Banyuwangi, 02 Februari 1997",
        phone: "0821-6677-3306",
        address: "Kalipuro, Banyuwangi",
        status: "Pegawai Operasional Rumah Sinyal",
        photo: "images/saga.jpg",
        notes: "Pelaksana pembalikan wesel dan penguncian rute KA.",
        updatedAt: new Date().toISOString()
    },
    "prs-masardi": {
        id: "prs-masardi",
        name: "Masardi Sukma Ragenda",
        role: "Petugas Rumah Sinyal (PRS)",
        category: "PRS",
        nipp: "69307",
        unit: "Persinyalan, Wesel & Rute Jalur",
        shift: "Shift Operasional",
        ttl: "Banyuwangi, 29 Oktober 1995",
        phone: "0821-7788-3307",
        address: "Giri, Banyuwangi",
        status: "Pegawai Operasional Rumah Sinyal",
        photo: "images/masardi.jpg",
        notes: "Petugas jaga sinyal dan wesel operasional Stasiun Ketapang.",
        updatedAt: new Date().toISOString()
    },
    "prs-kosong": {
        id: "prs-kosong",
        name: "Formasi Siaga / Kosong",
        role: "Petugas Rumah Sinyal (PRS)",
        category: "PRS",
        nipp: "-",
        unit: "Persinyalan & Wesel",
        shift: "Dinas Cadangan",
        ttl: "-",
        phone: "-",
        address: "Stasiun Ketapang",
        status: "Posisi Formasi Cadangan",
        photo: "",
        notes: "Formasi cadangan operasional rumah sinyal stasiun.",
        updatedAt: new Date().toISOString()
    }
};

// Konfigurasi aplikasi & penyimpanan Struktur Organisasi
const StrukturConfig = {
    getApiBaseUrl() {
        return "";
    },
    getGoogleClientId() {
        return "893363056589-kph2ujnsfdl55uamlj1uuta8fvsd59b1.apps.googleusercontent.com";
    },
    getSpreadsheetId() {
        return (localStorage.getItem("ktg_struktur_spreadsheet_id") || "").trim();
    },
    setSpreadsheetId(id) {
        if (id && id.trim()) {
            localStorage.setItem("ktg_struktur_spreadsheet_id", id.trim());
        } else {
            localStorage.removeItem("ktg_struktur_spreadsheet_id");
        }
    },
    clearSpreadsheetId() {
        localStorage.removeItem("ktg_struktur_spreadsheet_id");
    }
};

// Layanan Google Sheets khusus Struktur Organisasi & Biodata
const StrukturSheetsService = {
    tokenClient: null,
    accessToken: null, // STRICTLY IN-MEMORY ONLY
    spreadsheetId: null,
    spreadsheetUrl: null,
    defaultClientId: "893363056589-kph2ujnsfdl55uamlj1uuta8fvsd59b1.apps.googleusercontent.com",
    scopes: "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.file",

    getClientId() {
        return StrukturConfig.getGoogleClientId();
    },

    setSpreadsheetIdFromCloud(id, url) {
        if (!id || !id.trim()) return;
        const cleanId = id.trim();
        this.spreadsheetId = cleanId;
        this.spreadsheetUrl = url || `https://docs.google.com/spreadsheets/d/${cleanId}/edit`;
        StrukturConfig.setSpreadsheetId(cleanId);
        this.updateButtonsUI();
        console.log("[Struktur] ID Spreadsheet disinkronkan dari cloud real-time:", cleanId);
    },

    async setSpreadsheetIdFromUser(rawInput) {
        if (!rawInput || !rawInput.trim()) return false;
        let sheetId = rawInput.trim();
        const match = sheetId.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
        if (match && match[1]) {
            sheetId = match[1];
        }

        this.spreadsheetId = sheetId;
        this.spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/edit`;
        StrukturConfig.setSpreadsheetId(sheetId);

        // Siarkan ke Firebase agar seluruh perangkat langsung tersinkron
        if (window.saveStrukturSheetToFirebase) {
            window.saveStrukturSheetToFirebase(sheetId, this.spreadsheetUrl);
        }

        // Simpan ke backend jika ada
        try {
            await fetch("/api/struktur/sheets-info", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    spreadsheetId: this.spreadsheetId,
                    spreadsheetUrl: this.spreadsheetUrl,
                    connectedBy: "Petugas Struktur KTG"
                })
            });
        } catch (e) {}

        this.updateButtonsUI();
        StrukturBiodataManager.showToast("ID Spreadsheet berhasil ditautkan dan disinkronkan ke seluruh perangkat!", "success");

        if (this.accessToken) {
            try {
                await this.ensureSheetsStructure();
                await this.syncBiodataToSheet(true);
            } catch (e) {
                console.warn("[Struktur] Gagal inisialisasi sheet baru:", e);
            }
        }
        return true;
    },

    promptSetSpreadsheetId() {
        const currentVal = this.spreadsheetUrl || (this.spreadsheetId ? `https://docs.google.com/spreadsheets/d/${this.spreadsheetId}/edit` : "");
        const input = prompt(
            "Masukkan Link URL atau ID Google Spreadsheet Struktur Organisasi:\n\n" +
            "Contoh Link: https://docs.google.com/spreadsheets/d/1abcXYZ.../edit\n\n" +
            "(ID ini otomatis disimpan ke cloud dan berlaku sama di SEMUA perangkat lain, seperti HP atau komputer petugas lainnya)",
            currentVal
        );
        if (input !== null && input.trim()) {
            this.setSpreadsheetIdFromUser(input.trim());
        }
    },

    async init() {
        const savedSheetId = StrukturConfig.getSpreadsheetId();
        if (savedSheetId) {
            this.spreadsheetId = savedSheetId;
            this.spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${savedSheetId}/edit`;
        }

        // Coba sinkronkan dengan backend endpoint khusus struktur jika ada
        try {
            const res = await fetch("/api/struktur/sheets-info");
            if (res.ok) {
                const info = await res.json();
                if (info.spreadsheetId && !this.spreadsheetId) {
                    this.spreadsheetId = info.spreadsheetId;
                    this.spreadsheetUrl = info.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${info.spreadsheetId}/edit`;
                    StrukturConfig.setSpreadsheetId(info.spreadsheetId);
                }
            }
        } catch (e) {}

        this.updateButtonsUI();
        this.bindEvents();
    },

    bindEvents() {
        const btnConnect = document.getElementById("btnConnectGoogleSheets");
        const btnSync = document.getElementById("btnSyncToSheets");
        const btnPull = document.getElementById("btnPullFromSheets");
        const btnDisconnect = document.getElementById("btnDisconnectGoogleSheets");
        const btnSetSheet = document.getElementById("btnSetSpreadsheetId");

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
                    this.syncBiodataToSheet(true);
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
        if (btnDisconnect) {
            btnDisconnect.addEventListener("click", () => {
                this.disconnect();
            });
        }
        if (btnSetSheet) {
            btnSetSheet.addEventListener("click", () => {
                this.promptSetSpreadsheetId();
            });
        }
    },

    disconnect() {
        if (this.accessToken && window.google?.accounts?.oauth2?.revoke) {
            try {
                window.google.accounts.oauth2.revoke(this.accessToken, () => {
                    console.log("[Struktur] Token OAuth 2.0 berhasil dicabut.");
                });
            } catch (e) {
                console.warn("[Struktur] Gagal revoke token:", e);
            }
        }

        this.accessToken = null;
        this.updateButtonsUI();
        StrukturBiodataManager.showToast("Koneksi Google Sheets Struktur Organisasi diputuskan.", "info");
        this.updateCloudStatusUI("server");
    },

    requestLoginAndSync() {
        if (!window.google || !window.google.accounts || !window.google.accounts.oauth2) {
            alert("Pustaka Google Identity Services sedang dimuat dari Google CDN. Mohon tunggu beberapa saat lalu coba kembali.");
            return;
        }

        const activeClientId = this.getClientId();

        try {
            this.tokenClient = window.google.accounts.oauth2.initTokenClient({
                client_id: activeClientId,
                scope: this.scopes,
                callback: async (resp) => {
                    if (resp.error) {
                        console.error("[Struktur] Kesalahan Autentikasi Google OAuth:", resp);
                        const err = String(resp.error || "").toLowerCase();
                        const errSub = String(resp.error_subtype || "").toLowerCase();
                        if (err.includes("origin_mismatch") || errSub.includes("origin_mismatch")) {
                            alert(
                                `[Google OAuth: Origin Belum Terdaftar]\n\n` +
                                `Domain: ${window.location.origin}\n\n` +
                                `Penyebab: Google memblokir akses karena domain ${window.location.origin} belum didaftarkan di 'Authorized JavaScript origins' pada Google Cloud Console.\n\n` +
                                `Cara Mengatasi:\n` +
                                `1. Buka Google Cloud Console (console.cloud.google.com) -> APIs & Services -> Credentials\n` +
                                `2. Pilih OAuth 2.0 Client ID (${activeClientId})\n` +
                                `3. Pada bagian 'Authorized JavaScript origins', tambahkan:\n   ${window.location.origin}\n` +
                                `4. Klik SAVE/SIMPAN dan tunggu beberapa menit.`
                            );
                        } else if (err === "popup_closed_by_user") {
                            StrukturBiodataManager.showToast("Proses login Google dibatalkan.", "info");
                        } else if (err === "access_denied") {
                            StrukturBiodataManager.showToast("Izin akses Google Sheets tidak diberikan.", "error");
                        } else {
                            alert("Gagal autentikasi Google: " + resp.error + (resp.error_description ? ` (${resp.error_description})` : ""));
                        }
                        return;
                    }

                    this.accessToken = resp.access_token;
                    StrukturBiodataManager.showToast("Berhasil terhubung ke Akun Google!", "success");

                    if (!this.spreadsheetId) {
                        await this.createOrFindSpreadsheet();
                    } else {
                        await this.syncBiodataToSheet(true);
                    }
                    this.updateButtonsUI();
                    this.updateCloudStatusUI("sheets", new Date().toISOString());
                }
            });

            this.tokenClient.requestAccessToken({ prompt: "" });
        } catch (initErr) {
            console.error("[Struktur] Gagal inisialisasi token client:", initErr);
            const errStr = String(initErr?.message || initErr).toLowerCase();
            if (errStr.includes("origin") || errStr.includes("idpiframe")) {
                alert(`[Google OAuth: Error Origin]\n\nDomain ${window.location.origin} belum diizinkan di Google Cloud Console Client ID.`);
            } else {
                alert("Gagal menginisialisasi Google OAuth: " + (initErr?.message || initErr));
            }
        }
    },

    isConnected() {
        return !!this.accessToken && !!this.spreadsheetId;
    },

    async ensureSheetsStructure() {
        if (!this.accessToken || !this.spreadsheetId) return null;

        const metaUrl = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}?fields=sheets.properties`;
        let res;
        try {
            res = await fetch(metaUrl, {
                headers: { "Authorization": `Bearer ${this.accessToken}` }
            });
        } catch (netErr) {
            throw new Error(`Gagal terhubung ke Google Sheets API. Periksa koneksi internet Anda.`);
        }

        if (!res.ok) {
            const errData = await res.json().catch(() => null);
            const detailMsg = errData?.error?.message || `HTTP ${res.status}`;
            if (res.status === 401) {
                this.accessToken = null;
                this.updateButtonsUI();
                throw new Error("Sesi login Google telah kedaluwarsa. Silakan masuk kembali.");
            }
            if (res.status === 404) {
                this.spreadsheetId = null;
                StrukturConfig.clearSpreadsheetId();
                throw new Error("Spreadsheet tidak ditemukan di akun Google Anda.");
            }
            throw new Error(detailMsg);
        }

        const data = await res.json();
        const existingTitles = (data.sheets || []).map(s => s.properties?.title || "");

        const requests = [];
        if (!existingTitles.includes("Biodata_Petugas")) {
            requests.push({
                addSheet: {
                    properties: {
                        title: "Biodata_Petugas",
                        gridProperties: { frozenRowCount: 1 }
                    }
                }
            });
        }
        if (!existingTitles.includes("Struktur_Organisasi")) {
            requests.push({
                addSheet: {
                    properties: {
                        title: "Struktur_Organisasi",
                        gridProperties: { frozenRowCount: 1 }
                    }
                }
            });
        }

        if (requests.length > 0) {
            try {
                const batchUrl = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}:batchUpdate`;
                const batchRes = await fetch(batchUrl, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${this.accessToken}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ requests })
                });
                if (batchRes.ok) {
                    existingTitles.push("Biodata_Petugas", "Struktur_Organisasi");
                }
            } catch (batchErr) {
                console.warn("[Struktur] Gagal menambahkan tab otomatis:", batchErr);
            }
        }

        return existingTitles;
    },

    async createOrFindSpreadsheet() {
        const savedSheetId = this.spreadsheetId || StrukturConfig.getSpreadsheetId();
        if (savedSheetId) {
            this.spreadsheetId = savedSheetId;
            this.spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${savedSheetId}/edit`;
            try {
                await this.ensureSheetsStructure();
                await this.syncBiodataToSheet(true);
            } catch (err) {
                console.error("[Struktur] Gagal inisialisasi spreadsheet tersimpan:", err);
                alert("Gagal menghubungkan ke Spreadsheet tersimpan:\n\n" + err.message);
            }
            return;
        }

        // Coba cari di Google Drive apakah sudah pernah dibuat sebelumnya
        try {
            const searchTitle = encodeURIComponent("name = 'Struktur Organisasi & Biodata Petugas - Stasiun Ketapang (KTG)' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false");
            const driveUrl = `https://www.googleapis.com/drive/v3/files?q=${searchTitle}&orderBy=modifiedTime desc&fields=files(id,name,webViewLink)`;
            const driveRes = await fetch(driveUrl, {
                headers: { "Authorization": `Bearer ${this.accessToken}` }
            }).catch(() => null);

            if (driveRes && driveRes.ok) {
                const driveData = await driveRes.json().catch(() => null);
                if (driveData && driveData.files && driveData.files.length > 0) {
                    const existing = driveData.files[0];
                    console.log("[Struktur] Menemukan Spreadsheet yang sudah ada di Google Drive:", existing);
                    this.spreadsheetId = existing.id;
                    this.spreadsheetUrl = existing.webViewLink || `https://docs.google.com/spreadsheets/d/${existing.id}/edit`;
                    StrukturConfig.setSpreadsheetId(this.spreadsheetId);

                    if (window.saveStrukturSheetToFirebase) {
                        window.saveStrukturSheetToFirebase(this.spreadsheetId, this.spreadsheetUrl);
                    }

                    this.updateButtonsUI();
                    await this.ensureSheetsStructure();
                    await this.syncBiodataToSheet(true);
                    StrukturBiodataManager.showToast("Berhasil tersambung ke Spreadsheet Struktur yang sudah ada!", "success");
                    return;
                }
            }
        } catch (searchErr) {
            console.warn("[Struktur] Pencarian Google Drive dilewati:", searchErr);
        }

        // Buat baru jika belum ada
        try {
            StrukturBiodataManager.showToast("Membuat Spreadsheet Khusus Struktur Organisasi...", "info");
            const res = await fetch("https://sheets.googleapis.com/v4/spreadsheets", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    properties: {
                        title: "Struktur Organisasi & Biodata Petugas - Stasiun Ketapang (KTG)"
                    },
                    sheets: [
                        {
                            properties: {
                                title: "Biodata_Petugas",
                                gridProperties: { frozenRowCount: 1 }
                            }
                        },
                        {
                            properties: {
                                title: "Struktur_Organisasi",
                                gridProperties: { frozenRowCount: 1 }
                            }
                        }
                    ]
                })
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => null);
                const detailMsg = errData?.error?.message || `HTTP ${res.status}`;
                if (res.status === 401) {
                    this.accessToken = null;
                    this.updateButtonsUI();
                    throw new Error("Sesi login Google telah kedaluwarsa. Silakan login kembali.");
                }
                throw new Error(detailMsg);
            }

            const sheetData = await res.json();
            this.spreadsheetId = sheetData.spreadsheetId;
            this.spreadsheetUrl = sheetData.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${this.spreadsheetId}/edit`;

            StrukturConfig.setSpreadsheetId(this.spreadsheetId);

            if (window.saveStrukturSheetToFirebase) {
                window.saveStrukturSheetToFirebase(this.spreadsheetId, this.spreadsheetUrl);
            }

            try {
                await fetch("/api/struktur/sheets-info", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        spreadsheetId: this.spreadsheetId,
                        spreadsheetUrl: this.spreadsheetUrl,
                        connectedBy: "Petugas Struktur Organisasi KTG"
                    })
                });
            } catch (e) {}

            await this.syncBiodataToSheet(false);
            StrukturBiodataManager.showToast("Google Spreadsheet Struktur berhasil dibuat & disinkronkan!", "success");
            this.updateButtonsUI();
        } catch (err) {
            console.error("[Struktur] Gagal membuat Google Spreadsheet:", err);
            alert("Gagal membuat Google Spreadsheet:\n\n" + err.message);
        }
    },

    async syncBiodataToSheet(notify = true) {
        if (!this.accessToken || !this.spreadsheetId) {
            if (notify) this.requestLoginAndSync();
            return;
        }

        try {
            if (notify) StrukturBiodataManager.showToast("Menyinkronkan Biodata ke Google Sheets...", "info");

            await this.ensureSheetsStructure();

            const allData = StrukturBiodataManager.getAllBiodata();
            const nowStr = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }) + " WIB";

            const header = [
                "ID PETUGAS", "NAMA LENGKAP", "JABATAN", "KATEGORI / FORMASI", "NIPP",
                "UNIT KERJA", "POLA SHIFT / DINAS", "TEMPAT TANGGAL LAHIR", "NO. TELEPON / WA",
                "ALAMAT DOMISILI", "STATUS KEPEGAWAIAN", "CATATAN OPERASIONAL", "TERAKHIR DIPERBARUI"
            ];

            const rows = [header];
            Object.values(allData).forEach(p => {
                rows.push([
                    p.id,
                    p.name || "-",
                    p.role || "-",
                    p.category || "-",
                    p.nipp || "-",
                    p.unit || "-",
                    p.shift || "-",
                    p.ttl || "-",
                    p.phone || "-",
                    p.address || "-",
                    p.status || "-",
                    p.notes || "-",
                    p.updatedAt ? new Date(p.updatedAt).toLocaleString("id-ID") + " WIB" : nowStr
                ]);
            });

            const range = `Biodata_Petugas!A1:M${rows.length}`;
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
                const errData = await res.json().catch(() => null);
                throw new Error(errData?.error?.message || `HTTP ${res.status}`);
            }

            if (notify) StrukturBiodataManager.showToast("Biodata petugas berhasil diperbarui di Google Sheets!", "success");
            this.updateButtonsUI();
            this.updateCloudStatusUI("sheets", new Date().toISOString());
        } catch (err) {
            console.error("[Struktur] Gagal sinkron ke Google Sheets:", err);
            if (notify) alert("Gagal mengirim ke Google Sheets:\n\n" + err.message);
        }
    },

    async pullFromSheet(notify = true) {
        if (!this.accessToken || !this.spreadsheetId) {
            if (notify) this.requestLoginAndSync();
            return;
        }

        try {
            if (notify) StrukturBiodataManager.showToast("Mengambil data biodata terbaru dari Google Sheets...", "info");

            await this.ensureSheetsStructure();

            const range = "Biodata_Petugas!A2:M100";
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${encodeURIComponent(range)}`;

            const res = await fetch(url, {
                headers: { "Authorization": `Bearer ${this.accessToken}` }
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => null);
                throw new Error(errData?.error?.message || `HTTP ${res.status}`);
            }

            const data = await res.json();
            const values = data.values || [];

            if (values.length > 0) {
                const updatedObj = {};
                values.forEach(row => {
                    const id = row[0];
                    if (id) {
                        const existing = StrukturBiodataManager.getPerson(id) || {};
                        updatedObj[id] = {
                            ...existing,
                            id: id,
                            name: row[1] || existing.name,
                            role: row[2] || existing.role,
                            category: row[3] || existing.category,
                            nipp: row[4] || existing.nipp,
                            unit: row[5] || existing.unit,
                            shift: row[6] || existing.shift,
                            ttl: row[7] || existing.ttl,
                            phone: row[8] || existing.phone,
                            address: row[9] || existing.address,
                            status: row[10] || existing.status,
                            notes: row[11] || existing.notes,
                            updatedAt: new Date().toISOString()
                        };
                    }
                });

                StrukturBiodataManager.applyBulkBiodata(updatedObj);
                if (notify) StrukturBiodataManager.showToast("Data biodata berhasil diperbarui dari Google Sheets!", "success");
                this.updateCloudStatusUI("sheets", new Date().toISOString());
            } else {
                if (notify) StrukturBiodataManager.showToast("Spreadsheet masih kosong. Mengirimkan data saat ini...", "info");
                await this.syncBiodataToSheet(false);
            }
        } catch (err) {
            console.error("[Struktur] Gagal menarik data dari Google Sheets:", err);
            if (notify) alert("Gagal menarik dari Google Sheets:\n\n" + err.message);
        }
    },

    updateButtonsUI() {
        const btnConnect = document.getElementById("btnConnectGoogleSheets");
        const btnSync = document.getElementById("btnSyncToSheets");
        const btnPull = document.getElementById("btnPullFromSheets");
        const btnOpenLink = document.getElementById("linkOpenGoogleSheets");
        const btnDisconnect = document.getElementById("btnDisconnectGoogleSheets");

        const hasToken = !!this.accessToken;
        const hasSheet = !!this.spreadsheetId;

        if (btnConnect) btnConnect.style.display = hasToken ? "none" : "inline-flex";
        if (btnSync) btnSync.style.display = hasToken ? "inline-flex" : "none";
        if (btnPull) btnPull.style.display = hasToken ? "inline-flex" : "none";
        if (btnDisconnect) btnDisconnect.style.display = hasToken ? "inline-flex" : "none";

        if (btnOpenLink) {
            if (hasSheet && this.spreadsheetUrl) {
                btnOpenLink.href = this.spreadsheetUrl;
                btnOpenLink.style.display = "inline-flex";
            } else {
                btnOpenLink.style.display = "none";
            }
        }

        const sheetDisplay = document.getElementById("strukturSheetIdDisplay");
        if (sheetDisplay) {
            if (hasSheet) {
                sheetDisplay.style.display = "inline-flex";
                sheetDisplay.innerHTML = `<i class="ti ti-table" style="margin-right: 4px;"></i> Sheet: <strong>${this.spreadsheetId.substring(0, 8)}...</strong>`;
                sheetDisplay.title = `ID Spreadsheet Lengkap:\n${this.spreadsheetId}\n\n(Tersinkron di semua device)`;
            } else {
                sheetDisplay.style.display = "none";
            }
        }
    },

    updateCloudStatusUI(mode, timestamp) {
        const badge = document.getElementById("cloudStatusBadge");
        const lastSync = document.getElementById("cloudLastSyncText");
        if (!badge) return;

        const timeStr = timestamp ? new Date(timestamp).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) + " WIB" : "Baru saja";

        if (mode === "server") {
            badge.className = "cloud-badge active";
            badge.style.background = "#EFF6FF";
            badge.style.color = "#1E40AF";
            badge.style.borderColor = "#BFDBFE";
            badge.innerHTML = `<span class="cloud-dot" style="background: #2563EB;"></span> Online &bull; Terhubung ke Server Cloud`;
            if (lastSync) {
                lastSync.innerHTML = `Data struktur organisasi & biodata tersinkron ke cloud. Terakhir sinkron: <strong>${timeStr}</strong>`;
            }
        } else if (mode === "sheets") {
            badge.className = "cloud-badge active";
            badge.style.background = "#F0FDF4";
            badge.style.color = "#15803D";
            badge.style.borderColor = "#BBF7D0";
            badge.innerHTML = `<span class="cloud-dot" style="background: #10B981;"></span> Mode Mandiri &bull; Google Sheets Aktif`;
            if (lastSync) {
                lastSync.innerHTML = `Terhubung langsung ke Google Sheets Struktur Organisasi. Terakhir sinkron: <strong>${timeStr}</strong>`;
            }
        } else if (mode === "local") {
            badge.className = "cloud-badge";
            badge.style.background = "#FFFBEB";
            badge.style.color = "#92400E";
            badge.style.borderColor = "#FDE68A";
            badge.innerHTML = `<span class="cloud-dot" style="background: #F59E0B;"></span> Tersimpan di Browser`;
            if (lastSync) {
                lastSync.innerHTML = `Biodata tersimpan di browser ini. Klik <em>Hubungkan Google Sheets</em> untuk sinkronisasi.`;
            }
        }
    }
};

// Manajer Biodata Petugas & Pengendali Tampilan Modal Interaktif
const StrukturBiodataManager = {
    biodataCache: {},
    currentActiveId: null,
    isEditMode: false,

    init() {
        // 1. Muat default master data
        this.biodataCache = JSON.parse(JSON.stringify(DEFAULT_BIODATA));

        // 2. Timpa dengan data tersimpan di localStorage jika ada
        try {
            const saved = localStorage.getItem("ktg_struktur_biodata_v1");
            if (saved) {
                const parsed = JSON.parse(saved);
                this.biodataCache = { ...this.biodataCache, ...parsed };
            }
        } catch (e) {}

        // 3. Coba muat dari backend server jika aktif
        this.fetchDataFromBackend();

        // 4. Perbarui nama-nama di DOM halaman struktur
        this.updateDomNames();

        // 5. Sambungkan event listener ke tombol biodata di setiap elemen
        this.bindCardButtons();
        this.bindModalEvents();
    },

    async fetchDataFromBackend() {
        try {
            const res = await fetch("/api/struktur/biodata");
            if (res.ok) {
                const json = await res.json();
                if (json.success && json.data && Object.keys(json.data).length > 0) {
                    this.biodataCache = { ...this.biodataCache, ...json.data };
                    localStorage.setItem("ktg_struktur_biodata_v1", JSON.stringify(this.biodataCache));
                    this.updateDomNames();
                }
            }
        } catch (e) {}
    },

    getAllBiodata() {
        return this.biodataCache;
    },

    getPerson(id) {
        return this.biodataCache[id] || DEFAULT_BIODATA[id] || null;
    },

    applyBulkBiodata(bulk) {
        if (!bulk || typeof bulk !== "object") return;
        this.biodataCache = { ...this.biodataCache, ...bulk };
        localStorage.setItem("ktg_struktur_biodata_v1", JSON.stringify(this.biodataCache));
        this.updateDomNames();

        if (this.currentActiveId && document.getElementById("biodataModalOverlay")?.classList.contains("active")) {
            this.renderModalContent(this.currentActiveId);
        }
    },

    updateDomNames() {
        // Perbarui teks nama di kartu sesuai data biodata terkini
        Object.values(this.biodataCache).forEach(p => {
            const elName = document.querySelector(`[data-name-for="${p.id}"]`);
            if (elName && p.name) {
                elName.innerText = p.name;
            }
        });
    },

    bindCardButtons() {
        // Setiap kotak nama petugas (KS, WKS, Supervisor, PPKA, PLR, PRS) menjadi tombol pembuka popup biodata
        const clickableBoxes = document.querySelectorAll(".org-node[data-person-id], .staff-item-box[data-person-id], [data-open-biodata]");
        clickableBoxes.forEach(box => {
            box.style.cursor = "pointer";
            box.addEventListener("click", (e) => {
                const personId = box.getAttribute("data-person-id") || box.getAttribute("data-open-biodata");
                if (personId) {
                    this.openModal(personId);
                }
            });

            // Aksesibilitas keyboard (Tekan Enter atau Space untuk membuka modal)
            box.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    const personId = box.getAttribute("data-person-id") || box.getAttribute("data-open-biodata");
                    if (personId) {
                        this.openModal(personId);
                    }
                }
            });
        });
    },

    bindModalEvents() {
        const modal = document.getElementById("biodataModalOverlay");
        const btnClose = document.getElementById("biodataModalCloseBtn");
        const btnCancel = document.getElementById("btnCancelEditBiodata");
        const btnToggleEdit = document.getElementById("btnToggleEditBiodata");
        const btnSave = document.getElementById("btnSaveBiodata");
        const photoInput = document.getElementById("biodataPhotoInput");
        const btnUploadTrigger = document.getElementById("btnTriggerUploadPhoto");
        const btnResetPhoto = document.getElementById("btnResetPhotoToDefault");

        if (btnClose) btnClose.addEventListener("click", () => this.closeModal());
        if (btnCancel) btnCancel.addEventListener("click", () => {
            if (this.isEditMode) {
                this.setEditMode(false);
                this.renderModalContent(this.currentActiveId);
            } else {
                this.closeModal();
            }
        });

        if (modal) {
            modal.addEventListener("click", (e) => {
                if (e.target === modal) this.closeModal();
            });
        }

        if (btnToggleEdit) {
            btnToggleEdit.addEventListener("click", () => {
                this.setEditMode(true);
            });
        }

        if (btnSave) {
            btnSave.addEventListener("click", () => {
                this.saveModalData();
            });
        }

        if (btnUploadTrigger && photoInput) {
            btnUploadTrigger.addEventListener("click", () => {
                photoInput.click();
            });
        }

        if (photoInput) {
            photoInput.addEventListener("change", (e) => {
                const file = e.target.files?.[0];
                if (file) {
                    this.handlePhotoFile(file);
                }
            });
        }

        if (btnResetPhoto) {
            btnResetPhoto.addEventListener("click", () => {
                if (!this.currentActiveId) return;
                const def = DEFAULT_BIODATA[this.currentActiveId];
                const previewImg = document.getElementById("biodataPhotoPreview");
                const hiddenInput = document.getElementById("inputEditPhoto");
                if (previewImg) previewImg.src = def?.photo || "images/listianto.jpg";
                if (hiddenInput) hiddenInput.value = def?.photo || "";
                this.showToast("Foto dikembalikan ke foto bawaan.", "info");
            });
        }
    },

    openModal(personId) {
        const person = this.getPerson(personId);
        if (!person) {
            alert("Data biodata tidak ditemukan.");
            return;
        }

        this.currentActiveId = personId;
        this.setEditMode(false);
        this.renderModalContent(personId);

        const modal = document.getElementById("biodataModalOverlay");
        if (modal) modal.classList.add("active");
    },

    closeModal() {
        const modal = document.getElementById("biodataModalOverlay");
        if (modal) modal.classList.remove("active");
        this.currentActiveId = null;
        this.setEditMode(false);
    },

    setEditMode(edit) {
        this.isEditMode = edit;
        const viewContainer = document.getElementById("biodataViewContainer");
        const editContainer = document.getElementById("biodataEditContainer");
        const btnToggleEdit = document.getElementById("btnToggleEditBiodata");
        const btnSave = document.getElementById("btnSaveBiodata");
        const btnUploadTrigger = document.getElementById("btnTriggerUploadPhoto");
        const btnResetPhoto = document.getElementById("btnResetPhotoToDefault");

        if (viewContainer) viewContainer.style.display = edit ? "none" : "block";
        if (editContainer) editContainer.style.display = edit ? "block" : "none";
        if (btnToggleEdit) btnToggleEdit.style.display = edit ? "none" : "inline-flex";
        if (btnSave) btnSave.style.display = edit ? "inline-flex" : "none";
        if (btnUploadTrigger) btnUploadTrigger.style.display = edit ? "inline-flex" : "none";
        if (btnResetPhoto) btnResetPhoto.style.display = edit ? "inline-flex" : "none";
    },

    renderModalContent(personId) {
        const person = this.getPerson(personId);
        if (!person) return;

        // Foto & Header
        const photoEl = document.getElementById("biodataPhotoPreview");
        const nameHeader = document.getElementById("modalHeaderName");
        const roleBadge = document.getElementById("modalRoleBadge");
        const unitBadge = document.getElementById("modalUnitBadge");

        const photoSrc = person.photo || DEFAULT_BIODATA[personId]?.photo || "images/listianto.jpg";
        if (photoEl) {
            photoEl.src = photoSrc;
            photoEl.onerror = function() {
                this.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='200' viewBox='0 0 160 200'><rect width='160' height='200' fill='%23EEF2FF'/><circle cx='80' cy='75' r='35' fill='%23C7D2FE'/><path d='M25 170 C25 125, 135 125, 135 170 Z' fill='%23C7D2FE'/><text x='50%25' y='188' font-family='sans-serif' font-size='12' font-weight='bold' fill='%23002F6C' text-anchor='middle'>PETUGAS KAI</text></svg>";
            };
        }

        if (nameHeader) nameHeader.innerText = person.name || "-";
        if (roleBadge) roleBadge.innerText = person.role || "-";
        if (unitBadge) unitBadge.innerText = person.unit || person.category || "Stasiun Ketapang";

        // View Mode Text
        const setVal = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.innerText = val || "-";
        };

        setVal("viewName", person.name);
        setVal("viewRole", person.role);
        setVal("viewNipp", person.nipp);
        setVal("viewUnit", person.unit);
        setVal("viewShift", person.shift);
        setVal("viewTtl", person.ttl);
        setVal("viewPhone", person.phone);
        setVal("viewAddress", person.address);
        setVal("viewStatus", person.status);
        setVal("viewNotes", person.notes);

        // Edit Mode Inputs
        const setInput = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.value = val || "";
        };

        setInput("inputEditName", person.name);
        setInput("inputEditRole", person.role);
        setInput("inputEditNipp", person.nipp);
        setInput("inputEditUnit", person.unit);
        setInput("inputEditShift", person.shift);
        setInput("inputEditTtl", person.ttl);
        setInput("inputEditPhone", person.phone);
        setInput("inputEditAddress", person.address);
        setInput("inputEditStatus", person.status);
        setInput("inputEditNotes", person.notes);
        setInput("inputEditPhoto", person.photo);
    },

    handlePhotoFile(file) {
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            alert("Harap pilih berkas gambar (JPG, PNG, WEBP).");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const dataUrl = e.target.result;
            const preview = document.getElementById("biodataPhotoPreview");
            const hiddenInput = document.getElementById("inputEditPhoto");
            if (preview) preview.src = dataUrl;
            if (hiddenInput) hiddenInput.value = dataUrl;
            this.showToast("Foto berhasil dimuat! Klik 'Simpan Perubahan' untuk mempermanenkan.", "info");
        };
        reader.readAsDataURL(file);
    },

    async saveModalData() {
        if (!this.currentActiveId) return;

        const getInput = (id) => (document.getElementById(id)?.value || "").trim();

        const updated = {
            id: this.currentActiveId,
            name: getInput("inputEditName") || this.getPerson(this.currentActiveId).name,
            role: getInput("inputEditRole") || this.getPerson(this.currentActiveId).role,
            nipp: getInput("inputEditNipp"),
            unit: getInput("inputEditUnit"),
            shift: getInput("inputEditShift"),
            ttl: getInput("inputEditTtl"),
            phone: getInput("inputEditPhone"),
            address: getInput("inputEditAddress"),
            status: getInput("inputEditStatus"),
            notes: getInput("inputEditNotes"),
            photo: getInput("inputEditPhoto") || this.getPerson(this.currentActiveId).photo,
            updatedAt: new Date().toISOString()
        };

        // Simpan ke Cache & LocalStorage
        this.biodataCache[this.currentActiveId] = updated;
        localStorage.setItem("ktg_struktur_biodata_v1", JSON.stringify(this.biodataCache));

        // Update teks di DOM kartu
        this.updateDomNames();

        // Siarkan ke Firebase agar semua perangkat langsung tersinkron
        if (window.saveStrukturBiodataToFirebase) {
            window.saveStrukturBiodataToFirebase(this.currentActiveId, updated);
        }

        // Simpan ke server backend jika backend aktif
        try {
            await fetch("/api/struktur/biodata", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    personId: this.currentActiveId,
                    biodata: updated
                })
            });
        } catch (e) {}

        // Sinkronkan ke Google Sheets jika terhubung
        if (StrukturSheetsService.isConnected()) {
            StrukturSheetsService.syncBiodataToSheet(false);
        }

        this.setEditMode(false);
        this.renderModalContent(this.currentActiveId);
        this.showToast(`Biodata ${updated.name} berhasil diperbarui!`, "success");
    },

    showToast(message, type = "info") {
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
        }, 3200);
    }
};

window.StrukturConfig = StrukturConfig;
window.StrukturSheetsService = StrukturSheetsService;
const StrukturSheetsServiceExport = StrukturSheetsService;
window.StrukturBiodataManager = StrukturBiodataManager;
