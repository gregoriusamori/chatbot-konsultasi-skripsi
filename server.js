const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

function generateResponse(message) {
  const msg = message.toLowerCase();

  if (msg.includes('judul')) {
    return 'Tentukan judul dengan menggabungkan fakta + rumusan masalah. Misalnya: "Pemodelan Regresi Logistik untuk Prediksi ... pada ...". Apa topik yang sedang Anda kembangkan?';
  } else if (msg.includes('pustaka') || msg.includes('literature') || msg.includes('daftar')) {
    return 'Untuk literature review, cari artikel dari jurnal terakreditasi (Sinta/Scopus) dan gunakan tools seperti Google Scholar. Fokus pada gap penelitian.';
  } else if (msg.includes('metodologi') || msg.includes('metode')) {
    return 'Pilih metode sesuai rumusan masalah: survei, eksperimen, atau studi kasus. Jangan lupa jelaskan desain penelitian dan instrumen pengambilan data.';
  } else if (msg.includes('hasil') || msg.includes('finding') || msg.includes('hasil penelitian')) {
    return 'Hasil harus disajikan dengan tabel/nutrisi statistik dan visualisasi. Bandingkan dengan teori dan hipotesis.';
  } else if (msg.includes('pengujian') || msg.includes('uji')) {
    return 'Jangan lupa uji validitas dan reliabilitas data sebelum disimpulkan.';
  } else if (msg.includes('anggota')) {
    return 'Jika kelompok, sepakati pembagian kerja dan jadwal pengerjaan.';
  } else if (msg.includes('tips') || msg.includes('panduan')) {
    return 'Tips: buat outline chapter per chapter, tulis hasil sambil mengumpulkan data, dan konsultasi dosen pembimbing secara berkala.';
  } else {
    return 'Saya bisa membantu dengan topik seperti: judul, daftar pustaka, metodologi, hasil penelitian, pengujian, atau tips menulis skripsi. Tanyakan lebih spesifik!';
  }
}

app.use(express.static(path.join(__dirname, 'public')));

app.use('/chat', express.json());

app.post('/chat', (req, res) => {
  const response = generateResponse(req.body.message || '');
  res.json({ response });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
