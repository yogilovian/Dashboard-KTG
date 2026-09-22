/**
 * Stopblok Google Sheets & Cloud Service - Stasiun Ketapang (Daop 9 Jember)
 * Mendukung integrasi dua arah (Baca / Tulis) langsung ke Google Sheets secara independen
 * Terpisah dari Emplasemen (menggunakan penyimpanan spreadsheet tersendiri)
 * Tab Sheet: "Pantauan_Stopblok", "Kondisi_Jalur", "Info_KA"
 */

// Konfigurasi aplikasi & penyimpanan Stopblok (Independen dari Emplasemen)
const StopblokConfig = {
    getApiBaseUrl() {
        return "";
    },
    getGoogleClientId() {
        return "893363056589-kph2ujnsfdl55uamlj1uuta8fvsd59b1.apps.googleusercontent.com;
    },
    getSpreadsheetId() {
        return (localStorage.getItem("ktg_stopblok_spreadsheet_id") || "").trim();
    },
    setSpreadsheetId(id) {
        if (id && id.trim()) {
            localStorage.setItem("ktg_stopblok_spreadsheet_id", id.trim());
        } else {
            localStorage.removeItem("ktg_stopblok_spreadsheet_id");
        }
    },
    clearSpreadsheetId() {
        localStorage.removeItem("ktg_stopblok_spreadsheet_id");
    }
};

