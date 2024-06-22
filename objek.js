const express = require('express');
const app = express();
const port = 3003; // Biasanya port untuk aplikasi web

// Data Mahasiswa Disimpan dalam bentuk Array
const dataMahasiswa = [];

// Middleware untuk mengizinkan express mengenali body dari request
app.use(express.json());

// Menambah data mahasiswa ke dalam array
function tambahMahasiswa(nama, nim, jurusan, email) {
    const mahasiswa = {
        id: dataMahasiswa.length + 1,
        nama: nama,
        nim: nim,
        jurusan: jurusan,
        email: email
    };
    dataMahasiswa.push(mahasiswa);
    console.log('Data Mahasiswa Berhasil Ditambahkan !!');
}

// Contoh menyimpan banyak data dalam objek tanpa menggunakan pembungkus array
const contohDataJSON = {
    "mahasiswa1": {
        "nama": "Rizky",
        "nim": "L200180",
        "jurusan": "Teknik Informatika",
        "email": "rizky@gmail.com"
    },
    "mahasiswa2": {
        "nama": "Karel",
        "nim": "L20",
        "jurusan": "Teknik Informatika",
        "email": "karel@gmail.com"
    }
};

// Menambahkan contoh data JSON ke dalam data mahasiswa
Object.values(contohDataJSON).forEach(mahasiswa => {
    tambahMahasiswa(mahasiswa.nama, mahasiswa.nim, mahasiswa.jurusan, mahasiswa.email);
});

// Mendapatkan daftar seluruh mahasiswa dengan menggunakan method GET
app.get('/mahasiswa', (req, res) => {
    res.json(dataMahasiswa);
});

// Mendapatkan detail seorang mahasiswa dengan menggunakan id dengan method GET
app.get('/mahasiswa/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const mahasiswa = dataMahasiswa.find(mahasiswa => mahasiswa.id === id);
    if (!mahasiswa) {
        res.status(404).send('Data Mahasiswa tidak ditemukan');
    } else {
        res.json(mahasiswa);
    }
});

// Menambah data mahasiswa baru dengan method POST
app.post('/mahasiswa', (req, res) => {
    const { nama, nim, jurusan, email } = req.body;
    tambahMahasiswa(nama, nim, jurusan, email);
    res.send('Data mahasiswa baru berhasil ditambahkan');
});

// Mengubah data mahasiswa berdasarkan id dengan method PUT
app.put('/mahasiswa/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nama, nim, jurusan, email } = req.body;
    const index = dataMahasiswa.findIndex(mahasiswa => mahasiswa.id === id);
    if (index === -1) {
        res.status(404).send('Data Mahasiswa tidak ditemukan');
    } else {
        dataMahasiswa[index] = {
            id: id,
            nama: nama,
            nim: nim,
            jurusan: jurusan,
            email: email
        };
        res.send('Data mahasiswa berhasil diubah');
    }
});

// Menghapus data mahasiswa berdasarkan ID dengan method DELETE
app.delete('/mahasiswa/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = dataMahasiswa.findIndex(mahasiswa => mahasiswa.id === id);
    if (index === -1) {
        res.status(404).send('Data mahasiswa tidak ditemukan');
    } else {
        dataMahasiswa.splice(index, 1);
        res.send('Data mahasiswa berhasil dihapus');
    }
});

// Konfigurasi port untuk menjalankan server nya
app.listen(port, () => {
    console.log(`Server berjalan pada http://localhost:${port}`);
});
