# Membangun RESTful API menggunakan NodeJs 🛰

## Daftar isi

- [Daftar isi](#daftar-isi)
- [Persiapan](#persiapan)
- [Routing menggunakan Express](#routing-menggunakan-express)
- [Menggunakan Mongoose Schema](#menggunakan-mongoose-schema)
- Menggunakan Environment Variabel
- Parameter Route
- Menghandel HTTP Requests
- Menggunakan Postman
- Validasi input dengan Joi
- Menggunakan Middleware
- Config untuk konfigurasi
- Validasi data menggunakan Mongoose
- Authentication dan Authorization
- Handle dan Logging Error
- Unit Test dan Integration Test
- Test Driven Development
- Deploy

## Persiapan

Sebelum memulai, pastikan alat-alat berikut sudah terinstal. 🛠

- [NodeJs](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com)
- [MongoDB Server](https://www.mongodb.com/download-center)
- [MongoDB Compas](https://www.mongodb.com/download-center/compass)
- [Postman](https://www.getpostman.com/apps)

Buat folder project dengan nama bebas (misal **node-restful-api**) dan masuk ke folder tersebut.

```bash
$ mkdir node-restful-api; cd $_
```

Dalam project ini kita akan menggunakan `yarn` untuk mengolah dependensi.

```bash
$ yarn init
```

Untuk framework menggunakan **Express** dan database munggunakan **MongoDB**. Tambahkan dependensi `express` dan `mongoose`.

```bash
$ yarn add express mongoose
```

> _Mongoose merupakan library ODM (Object Data Modeling) untuk MongoDB._

Buat file Js baru dengan nama **app.js**.

```bash
$ touch app.js
```

Lalu ketikan kode berikut untuk uji coba integrasi Express dan Mongoose.

```js
const express = require('express');
const mongoose = require('mongoose');

// Inisialisasi variabel
const app = express();
const port = process.env.PORT || 3000;

// Membuat koneksi ke MongoDB
mongoose
  .connect(
    'mongodb://localhost/db-pos',
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
```

Pada Mongosee connect url terdapat `db-pos` yang merupakan nama database yang kita gunakan. Eksekusi kode tersebut melalu terminal dengan perintah berikut.

```bash
$ node app
```

Jika tidak ada kesalahan maka outputnya akan seperti ini.

![node-restful-api-img1](https://4.bp.blogspot.com/-t5oK9Bz30dA/W_UMwlU7YBI/AAAAAAAAAAo/Kj6t0jDwCoo25-pBekQEzHPBYoykKjZVwCLcBGAs/s1600/node-restful-api-1.png)

Lalu bila kita akses melalui browser akan tampak seperti ini.

![node-restful-api-img2](https://3.bp.blogspot.com/-TNbgYeSUVjo/W_U1rTtb2oI/AAAAAAAAABU/9XhhvFWPHX8nARkiydtsVNDV3433QaTzQCLcBGAs/s1600/node-restful-api-2.png)

Sampai di sini kita sudah berhasil mempersiapkan project. 🦊

## Routing menggunakan Express

Routing sederhananya mengacu pada bagaimana aplikasi (server) menangani request dari client. Misal pada url berikut.

```
https://api.tokosaya.com/barang?id=789172936
```

Ketika client mengakses url tersebut aplikasi kita akan menerima request pada path `/barang` dengan parameter `?id=789172936` lalu router akan mengecek apakah terdapat fungsi (_Route Handlers_) yang menangani request pada path yang memiliki parameter tersebut.

Di framework Express telah disediakan module untuk menangani hal tersebut yaitu [express.Router()](https://expressjs.com/en/4x/api.html#router).

Kembali ke project, buat folder baru pada root folder project dengan nama **routes** dan di folder tersebut buat file Js dengan nama **barang.js** kemudian ketikan kode ini.

```js
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
```

Lalu pada **app.js** kita import module barang tersebut dan tambahkan ke Express object sebagai _middleware_ seperti ini.

```js
const barang = require('./routes/barang');

// kode lainnya

app.use('/api/barang', barang);
```

Sehingga kode lengkap **app.js** akan terlihat seperti ini.

```js
const express = require('express');
const mongoose = require('mongoose');
const barang = require('./routes/barang');

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

// Menggunakan routes
app.use('/api/barang', barang);

// Aktifkan server
app.listen(port, () => console.log(`Server aktif pada port: ${port}`));
```

Jalankan aplikasi dengan perintah `node app` seperti sebelumnya. Buka browser lalu akses `localhost:3000/api/barang` maka akan terlihat seperti ini.

![node-restful-api-img3](https://3.bp.blogspot.com/-b71THjm66aU/W_U16zmOViI/AAAAAAAAABc/hn-RLyv5G88w4p8wIXzHdlbtH6hOtU01ACLcBGAs/s1600/node-restful-api-3.png)

Ketika client mengakses url/path yang kita buat aplikasi akan merespon dengan mengirimkan array. 🦊

## Menggunakan Mongoose Schema

Mengutip dari [dokumentasi](https://mongoosejs.com/docs/guide.html) Mongoose, kurang lebih terjemahannya seperti ini.

> _"Segala sesuatu di Mongoose berasal dari skema. Setiap skema memetakan koleksi MongoDB dan mendefinisikan bentuk dokumen dalam koleksi MongoDB tersebut."_

Mongoose memiliki beberapa tipe skema diantaranya:

- String
- Number
- Date
- Buffer
- Boolean
- Mixed
- ObjectId
- Array
- Decimal128
- Map

Selengkapnya tentang tipe skema bisa dibaca di [sini](https://mongoosejs.com/docs/schematypes.html).

Kembali ke project, buat folder baru dengan nama **models** lalu buat file Js dengan nama **barang.js**. Pada file tersebut akan kita definisikan skema dan model Mongoose.

```js
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
```

Untuk uji coba pada **app.js** import models `barang` tersebut lalu buat contoh data barang untuk kita simpan ke database.

```js
const { Barang } = require('./models/barang');

// kode lain

const cobaBarang = new Barang({
  kode: '1234',
  nama: 'Pinset Venus',
  harga: 27500
});

cobaBarang.save(err => {
  if (err) return err;
  return console.log('Data berhasil disimpan.');
});

// app.listen()
```

Lalu jalankan aplikasi, jika tidak ada masalah maka data barang akan tersimpan di dabatase.

```bash
$ node app
Server aktif pada port: 3000
Database terhubung...
Data berhasil disimpan.
```

Buka aplikasi MongoDB Compas, buat koneksi yang sama dengan yang kita pakai pada aplikasi lalu buka database **db-pos** lalu pada _Collections_ **barangs** akan telihat dokumen yang baru saja kita simpan.

![node-restful-api-img4](https://2.bp.blogspot.com/-CJmCVvTr1_g/W_VhmITaJTI/AAAAAAAAABo/dtbCWB52F0oAdQYh6V-xlQJcKTxKWZCmwCLcBGAs/s1600/node-restful-api-4.png)

Jika saat menjalankan aplikasi terdapat peringatan seperti ini:

```
(node:18248) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
```

Cukup modifikasi kode koneksi database dengan menambahkan properti `useCreateIndex: true` pada argumen kedua function connect.

```js
// Membuat koneksi ke MongoDB
mongoose
  .connect(
    'mongodb://192.168.56.101/db-pos',
    { useNewUrlParser: true, useCreateIndex: true }
  )
  .then(() => console.log(`Database terhubung...`))
  .catch(e =>
    console.error(
      `Error! Terjadi kesalahan saat membuat koneksi database\n${e}`
    )
  );
```

Karena hanya untuk uji coba, kita hapus lagi seluruh kode untuk menyimpan dokumen MongoDB tadi kecuali properti `useCreateIndex: true` pada argumen kedua function connect sehingga **app.js** sekarang akan terlihat seperti ini:

```js
const express = require('express');
const mongoose = require('mongoose');
const barang = require('./routes/barang');
const { Barang } = require('./models/barang');

// Inisialisasi variabel
const app = express();
const port = process.env.PORT || 3000;

// Membuat koneksi ke MongoDB
mongoose
  .connect(
    'mongodb://192.168.56.101/db-pos',
    { useNewUrlParser: true, useCreateIndex: true }
  )
  .then(() => console.log(`Database terhubung...`))
  .catch(e =>
    console.error(
      `Error! Terjadi kesalahan saat membuat koneksi database\n${e}`
    )
  );

// Menggunakan routes
app.use('/api/barang', barang);

const cobaBarang = new Barang({
  kode: '1234',
  nama: 'Pinset Venus',
  harga: 27500
});

cobaBarang.save(err => {
  if (err) return err;
  return console.log('Data berhasil disimpan.');
});

// Aktifkan server
app.listen(port, () => console.log(`Server aktif pada port: ${port}`));
```

Sampai di sini kita sudah berhasil melakukan salah satu operasi database yaitu membuat atau menyimpan dokumen. 🦊

> _Pada MongoDB, **barangs** disebut Koleksi dan data yang ada di dalam Koleksi disebut Dokumen_

_**Bersambung...**_
