document.addEventListener("DOMContentLoaded", function () {
    // Tampilkan Tanggal Hari ini di Header
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const todayStr = new Date().toLocaleDateString('id-ID', options);
    document.getElementById("current-date").innerText = todayStr;

    // Ambil tanggal format YYYY-MM-DD untuk dicocokkan dengan spreadsheet CSV
    const todayISO = new Date().toISOString().split('T')[0];

    // Mengambil file data_dinas.csv dari repositori
    fetch('data_dinas.csv')
        .then(response => response.text())
        .then(csvText => {
            parseCSVAndRender(csvText, todayISO);
        })
        .catch(err => {
            console.error("Gagal membaca file data dinasan (.csv): ", err);
        });
});

function parseCSVAndRender(csvText, targetDate) {
    const lines = csvText.split('\n');
    
    // Pembersihan kontainer html
    document.getElementById('shift-pagi').innerHTML = '';
    document.getElementById('shift-siang').innerHTML = '';
    document.getElementById('shift-malam').innerHTML = '';

    let dataFound = false;

    // Mulai dari indeks 1 untuk melompati baris header CSV
    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        // Memisah kolom menggunakan koma
        const columns = lines[i].split(',');
        const tanggal = columns[0].trim();
        const nama = columns[1].trim();
        const shift = columns[2].trim().toLowerCase(); // pagi, siang, atau malam
        const foto = columns[3].trim(); // nama file foto, misal: budi.jpg

        // Jika tanggal di baris csv cocok dengan tanggal hari ini
        if (tanggal === targetDate) {
            dataFound = true;
            
            // Buat element kartu profil bulat
            const profileHTML = `
                <div class="staff-profile">
                    <div class="avatar-circle">
                        <img src="images/${foto}" alt="${nama}" onerror="this.src='https://placeholder.com'">
                    </div>
                    <div class="staff-name">${nama}</div>
                </div>
            `;

            // Masukkan ke kolom shift yang sesuai
            if (shift === 'pagi') {
                document.getElementById('shift-pagi').innerHTML += profileHTML;
            } else if (shift === 'siang') {
                document.getElementById('shift-siang').innerHTML += profileHTML;
            } else if (shift === 'malam') {
                document.getElementById('shift-malam').innerHTML += profileHTML;
            }
        }
    }

    // fallback jika data hari ini kosong di spreadsheet
    if (!dataFound) {
        const fallbackMsg = "<p style='color:#888;font-size:13px;'>Tidak ada jadwal dinas terdata.</p>";
        document.getElementById('shift-pagi').innerHTML = fallbackMsg;
        document.getElementById('shift-siang').innerHTML = fallbackMsg;
        document.getElementById('shift-malam').innerHTML = fallbackMsg;
    }
}
