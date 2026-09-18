import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), "data");
const TRACKS_FILE = path.join(DATA_DIR, "track_states.json");
const SHEETS_INFO_FILE = path.join(DATA_DIR, "sheet_info.json");
const DINAS_FILE = path.join(DATA_DIR, "dinasan.json");
const CONFIG_FILE = path.join(process.cwd(), "firebase-applet-config.json");

// Inisialisasi Firebase Client SDK untuk persistensi Firestore cloud
import { initializeApp as initClientApp, getApps as getClientApps } from "firebase/app";
import { getFirestore as getClientFirestore, doc as fsDoc, getDoc as fsGetDoc, setDoc as fsSetDoc } from "firebase/firestore";

let clientDb: any = null;
try {
  if (fs.existsSync(CONFIG_FILE)) {
    const cfg = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));
    const clientApp = getClientApps().length === 0 ? initClientApp(cfg) : getClientApps()[0];
    clientDb = getClientFirestore(clientApp, cfg.firestoreDatabaseId || "(default)");
    console.log(`[Firestore] Client SDK terhubung ke database: ${cfg.firestoreDatabaseId || "(default)"}`);
  }
} catch (err) {
  console.warn("[Firestore] Inisialisasi Firebase Client dilewati:", err);
}

// Pastikan direktori data ada
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Data awal default emplasemen Stasiun Ketapang (KTG)
const DEFAULT_TRACK_STATES: Record<string, {
  status: string;
  note: string;
  trainNumber: string;
  stopblokNumber: string;
  updatedAt?: string;
}> = {
  "jalur-1": {
    status: "clear",
    note: "Siap menerima kedatangan/keberangkatan KA",
    trainNumber: "",
    stopblokNumber: "",
    updatedAt: new Date().toISOString()
  },
  "jalur-2": {
    status: "clear",
    note: "Jalur lurus sepur raya utama",
    trainNumber: "",
    stopblokNumber: "",
    updatedAt: new Date().toISOString()
  },
  "jalur-3": {
    status: "clear",
    note: "Manuver langsir dan pemeriksaan",
    trainNumber: "",
    stopblokNumber: "",
    updatedAt: new Date().toISOString()
  },
  "jalur-4": {
    status: "stopblok",
    note: "Terpasang Stopblok Pengaman - Rangkaian KPJ Siaga",
    trainNumber: "KPJ D9/10426",
    stopblokNumber: "SB-04",
    updatedAt: new Date().toISOString()
  },
  "jalur-5": {
    status: "clear",
    note: "Bebas stabling cadangan",
    trainNumber: "",
    stopblokNumber: "",
    updatedAt: new Date().toISOString()
  },
  "jalur-6": {
    status: "stopblok",
    note: "Terpasang stopblok pengaman ujung sepur",
    trainNumber: "",
    stopblokNumber: "9-12, 13-16",
    updatedAt: new Date().toISOString()
  },
  "jalur-bongkar": {
    status: "clear",
    note: "Bongkar muat barang/kargo semen",
    trainNumber: "",
    stopblokNumber: "",
    updatedAt: new Date().toISOString()
  },
  "jalur-cuci-1": {
    status: "clear",
    note: "Instalasi pencucian dan pengisian air",
    trainNumber: "",
    stopblokNumber: "",
    updatedAt: new Date().toISOString()
  },
  "jalur-cuci-2": {
    status: "clear",
    note: "Perawatan eksterior dan interior",
    trainNumber: "",
    stopblokNumber: "",
    updatedAt: new Date().toISOString()
  }
};

async function getTrackStatesFromFirestore(): Promise<Record<string, any> | null> {
  if (!clientDb) return null;
  try {
    const docRef = fsDoc(clientDb, "stations", "ketapang");
    const docSnap = await fsGetDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data && data.tracks) {
        return data.tracks;
      }
    }
  } catch (err) {
    console.warn("[Firestore] Gagal membaca status jalur dari Firestore:", err);
  }
  return null;
}