const StopblokSheetsService = {
    tokenClient: null,
    accessToken: null, // STRICTLY IN-MEMORY ONLY
    spreadsheetId: null,
    spreadsheetUrl: null,
    defaultClientId: "893363056589-kph2ujnsfdl55uamlj1uuta8fvsd59b1.apps.googleusercontent.com",
    scopes: "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.file",

    getClientId() {
        return StopblokConfig.getGoogleClientId();
    },

    async init() {
        // 1. Muat ID spreadsheet dari localStorage khusus stopblok jika tersimpan
        const savedSheetId = StopblokConfig.getSpreadsheetId();
        if (savedSheetId) {
            this.spreadsheetId = savedSheetId;
            this.spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${savedSheetId}/edit`;
        }

        // 2. Coba sinkronkan dengan backend endpoint khusus stopblok
        try {
            const res = await fetch("/api/stopblok/sheets-info");
            if (res.ok) {
                const info = await res.json();
                if (info.spreadsheetId && !this.spreadsheetId) {
                    this.spreadsheetId = info.spreadsheetId;
                    this.spreadsheetUrl = info.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${info.spreadsheetId}/edit`;
                    StopblokConfig.setSpreadsheetId(info.spreadsheetId);
                }
            }
        } catch (e) {}

        this.updateButtonsUI();
        this.bindEvents();

        // 3. Coba muat data awal dari backend server jika ada
        this.fetchDataFromBackend();
    },

    bindEvents() {
        const btnConnect = document.getElementById("btnConnectGoogleSheets");
        const btnSync = document.getElementById("btnSyncToSheets");
        const btnPull = document.getElementById("btnPullFromSheets");
        const btnDisconnect = document.getElementById("btnDisconnectGoogleSheets");

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
                    this.syncCurrentDataToSheet(true);
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
    },

    disconnect() {
        if (this.accessToken && window.google?.accounts?.oauth2?.revoke) {
            try {
                window.google.accounts.oauth2.revoke(this.accessToken, () => {
                    console.log("[Stopblok] Token OAuth 2.0 berhasil dicabut.");
                });
            } catch (e) {
                console.warn("[Stopblok] Gagal revoke token:", e);
            }
        }

        this.accessToken = null;
        this.updateButtonsUI();
        this.showToast("Koneksi Google Sheets Stopblok diputuskan.", "info");
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
                        console.error("[Stopblok] Kesalahan Autentikasi Google OAuth:", resp);
                        const err = String(resp.error || "").toLowerCase();
                        if (err === "popup_closed_by_user") {
                            this.showToast("Proses login Google dibatalkan.", "info");
                        } else if (err === "access_denied") {
                            this.showToast("Izin akses Google Sheets tidak diberikan.", "error");
                        } else {
                            alert("Gagal autentikasi Google: " + resp.error);
                        }
                        return;
                    }

                    this.accessToken = resp.access_token;
                    this.showToast("Berhasil terhubung ke Akun Google!", "success");

                    if (!this.spreadsheetId) {
                        await this.createOrFindSpreadsheet();
                    } else {
                        await this.syncCurrentDataToSheet(true);
                    }
                    this.updateButtonsUI();
                    this.updateCloudStatusUI("sheets", new Date().toISOString());
                }
            });

            this.tokenClient.requestAccessToken({ prompt: "" });
        } catch (initErr) {
            console.error("[Stopblok] Gagal menginisialisasi Google Token Client:", initErr);
            alert("Gagal menginisialisasi Google OAuth: " + (initErr.message || initErr));
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
                throw new Error("Sesi login Google telah kedaluwarsa. Silakan klik tombol 'Hubungkan Google Sheets' untuk masuk kembali.");
            }
            if (res.status === 404) {
                this.spreadsheetId = null;
                StopblokConfig.clearSpreadsheetId();
                throw new Error(`Google Spreadsheet dengan ID tersimpan tidak ditemukan. Spreadsheet baru akan dibuat saat Anda menghubungkan kembali.`);
            }
            throw new Error(detailMsg);
        }

        const data = await res.json();
        const existingTitles = (data.sheets || []).map(s => s.properties?.title || "");

        const requests = [];
        if (!existingTitles.includes("Pantauan_Stopblok")) {
            requests.push({
                addSheet: {
                    properties: {
                        title: "Pantauan_Stopblok",
                        gridProperties: { frozenRowCount: 1 }
                    }
                }
            });
        }
        if (!existingTitles.includes("Kondisi_Jalur")) {
            requests.push({
                addSheet: {
                    properties: {
                        title: "Kondisi_Jalur",
                        gridProperties: { frozenRowCount: 1 }
                    }
                }
            });
        }
        if (!existingTitles.includes("Info_KA")) {
            requests.push({
                addSheet: {
                    properties: {
                        title: "Info_KA",
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
                    existingTitles.push("Pantauan_Stopblok", "Kondisi_Jalur", "Info_KA");
                }
            } catch (batchErr) {
                console.warn("[Stopblok] Gagal menambahkan tab otomatis:", batchErr);
            }
        }

        return existingTitles;
    },

    async createOrFindSpreadsheet() {
        const savedSheetId = StopblokConfig.getSpreadsheetId();
        if (savedSheetId) {
            this.spreadsheetId = savedSheetId;
            this.spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${savedSheetId}/edit`;
            try {
                await this.ensureSheetsStructure();
                await this.syncCurrentDataToSheet(true);
            } catch (err) {
                console.error("[Stopblok] Gagal inisialisasi spreadsheet tersimpan:", err);
                alert("Gagal menghubungkan ke Spreadsheet tersimpan:\n\n" + err.message);
            }
            return;
        }

        try {
            this.showToast("Membuat Spreadsheet Khusus Pantauan Stopblok...", "info");
            const res = await fetch("https://sheets.googleapis.com/v4/spreadsheets", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    properties: {
                        title: "Pantauan Stopblok & Operasional KA - Stasiun Ketapang (KTG)"
                    },
                    sheets: [
                        {
                            properties: {
                                title: "Pantauan_Stopblok",
                                gridProperties: { frozenRowCount: 1 }
                            }
                        },
                        {
                            properties: {
                                title: "Kondisi_Jalur",
                                gridProperties: { frozenRowCount: 1 }
                            }
                        },
                        {
                            properties: {
                                title: "Info_KA",
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

            // Simpan ke storage tersendiri khusus Stopblok
            StopblokConfig.setSpreadsheetId(this.spreadsheetId);

            // Simpan ke server backend di endpoint khusus Stopblok
            try {
                await fetch("/api/stopblok/sheets-info", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        spreadsheetId: this.spreadsheetId,
                        spreadsheetUrl: this.spreadsheetUrl,
                        connectedBy: "Petugas Pantauan Stopblok KTG"
                    })
                });
            } catch (e) {}

            await this.syncCurrentDataToSheet(false);
            this.showToast("Google Spreadsheet Stopblok berhasil dibuat!", "success");
            this.updateButtonsUI();
        } catch (err) {
            console.error("[Stopblok] Gagal membuat Google Spreadsheet:", err);
            alert("Gagal membuat Google Spreadsheet:\n\n" + err.message);
        }
    },

    getCurrentFormData() {
        // 1. Data Baris Pantauan Stopblok (Jalur I - VI, CUCI 1, CUCI 2)
        const stopblokRows = [];
        const stopblokTable = document.querySelector("#stopblokTable");
        const trackRows = stopblokTable ? stopblokTable.querySelectorAll("tbody tr") : [];

        trackRows.forEach(tr => {
            const cells = tr.querySelectorAll("td");
            if (cells.length >= 4) {
                const jalurName = cells[0].textContent.trim();
                const saranaText = cells[1].querySelector("textarea")?.value || "";
                const stopblokText = cells[2].querySelector("textarea")?.value || "";
                
                const selectEl = cells[3].querySelector("select");
                const customEl = cells[3].querySelector(".custom-input");
                let kaValue = "";
                if (selectEl) {
                    if (selectEl.value === "custom") {
                        kaValue = customEl?.value || "";
                    } else if (selectEl.value) {
                        const opt = selectEl.options[selectEl.selectedIndex];
                        kaValue = opt ? opt.text : selectEl.value;
                    }
                }

                const jumlahStopblok = cells[4]?.querySelector("textarea")?.value || cells[4]?.textContent.trim() || "-";
                const terpasangStopblok = cells[5]?.querySelector("textarea")?.value || cells[5]?.textContent.trim() || "-";
                const tersediaStopblok = cells[6]?.querySelector("textarea")?.value || cells[6]?.textContent.trim() || "-";

                stopblokRows.push({
                    jalur: jalurName,
                    sarana: saranaText,
                    stopblok: stopblokText,
                    noKa: kaValue,
                    jumlah: jumlahStopblok,
                    terpasang: terpasangStopblok,
                    tersedia: tersediaStopblok
                });
            }
        });

        // 2. Data Info KA (BLB, JALAN, BATAL)
        const infoKAData = { blb: "", jalan: "", batal: "" };
        const infoTable = document.querySelector("#infoKATable");
        if (infoTable) {
            const tds = infoTable.querySelectorAll("tbody tr td textarea");
            if (tds[0]) infoKAData.blb = tds[0].value;
            if (tds[1]) infoKAData.jalan = tds[1].value;
            if (tds[2]) infoKAData.batal = tds[2].value;
        }

        return {
            stopblokRows,
            infoKAData,
            updatedAt: new Date().toISOString()
        };
    },

    async syncCurrentDataToSheet(notify = true) {
        if (!this.accessToken || !this.spreadsheetId) {
            if (notify) this.requestLoginAndSync();
            return;
        }

        try {
            if (notify) this.showToast("Menyinkronkan data Stopblok ke Google Sheets...", "info");

            await this.ensureSheetsStructure();

            const formData = this.getCurrentFormData();
            const nowStr = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }) + " WIB";

            // 1. Data Sheet "Pantauan_Stopblok"
            const stopblokHeader = [
                "JALUR", "NO. SARANA / RANGKAIAN", "NO. STOPBLOK", "NO. KA (EX/KA)", 
                "JUMLAH STOPBLOK", "TERPASANG", "TERSEDIA", "TERAKHIR DIPERBARUI"
            ];
            const stopblokValues = [stopblokHeader];
            formData.stopblokRows.forEach(r => {
                stopblokValues.push([
                    r.jalur,
                    r.sarana || "-",
                    r.stopblok || "-",
                    r.noKa || "-",
                    r.jumlah || "-",
                    r.terpasang || "-",
                    r.tersedia || "-",
                    nowStr
                ]);
            });

            // 2. Data Sheet "Info_KA"
            const infoHeader = ["BLB (BERHENTI LUAR BIASA)", "KA JALAN", "KA BATAL", "TERAKHIR DIPERBARUI"];
            const infoRow = [
                formData.infoKAData.blb || "-",
                formData.infoKAData.jalan || "-",
                formData.infoKAData.batal || "-",
                nowStr
            ];

            const valueRanges = [
                { range: "Pantauan_Stopblok!A1:H10", values: stopblokValues },
                { range: "Info_KA!A1:D2", values: [infoHeader, infoRow] }
            ];

            const batchUrl = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values:batchUpdate`;
            const batchRes = await fetch(batchUrl, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    valueInputOption: "USER_ENTERED",
                    data: valueRanges
                })
            });

            if (!batchRes.ok) {
                const errData = await batchRes.json().catch(() => null);
                throw new Error(errData?.error?.message || `HTTP ${batchRes.status}`);
            }

            // Simpan juga ke Server Backend
            this.saveDataToBackend();

            if (notify) this.showToast("Data Stopblok berhasil disimpan ke Google Sheets!", "success");
            this.updateButtonsUI();
            this.updateCloudStatusUI("sheets", new Date().toISOString());
        } catch (err) {
            console.error("[Stopblok] Gagal sinkron ke Google Sheets:", err);
            if (notify) alert("Gagal mengirim ke Google Sheets:\n\n" + err.message);
        }
    },

    async pullFromSheet(notify = true) {
        if (!this.accessToken || !this.spreadsheetId) {
            if (notify) this.requestLoginAndSync();
            return;
        }

        try {
            if (notify) this.showToast("Mengambil data terbaru dari Google Sheets...", "info");

            await this.ensureSheetsStructure();

            const ranges = [
                "Pantauan_Stopblok!A2:H12",
                "Info_KA!A2:C2"
            ];
            const batchGetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values:batchGet?` +
                ranges.map(r => `ranges=${encodeURIComponent(r)}`).join("&");

            const res = await fetch(batchGetUrl, {
                headers: { "Authorization": `Bearer ${this.accessToken}` }
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => null);
                throw new Error(errData?.error?.message || `HTTP ${res.status}`);
            }

            const data = await res.json();
            const valueRanges = data.valueRanges || [];

            // 1. Terapkan data Pantauan_Stopblok ke tabel
            const stopblokRows = valueRanges[0]?.values || [];
            if (stopblokRows.length > 0) {
                const stopblokTable = document.querySelector("#stopblokTable");
                const trs = stopblokTable ? stopblokTable.querySelectorAll("tbody tr") : [];
                stopblokRows.forEach((row, idx) => {
                    const tr = trs[idx];
                    if (!tr) return;
                    const cells = tr.querySelectorAll("td");
                    
                    if (cells[1]?.querySelector("textarea") && row[1] && row[1] !== "-") {
                        cells[1].querySelector("textarea").value = row[1];
                    }
                    if (cells[2]?.querySelector("textarea") && row[2] && row[2] !== "-") {
                        cells[2].querySelector("textarea").value = row[2];
                    }
                    if (cells[3] && row[3] && row[3] !== "-") {
                        const selectEl = cells[3].querySelector("select");
                        const customEl = cells[3].querySelector(".custom-input");
                        const container = cells[3].querySelector(".custom-input-container");
                        let matched = false;
                        if (selectEl) {
                            for (let i = 0; i < selectEl.options.length; i++) {
                                if (selectEl.options[i].text.toLowerCase() === row[3].toLowerCase() || selectEl.options[i].value === row[3]) {
                                    selectEl.selectedIndex = i;
                                    matched = true;
                                    if (container) container.classList.add("hidden-input");
                                    break;
                                }
                            }
                            if (!matched) {
                                selectEl.value = "custom";
                                if (container) container.classList.remove("hidden-input");
                                if (customEl) customEl.value = row[3];
                            }
                        }
                    }
                    if (cells[4]?.querySelector("textarea") && row[4] && row[4] !== "-") {
                        cells[4].querySelector("textarea").value = row[4];
                    }
                    if (cells[5]?.querySelector("textarea") && row[5] && row[5] !== "-") {
                        cells[5].querySelector("textarea").value = row[5];
                    }
                    if (cells[6]?.querySelector("textarea") && row[6] && row[6] !== "-") {
                        cells[6].querySelector("textarea").value = row[6];
                    }
                });
            }

            // 2. Terapkan data Info_KA ke BLB, Jalan, Batal
            const infoValues = valueRanges[1]?.values?.[0] || [];
            if (infoValues.length > 0) {
                const infoTable = document.querySelector("#infoKATable");
                if (infoTable) {
                    const textareas = infoTable.querySelectorAll("tbody tr td textarea");
                    if (textareas[0] && infoValues[0] && infoValues[0] !== "-") textareas[0].value = infoValues[0];
                    if (textareas[1] && infoValues[1] && infoValues[1] !== "-") textareas[1].value = infoValues[1];
                    if (textareas[2] && infoValues[2] && infoValues[2] !== "-") textareas[2].value = infoValues[2];
                }
            }

            // Simpan juga ke cache lokal & server
            this.saveDataToBackend();

            if (notify) this.showToast("Data Stopblok berhasil diperbarui dari Google Sheets!", "success");
            this.updateCloudStatusUI("sheets", new Date().toISOString());
        } catch (err) {
            console.error("[Stopblok] Gagal menarik data dari Google Sheets:", err);
            if (notify) alert("Gagal menarik data dari Google Sheets:\n\n" + err.message);
        }
    },

    async saveDataToBackend() {
        const payload = this.getCurrentFormData();
        try {
            await fetch("/api/stopblok", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bulkData: payload
                })
            });
        } catch (e) {}

        try {
            localStorage.setItem("ktg_stopblok_backup", JSON.stringify(payload));
        } catch (e) {}
    },

    async fetchDataFromBackend() {
        try {
            const res = await fetch("/api/stopblok");
            if (res.ok) {
                const json = await res.json();
                if (json.success && json.data) {
                    this.applyDataToDOM(json.data);
                    this.updateCloudStatusUI("server", json.timestamp);
                    return;
                }
            }
        } catch (e) {}

        try {
            const localBackup = localStorage.getItem("ktg_stopblok_backup");
            if (localBackup) {
                const data = JSON.parse(localBackup);
                this.applyDataToDOM(data);
                this.updateCloudStatusUI("local");
            }
        } catch (e) {}
    },

    applyDataToDOM(data) {
        if (!data) return;

        // 1. Terapkan data stopblok rows
        if (data.stopblokRows && Array.isArray(data.stopblokRows)) {
            const stopblokTable = document.querySelector("#stopblokTable") || document.querySelector(".board-card:last-of-type .board-table");
            const trs = stopblokTable ? stopblokTable.querySelectorAll("tbody tr") : [];
            data.stopblokRows.forEach((r, idx) => {
                const tr = trs[idx];
                if (!tr) return;
                const cells = tr.querySelectorAll("td");
                if (cells[1]?.querySelector("textarea") && r.sarana !== undefined) {
                    cells[1].querySelector("textarea").value = r.sarana === "-" ? "" : r.sarana;
                }
                if (cells[2]?.querySelector("textarea") && r.stopblok !== undefined) {
                    cells[2].querySelector("textarea").value = r.stopblok === "-" ? "" : r.stopblok;
                }
                if (cells[3] && r.noKa) {
                    const selectEl = cells[3].querySelector("select");
                    const customEl = cells[3].querySelector(".custom-input");
                    const container = cells[3].querySelector(".custom-input-container");
                    let matched = false;
                    if (selectEl) {
                        for (let i = 0; i < selectEl.options.length; i++) {
                            if (selectEl.options[i].text.toLowerCase() === r.noKa.toLowerCase() || selectEl.options[i].value === r.noKa) {
                                selectEl.selectedIndex = i;
                                matched = true;
                                if (container) container.classList.add("hidden-input");
                                break;
                            }
                        }
                        if (!matched && r.noKa !== "-") {
                            selectEl.value = "custom";
                            if (container) container.classList.remove("hidden-input");
                            if (customEl) customEl.value = r.noKa;
                        }
                    }
                }
                if (cells[4]?.querySelector("textarea") && r.jumlah) {
                    cells[4].querySelector("textarea").value = r.jumlah === "-" ? "" : r.jumlah;
                }
                if (cells[5]?.querySelector("textarea") && r.terpasang) {
                    cells[5].querySelector("textarea").value = r.terpasang === "-" ? "" : r.terpasang;
                }
                if (cells[6]?.querySelector("textarea") && r.tersedia) {
                    cells[6].querySelector("textarea").value = r.tersedia === "-" ? "" : r.tersedia;
                }
            });
        }

        // 2. Info KA
        if (data.infoKAData) {
            const infoTable = document.querySelector("#infoKATable");
            if (infoTable) {
                const textareas = infoTable.querySelectorAll("tbody tr td textarea");
                if (textareas[0] && data.infoKAData.blb) textareas[0].value = data.infoKAData.blb;
                if (textareas[1] && data.infoKAData.jalan) textareas[1].value = data.infoKAData.jalan;
                if (textareas[2] && data.infoKAData.batal) textareas[2].value = data.infoKAData.batal;
            }
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
                lastSync.innerHTML = `Papan pantauan stopblok tersinkron ke server cloud. Terakhir sinkron: <strong>${timeStr}</strong>`;
            }
        } else if (mode === "sheets") {
            badge.className = "cloud-badge active";
            badge.style.background = "#F0FDF4";
            badge.style.color = "#15803D";
            badge.style.borderColor = "#BBF7D0";
            badge.innerHTML = `<span class="cloud-dot" style="background: #10B981;"></span> Mode Mandiri &bull; Google Sheets Aktif`;
            if (lastSync) {
                lastSync.innerHTML = `Terhubung langsung ke Google Sheets khusus Stopblok. Terakhir sinkron: <strong>${timeStr}</strong>`;
            }
        } else if (mode === "local") {
            badge.className = "cloud-badge";
            badge.style.background = "#FFFBEB";
            badge.style.color = "#92400E";
            badge.style.borderColor = "#FDE68A";
            badge.innerHTML = `<span class="cloud-dot" style="background: #F59E0B;"></span> Tersimpan di Browser`;
            if (lastSync) {
                lastSync.innerHTML = `Data stopblok tersimpan di browser ini. Klik <em>Hubungkan Google Sheets</em> untuk sinkronisasi.`;
            }
        } else {
            badge.className = "cloud-badge offline";
            badge.innerHTML = `<span class="cloud-dot"></span> Menghubungkan...`;
        }
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
        }, 3500);
    }
};

window.StopblokSheetsService = StopblokSheetsService;
