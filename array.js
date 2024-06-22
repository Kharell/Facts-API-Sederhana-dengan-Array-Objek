const express = require('express');
const app = express();
const port = 3000;

// Data mahasiswa disimpan dalam bentuk array
let dataMahasiswa = [];

// Middleware untuk mengizinkan express mengenali body dari request
app.use(express.json());

// Menambahkan data mahasiswa ke dalam array
function tambahMahasiswa(nama, nim, jurusan, email) {
    let mahasiswa = {
        id: dataMahasiswa.length + 1,
        nama: nama,
        nim: nim,
        jurusan: jurusan,
        email: email
    };
    dataMahasiswa.push(mahasiswa);
    console.log("Mahasiswa baru berhasil ditambahkan!");
}

// Contoh data JSON untuk ditambahkan
const contohDataJSON = [
    {
        nama: "Alice",
        nim: "111111111",
        jurusan: "Ilmu Komputer",
        email: "alice@example.com"
    },
    {
        nama: "Bob",
        nim: "222222222",
        jurusan: "Teknik Elektro",
        email: "bob@example.com"
    }
];


// Menambahkan contoh data JSON ke dalam data mahasiswa
contohDataJSON.forEach(mahasiswa => {
    tambahMahasiswa(mahasiswa.nama, mahasiswa.nim, mahasiswa.jurusan, mahasiswa.email);
});



// Mendapatkan daftar seluruh mahasiswa
app.get('/mahasiswa', (req, res) => {
    res.json(dataMahasiswa);
});



// Mendapatkan detail seorang mahasiswa berdasarkan ID
app.get('/mahasiswa/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const mahasiswa = dataMahasiswa.find(mahasiswa => mahasiswa.id === id);
    if (!mahasiswa) {
        res.status(404).send('Mahasiswa tidak ditemukan');
    } else {
        res.json(mahasiswa);
    }
});



// Menambahkan data mahasiswa baru
app.post('/mahasiswa', (req, res) => {
    const { nama, nim, jurusan, email } = req.body;
    tambahMahasiswa(nama, nim, jurusan, email);
    res.send('Data mahasiswa baru berhasil ditambahkan');
});


// Mengubah data mahasiswa berdasarkan ID
app.put('/mahasiswa/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nama, nim, jurusan, email } = req.body;
    const index = dataMahasiswa.findIndex(mahasiswa => mahasiswa.id === id);
    if (index === -1) {
        res.status(404).send('Mahasiswa tidak ditemukan');
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

// Menghapus data mahasiswa berdasarkan ID
app.delete('/mahasiswa/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = dataMahasiswa.findIndex(mahasiswa => mahasiswa.id === id);
    if (index === -1) {
        res.status(404).send('Mahasiswa tidak ditemukan');
    } else {
        dataMahasiswa.splice(index, 1);
        res.send('Data mahasiswa berhasil dihapus');
    }
});


// kofigurasi port untuk menjalankan server nya
app.listen(port, () => {
    console.log(`Server berjalan pada http://localhost:${port}`);
});
