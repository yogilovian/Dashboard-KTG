<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Denah Emplasemen Interaktif - Stasiun Ketapang</title>
    <meta name="description" content="Denah Emplasemen Interaktif Stasiun Ketapang Daop 9 Jember PT Kereta Api Indonesia (Persero)" />
    <meta property="og:title" content="Denah Emplasemen Interaktif - Stasiun Ketapang" />
    <meta property="og:description" content="Denah Emplasemen Interaktif Stasiun Ketapang Daop 9 Jember PT Kereta Api Indonesia (Persero)" />
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css">
    <!-- Google Identity Services untuk Integrasi Google Sheets API Cloud -->
    <script src="https://accounts.google.com/gsi/client" async defer></script>
</head>
<body>

    <!-- Sidebar Navigasi -->
    <nav class="sidebar" id="mySidebar">
        <!-- Tombol Tutup Khusus Mobile -->
        <button class="close-sidebar-btn" id="closeSidebar"><i class="ti ti-x"></i></button>
        
        <div class="sidebar-brand">
            <h2>KAI <span>KETAPANG</span></h2>
        </div>
        <ul class="sidebar-menu">
            <li><a href="index.html"><i class="ti ti-home"></i> Dashboard Utama</a></li>
            <li><a href="struktur.html"><i class="ti ti-users"></i> Struktur Organisasi</a></li>
            <li class="active"><a href="emplasemen.html"><i class="ti ti-yarn"></i> Emplasemen</a></li>
            <li><a href="panjang_jalur.html"><i class="ti ti-track"></i> Panjang Jalur</a></li>
            <li><a href="daftar_jalur.html"><i class="ti ti-train"></i> Daftar Jalur KA</a></li>
            <li><a href="pantauan_stopblok.html"><i class="ti ti-barrier-block"></i> Pantauan Stopblok</a></li>
        </ul>
    </nav>

    <!-- Konten Utama -->
    <main class="main-content">
        
        <!-- Bar Aksi Atas & Jam Digital Realtime -->
        <div class="top-bar-action">
            <button class="toggle-btn" id="sidebarToggle">☰</button>
            <div class="digital-clock-container">
                <span class="clock-icon">🕒</span>
                <span id="live-clock">00:00:00 WIB</span>
            </div>
        </div>
        
        <header class="header">
            <h1>Emplasemen Stasiun Ketapang</h1>
            <p>GAPEKA 2025 &bull; Daerah Operasi 9 Jember</p>
        </header>

        <div class="emplasemen-container">
            
            <!-- TOOLBAR STATISTIK STATUS JALUR -->
            <section class="emplasemen-toolbar-card">
                <div class="emplasemen-stats-row">
                    <div class="emplasemen-stat-box">
                        <div class="emplasemen-stat-icon total"><i class="ti ti-train"></i></div>
                        <div>
                            <div class="emplasemen-stat-val" id="statTotalJalur">9</div>
                            <div class="emplasemen-stat-lbl">Total Jalur</div>
                        </div>
                    </div>
                    <div class="emplasemen-stat-box">
                        <div class="emplasemen-stat-icon clear"><i class="ti ti-circle-check"></i></div>
                        <div>
                            <div class="emplasemen-stat-val" id="statJalurBebas">5</div>
                            <div class="emplasemen-stat-lbl">Jalur Bebas</div>
                        </div>
                    </div>
                    <div class="emplasemen-stat-box">
                        <div class="emplasemen-stat-icon stopblok"><i class="ti ti-barrier-block"></i></div>
                        <div>
                            <div class="emplasemen-stat-val" id="statJalurStopblok">2</div>
                            <div class="emplasemen-stat-lbl">Stopblok Terpasang</div>
                        </div>
                    </div>
                    <div class="emplasemen-stat-box">
                        <div class="emplasemen-stat-icon occupied"><i class="ti ti-alert-triangle"></i></div>
                        <div>
                            <div class="emplasemen-stat-val" id="statJalurTerisi">2</div>
                            <div class="emplasemen-stat-lbl">Terisi Rangkaian KA</div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- KARTU SINKRONISASI CLOUD & GOOGLE SHEETS -->
            <section class="cloud-sync-card" id="cloudSyncCard">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 42px; height: 42px; border-radius: 8px; background: #EEF2FF; color: #002F6C; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0;">
                        <i class="ti ti-cloud-check"></i>
                    </div>
                    <div>
                        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                            <strong style="color: #0F172A; font-size: 14.5px;">Penyimpanan Cloud Multi-Perangkat</strong>
                            <span id="cloudStatusBadge" class="cloud-badge active">
                                <span class="cloud-dot"></span> Online &bull; Terhubung Ke Server
                            </span>
                        </div>
                        <div style="font-size: 12px; color: #64748B; margin-top: 3px;" id="cloudLastSyncText">
                            Status jalur, pemantauan stopblok & KA stabling otomatis tersinkron ke seluruh HP, tablet & komputer.
                        </div>
                    </div>
                </div>

                <!-- Kontrol Integrasi Google Sheets -->
                <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;" id="googleSheetsActions">
                    <button type="button" id="btnConnectGoogleSheets" class="btn-sheets-action" style="background: #0F9D58; color: #FFFFFF;" title="Hubungkan Google Sheets untuk mencadangkan dan menyinkronkan data operasional">
                        <i class="ti ti-file-spreadsheet"></i> Hubungkan Google Sheets
                    </button>
                    <button type="button" id="btnSyncToSheets" class="btn-sheets-action" style="display: none; background: #002F6C; color: #FFFFFF;" title="Kirim status saat ini ke lembar kerja Google Sheets">
                        <i class="ti ti-refresh"></i> Kirim ke Sheets
                    </button>
                    <button type="button" id="btnPullFromSheets" class="btn-sheets-action" style="display: none; background: #F1F5F9; color: #0F172A; border: 1px solid #CBD5E1;" title="Ambil pembaruan status dari Google Sheets">
                        <i class="ti ti-cloud-download"></i> Tarik dari Sheets
                    </button>
                    <a id="linkOpenGoogleSheets" href="#" target="_blank" class="btn-sheets-action" style="display: none; background: #F0FDF4; color: #166534; border: 1px solid #BBF7D0;" title="Buka spreadsheet di tab baru">
                        <i class="ti ti-external-link"></i> Buka Spreadsheet
                    </a>
                </div>
            </section>

            <!-- TAMPILAN UTAMA: DENAH BLUEPRINT ASLI DENGAN PIN INTERAKTIF PERSEGI PANJANG -->
            <section class="blueprint-wrapper" id="viewBlueprint">
                <div class="blueprint-header-bar" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 12px;">
                    <div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span class="blueprint-tag" style="background: var(--kai-blue); color: #FFF; font-size: 11px; font-weight: 800; padding: 4px 8px; border-radius: 4px;"><i class="ti ti-map-2"></i> BLUEPRINT ASLI</span>
                            <strong style="color: var(--kai-blue); font-size: 16px;">Emplasemen Stasiun Ketapang (KTG)</strong>
                        </div>
                        <p style="font-size: 12.5px; color: #64748B; margin: 4px 0 0 0;">
                            Klik pin persegi panjang pada jalur untuk memeriksa jadwal KA Gapeka 2025 (Masuk, Berangkat, Stabling) dan memperbarui kondisi operasional jalur.
                        </p>
                    </div>

                    <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                        <!-- Legenda Status Jalur -->
                        <div class="schematic-legend" style="background: #F1F5F9; border-color: #CBD5E1;">
                            <div class="legend-item" style="color: #0F172A;"><span class="legend-dot clear"></span> Bebas</div>
                            <div class="legend-item" style="color: #0F172A;"><span class="legend-dot stopblok"></span> Stopblok</div>
                            <div class="legend-item" style="color: #0F172A;"><span class="legend-dot occupied"></span> Terisi KA</div>
                        </div>

                        <!-- Zoom Navigasi Blueprint -->
                        <div style="display: flex; gap: 6px;">
                            <button type="button" class="btn-secondary" id="btnZoomInBlueprint" title="Perbesar Gambar"><i class="ti ti-zoom-in"></i> Zoom In</button>
                            <button type="button" class="btn-secondary" id="btnZoomOutBlueprint" title="Perkecil Gambar"><i class="ti ti-zoom-out"></i> Zoom Out</button>
                            <button type="button" class="btn-secondary" id="btnResetZoomBlueprint" title="Kembalikan Ukuran Asli"><i class="ti ti-refresh"></i> Reset</button>
                        </div>
                    </div>
                </div>

                <div class="blueprint-img-container" id="blueprintImgContainer">
                    <div class="blueprint-stage" id="blueprintStage">
                        <img id="blueprintImg" src="images/emplasemen_ktg.png" alt="Denah Emplasemen Stasiun Ketapang" draggable="false" />
                        <div id="blueprintPinsOverlay" class="blueprint-pins-overlay">
                            <!-- Pin interaktif persegi panjang otomatis digenerate & diposisikan oleh emplasemen.js -->
                        </div>
                    </div>
                </div>
            </section>

        </div>

        <!-- MODAL DETAIL & PENGUBAH STATUS OPERASIONAL JALUR -->
        <div class="track-modal-overlay" id="trackModalOverlay">
            <div class="track-modal-content">
                <div class="track-modal-header">
                    <div class="track-modal-title" id="modalTrackTitle">
                        Detail Jalur
                    </div>
                    <button type="button" class="track-modal-close" id="modalCloseBtn">&times;</button>
                </div>

                <div class="track-modal-body">
                    <p id="modalDescription" style="font-size: 13px; color: #475569; line-height: 1.5; margin: 0;"></p>

                    <!-- Spesifikasi Panjang & Kelandaian -->
                    <div class="track-spec-grid">
                        <div class="track-spec-box">
                            <div class="val" id="modalEffectiveLength">-</div>
                            <div class="lbl">Panjang Efektif</div>
                        </div>
                        <div class="track-spec-box">
                            <div class="val" id="modalTotalLength">-</div>
                            <div class="lbl">Panjang Total</div>
                        </div>
                        <div class="track-spec-box">
                            <div class="val" id="modalGrade">-</div>
                            <div class="lbl">Kelandaian</div>
                        </div>
                    </div>

                    <!-- Kapasitas Sarana -->
                    <div class="track-capacity-box">
                        <h4>Kapasitas Sarana & Panjang Rangkaian</h4>
                        <div class="track-capacity-list">
                            <span class="capacity-chip">🚆 Kereta Penumpang: <strong id="modalCapTrain">-</strong></span>
                            <span class="capacity-chip">📦 GT (KKBR): <strong id="modalCapGt">-</strong></span>
                            <span class="capacity-chip">🚛 GD (PPCW): <strong id="modalCapGdPpcw">-</strong></span>
                            <span class="capacity-chip">🏗️ GD (PKPKW): <strong id="modalCapGdPkpkw">-</strong></span>
                        </div>
                    </div>

                    <!-- Jadwal KA Terkait (Gapeka 2025 & Halaman Daftar Jalur) -->
                    <div class="track-schedule-section">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                            <h4 style="font-size: 13px; color: var(--kai-blue); font-weight: 800; margin: 0; display: flex; align-items: center; gap: 6px;">
                                <i class="ti ti-calendar-time"></i> Jadwal Operasional KA Jalur Ini (Gapeka 2025)
                            </h4>
                            <span style="font-size: 11px; background: #EEF2FF; color: var(--kai-blue); padding: 2px 8px; border-radius: 4px; font-weight: 700;">
                                Sumber: Daftar Jalur
                            </span>
                        </div>

                        <!-- Kategori Masuk, Berangkat, Stabling -->
                        <div class="schedule-categories-grid">
                            <!-- 1. KA Masuk -->
                            <div class="schedule-cat-card masuk">
                                <div class="schedule-cat-title">
                                    <i class="ti ti-arrow-down-right"></i> KA Masuk (Kedatangan)
                                </div>
                                <div class="schedule-cat-body" id="modalIncomingTrainsList">
                                    <!-- Dynamic list -->
                                </div>
                            </div>

                            <!-- 2. KA Berangkat -->
                            <div class="schedule-cat-card berangkat">
                                <div class="schedule-cat-title">
                                    <i class="ti ti-arrow-up-right"></i> KA Berangkat (Keberangkatan)
                                </div>
                                <div class="schedule-cat-body" id="modalOutgoingTrainsList">
                                    <!-- Dynamic list -->
                                </div>
                            </div>

                            <!-- 3. KA Stabling -->
                            <div class="schedule-cat-card stabling">
                                <div class="schedule-cat-title">
                                    <i class="ti ti-parking"></i> Stabling & Cuci KA
                                </div>
                                <div class="schedule-cat-body" id="modalStablingTrainsList">
                                    <!-- Dynamic list -->
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Pengubah Status Operasional Jalur & Kolom Baru -->
                    <div class="track-status-modifier">
                        <h4 style="margin: 0 0 10px 0; font-size: 13px; color: var(--kai-blue); font-weight: 800; display: flex; align-items: center; gap: 6px;">
                            <i class="ti ti-adjustments"></i> Update Kondisi Operasional Jalur
                        </h4>
                        
                        <!-- Pilihan Status -->
                        <div class="status-radios" style="margin-bottom: 12px;">
                            <label class="status-radio-label">
                                <input type="radio" name="trackStatusRadio" value="clear">
                                <span>🟢 Bebas (Clear)</span>
                            </label>
                            <label class="status-radio-label">
                                <input type="radio" name="trackStatusRadio" value="stopblok">
                                <span>🟡 Terpasang Stopblok</span>
                            </label>
                            <label class="status-radio-label">
                                <input type="radio" name="trackStatusRadio" value="occupied">
                                <span>🔴 Terisi KA / Stabling</span>
                            </label>
                        </div>

                        <!-- Kolom Nomor Rangkaian & Nomor Stopblok -->
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
                            <div>
                                <label for="trackTrainNumberInput" style="font-size: 12px; font-weight: 700; color: #334155; display: block; margin-bottom: 4px;">
                                    <i class="ti ti-train"></i> Nomor Rangkaian KA:
                                </label>
                                <input type="text" id="trackTrainNumberInput" class="modal-form-input" placeholder="Contoh: KA 148 / Lok CC206 / Rangkaian 1" style="width: 100%; height: 38px; padding: 8px 12px; border: 1px solid #CBD5E1; border-radius: 6px; font-size: 13px; font-weight: 600;" />
                            </div>
                            <div>
                                <label for="trackStopblokNumberInput" style="font-size: 12px; font-weight: 700; color: #334155; display: block; margin-bottom: 4px;">
                                    <i class="ti ti-barrier-block"></i> Nomor Stopblok:
                                </label>
                                <input type="text" id="trackStopblokNumberInput" class="modal-form-input" placeholder="Isi Sesuai Nomor Yang Terpasang" style="width: 100%; height: 38px; padding: 8px 12px; border: 1px solid #CBD5E1; border-radius: 6px; font-size: 13px; font-weight: 600;" />
                            </div>
                        </div>

                        <!-- Catatan Operasional -->
                        <div>
                            <label for="trackNoteInput" style="font-size: 12px; font-weight: 700; color: #334155; display: block; margin-bottom: 4px;">
                                <i class="ti ti-notes"></i> Catatan Operasional Petugas:
                            </label>
                            <input type="text" id="trackNoteInput" class="modal-form-input" style="height: 38px; padding: 8px 12px; font-size: 13px; font-weight: 600; width: 100%; border: 1px solid #CBD5E1; border-radius: 6px;" placeholder="Contoh: Jalur bebas siap terima KA / Stopblok terpasang wesel barat" />
                        </div>
                    </div>

                    <div style="font-size: 11px; color: #64748B;">
                        ℹ️ Perubahan kondisi operasional, nomor rangkaian, dan nomor stopblok akan tersimpan di peramban ini dan memperbarui indikator pin denah.
                    </div>
                </div>

                <div class="track-modal-footer">
                    <button type="button" class="btn-secondary" id="modalResetTrackBtn">Kembalikan ke Default</button>
                    <div style="display: flex; gap: 8px;">
                        <button type="button" class="btn-secondary" id="modalCancelBtn">Batal</button>
                        <button type="button" class="btn-primary" id="modalSaveBtn">
                            <i class="ti ti-check"></i> Simpan Kondisi Jalur
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </main>

    <script src="script.js"></script>
    <script src="emplasemen.js"></script>
</body>
</html>
