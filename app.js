const express = require('express');
const mongoose = require('mongoose');

// Inisialisasi variabel
const app = express();
const port = process.env.PORT || 3000;

// Membuat koneksi ke MongoDB
mongoose
  .connect(
    'mongodb://192.168.56.101/db-pos',
    { useNewUrlParser: true }
  )
  .then(() => console.log(`Database terhubung...`))
  .catch(e =>
    console.error(
      `Error! Terjadi kesalahan saat membuat koneksi database\n${e}`
    )
  );

// Aktifkan server
app.listen(port, () => console.log(`Server aktif pada port: ${port}`));