async function saveTrackStatesToFirestore(states: Record<string, any>): Promise<boolean> {
  if (!clientDb) return false;
  try {
    const docRef = fsDoc(clientDb, "stations", "ketapang");
    await fsSetDoc(docRef, {
      stationId: "ketapang",
      name: "Stasiun Ketapang (KTG)",
      tracks: states,
      lastUpdated: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (err) {
    console.warn("[Firestore] Gagal menyimpan status jalur ke Firestore:", err);
    return false;
  }
}

function readTrackStates() {
  try {
    if (fs.existsSync(TRACKS_FILE)) {
      const data = fs.readFileSync(TRACKS_FILE, "utf8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error membaca file status jalur:", err);
  }
  // Tulis nilai awal
  writeTrackStates(DEFAULT_TRACK_STATES);
  return { ...DEFAULT_TRACK_STATES };
}

function writeTrackStates(states: Record<string, any>) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const jsonContent = JSON.stringify(states, null, 2);
    fs.writeFileSync(TRACKS_FILE, jsonContent, { encoding: "utf8", mode: 0o666 });
    
    // Simpan juga secara asinkron ke Firestore jika tersedia
    saveTrackStatesToFirestore(states).catch((e) => console.warn("[Firestore Async Save Error]:", e));

    return true;
  } catch (err) {
    console.error("Error menulis file status jalur:", err);
    return false;
  }
}

// Inisialisasi sinkronisasi awal saat server startup: ambil dari Firestore jika ada, lalu sinkronkan file lokal
(async () => {
  try {
    const firestoreStates = await getTrackStatesFromFirestore();
    if (firestoreStates) {
      writeTrackStates(firestoreStates);
      console.log("[Firestore] Berhasil memuat status jalur dari Firestore ke lokal.");
    } else {
      const local = readTrackStates();
      await saveTrackStatesToFirestore(local);
      console.log("[Firestore] Berhasil inisialisasi dokumen awal stasiun di Firestore.");
    }
  } catch (err) {
    console.warn("[Firestore] Inisialisasi awal sinkronisasi Firestore selesai dengan catatan:", err);
  }
})();

function readSheetsInfo() {
  try {
    if (fs.existsSync(SHEETS_INFO_FILE)) {
      return JSON.parse(fs.readFileSync(SHEETS_INFO_FILE, "utf8"));
    }
  } catch (err) {
    console.error("Error membaca sheet_info.json:", err);
  }
  return {
    spreadsheetId: null,
    spreadsheetUrl: null,
    lastSyncTime: null,
    connectedBy: null
  };
}

function writeSheetsInfo(info: any) {
  try {
    fs.writeFileSync(SHEETS_INFO_FILE, JSON.stringify(info, null, 2), { encoding: "utf8", mode: 0o666 });
    return true;
  } catch (err) {
    console.error("Error menulis sheet_info.json:", err);
    return false;
  }
}

async function startServer() {
  const app = express();

  app.use(express.json());

  // Middleware CORS untuk kepatuhan cross-origin saat frontend di-host di GitHub Pages / domain luar
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

  // === API ENDPOINTS ===

  // 1. Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // 2. OAuthConfig untuk Google Sheets API
  app.get("/api/oauth-config", (_req, res) => {
    let clientId = "186406862864-in4aeul1p7hsebl8a8ml8ombr8vpto4b.apps.googleusercontent.com";
    try {
      if (fs.existsSync(CONFIG_FILE)) {
        const conf = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));
        if (conf.oAuthClientId) {
          clientId = conf.oAuthClientId;
        }
      }
    } catch (e) {
      console.warn("Gagal membaca firebase-applet-config.json:", e);
    }

    res.json({
      clientId,
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive.file"
      ]
    });
  });

  // 3. Info Google Sheets yang terhubung
  app.get("/api/sheets-info", (_req, res) => {
    res.json(readSheetsInfo());
  });

  app.post("/api/sheets-info", (req, res) => {
    const { spreadsheetId, spreadsheetUrl, connectedBy } = req.body;
    const current = readSheetsInfo();
    const updated = {
      ...current,
      spreadsheetId: spreadsheetId !== undefined ? spreadsheetId : current.spreadsheetId,
      spreadsheetUrl: spreadsheetUrl !== undefined ? spreadsheetUrl : current.spreadsheetUrl,
      connectedBy: connectedBy !== undefined ? connectedBy : current.connectedBy,
      lastSyncTime: new Date().toISOString()
    };
    writeSheetsInfo(updated);
    res.json({ success: true, info: updated });
  });

  // 4. Data Status Emplasemen (Sinkron Semua Device)
  app.get("/api/tracks", (_req, res) => {
    const states = readTrackStates();
    res.json({
      success: true,
      states,
      timestamp: new Date().toISOString()
    });
  });

  app.post("/api/tracks", (req, res) => {
    const { trackId, status, trainNumber, stopblokNumber, note, states: bulkStates } = req.body;
    let currentStates = readTrackStates();

    if (bulkStates && typeof bulkStates === "object") {
      // Pembaruan massal (misalnya sinkronisasi dari Google Sheets)
      currentStates = { ...currentStates, ...bulkStates };
    } else if (trackId) {
      // Pembaruan per jalur
      const existing = currentStates[trackId] || {};
      currentStates[trackId] = {
        ...existing,
        status: status !== undefined ? status : existing.status,
        trainNumber: trainNumber !== undefined ? trainNumber : existing.trainNumber,
        stopblokNumber: stopblokNumber !== undefined ? stopblokNumber : existing.stopblokNumber,
        note: note !== undefined ? note : existing.note,
        updatedAt: new Date().toISOString()
      };
    }

    writeTrackStates(currentStates);

    res.json({
      success: true,
      states: currentStates,
      timestamp: new Date().toISOString()
    });
  });

  // 5. Reset Status Jalur
  app.post("/api/tracks/reset", (req, res) => {
    const { trackId } = req.body;
    let currentStates = readTrackStates();

    if (trackId && DEFAULT_TRACK_STATES[trackId]) {
      currentStates[trackId] = {
        ...DEFAULT_TRACK_STATES[trackId],
        updatedAt: new Date().toISOString()
      };
    } else if (!trackId) {
      currentStates = { ...DEFAULT_TRACK_STATES };
    }

    writeTrackStates(currentStates);

    res.json({
      success: true,
      states: currentStates,
      timestamp: new Date().toISOString()
    });
  });

  // 6. Data Dinasan (Sinkron Cloud)
  app.get("/api/dinas", (_req, res) => {
    if (fs.existsSync(DINAS_FILE)) {
      try {
        const data = fs.readFileSync(DINAS_FILE, "utf8");
        return res.json(JSON.parse(data));
      } catch (err) {
        console.error("Gagal membaca dinasan.json", err);
      }
    }

    // Fallback ke data_dinas.csv jika belum ada dinasan.json
    const csvPath = path.join(process.cwd(), "data_dinas.csv");
    if (fs.existsSync(csvPath)) {
      const csvText = fs.readFileSync(csvPath, "utf8");
      return res.json({ success: true, source: "csv", data: csvText });
    }

    res.json({ success: false, message: "Belum ada data dinasan" });
  });

  app.post("/api/dinas", (req, res) => {
    const { dinasData } = req.body;
    if (dinasData) {
      fs.writeFileSync(DINAS_FILE, JSON.stringify({ success: true, data: dinasData, updatedAt: new Date().toISOString() }, null, 2), "utf8");
      return res.json({ success: true, message: "Data dinasan berhasil disimpan di cloud" });
    }
    res.status(400).json({ success: false, message: "Data dinas tidak valid" });
  });

  // 7. Unduh Langsung File track_states.json & Penyajian Berkas Statis /data
  app.get("/data/track_states.json", (_req, res) => {
    const states = readTrackStates();
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Content-Disposition", 'attachment; filename="track_states.json"');
    res.send(JSON.stringify(states, null, 2));
  });

  app.get("/api/tracks/download", (_req, res) => {
    const states = readTrackStates();
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Content-Disposition", 'attachment; filename="track_states.json"');
    res.send(JSON.stringify(states, null, 2));
  });

  app.use("/data", express.static(DATA_DIR));

  // === VITE / STATIC SERVING ===
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      const requested = req.path === "/" ? "index.html" : req.path.replace(/^\//, "");
      const targetFile = path.join(distPath, requested);
      if (fs.existsSync(targetFile) && fs.statSync(targetFile).isFile()) {
        return res.sendFile(targetFile);
      }
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server Stasiun Ketapang berjalan di http://0.0.0.0:${PORT}`);
  });
}

startServer();
