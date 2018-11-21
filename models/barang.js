const mongoose = require('mongoose');

// Membuat skema `barang`
const barangSchema = new mongoose.Schema({
  kode: {
    type: String,
    unique: true,
    required: true,
    maxlength: 25
  },
  nama: {
    type: String,
    required: true,
    maxlength: 50
  },
  harga: {
    type: Number,
    required: true
  }
});

// Membuat model `barang`
const Barang = mongoose.model('Barang', barangSchema);

// Export model `barang`
exports.Barang = Barang;
