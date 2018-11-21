const express = require('express');

// Inisialisasi variabel
const router = express.Router();

// Tangani request get method
router.get('/', (req, res) => {
  // Mengirim respon ke client
  res.send(['Barang1', 'Barang2', 'Barang3', 'BarangN']);
});

// Export router
module.exports = router;
