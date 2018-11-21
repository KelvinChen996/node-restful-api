# Membangun RESTful API menggunakan NodeJs 🛰

## Persiapan

Sebelum memulai, pastikan alat-alat 🛠 berikut sudah terinstal.

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

![node-restful-api-img2](https://3.bp.blogspot.com/-QaU1vqTsvds/W_URtuvmeqI/AAAAAAAAAA0/dYAW3xpXp5wPIxDQ0v_fQhtcVOs5Ll3jwCLcBGAs/s1600/node-restful-api-2.png)

Sampai di sini kita sudah berhasil mempersiapkan project. 🦊
