// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// GANTI DENGAN FIREBASE CONFIG ANDA
const firebaseConfig = {
  apiKey: "AIzaSyB9EaNXAdvcCLMbBJ28qV6LMaSn_lTqV-Y",
  authDomain: "insancemerlang-7a28d.firebaseapp.com",
  projectId: "insancemerlang-7a28d",
  storageBucket: "insancemerlang-7a28d.firebasestorage.app",
  messagingSenderId: "171651111733",
  appId: "1:171651111733:web:20dec17c77e76d25edca7c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const tanamanCollection = collection(db, "tanaman")

//fungsi untum menampilkan daftar film dan drama
export async function daftartanaman() {
  
  // ambil snapshot data dari koleksi film
  const snapshot = await getDocs(tanamanCollection)
  
  // ambil elemen tabel data
  const tabel = document.getElementById('tabeldata')
  
  // kosongkan isi tabel nya
  tabel.innerHTML = ""
  
  // loop setiap dokumen dalam snapshot
  snapshot.forEach((doc) => {
    // variabel untuk menyimpan data
    const data = doc.data()
    const id = doc.id
    
    // buat elemen baris baru
    const baris = document.createElement("tr")
    
    // elemen nama barang
    const nomerurut= document.createElement("tr")
    nomerurut.textContent = tabel.rows.length + 1
    
    //buat elemen kolom untuk nomor urut 
    const namatanaman = document.createElement("td")
    namatanaman.textContent = data.namatanaman
    
    // buat elemen kolom untuk judul
    const warna = document.createElement("td")
    warna.textContent = data.warna
    
    // buat elemen untuk kolom sinopsis
    const jenis = document.createElement("td")
    jenis.textContent = data.jenis
    
    // buat elemen kolom untuk aktor
    const aksi = document.createElement('td')
    aksi.textContent = data.aksi
    
    // buat elemen kolom untuk aksi
    const kolomAksi = document.createElement('td')
    
    // tombol edit
    const tombolEdit = document.createElement('a')
    tombolEdit.textContent = 'Edit'
    tombolEdit.href = 'edit.html?id=' + id
    tombolEdit.className = 'button edit'
    
    // tombol hapus
    const tombolHapus = document.createElement('button')
    tombolHapus.textContent = 'Hapus'
    tombolHapus.className = 'button delete'
    tombolHapus.onclick = async () => {
      await hapustanaman(id)
    }
    
    // tambahkan elemen ke dalam kolom aksi
    kolomAksi.appendChild(tombolEdit)
    kolomAksi.appendChild(tombolHapus)
    
    // tambahkan kolom ke dalam baris
    baris.appendChild(nomerurut)
    baris.appendChild(namatanaman)
    baris.appendChild(warna)
    baris.appendChild(jenis)
    baris.appendChild(kolomAksi)
    
    // tambahkan baris ke aalam tabel
    tabel.appendChild(baris)
    
  })
}

//fungsi untuk menambah tanaman baru
export async function tambahtanaman () {
  //ambil nilai dari from
  const namatanaman = document.getElementById('namatanaman').value
  const warna = document.getElementById('warna').value
  const jenis = document.getElementById('jenis').value
  
  // tambahkan data ke firestore
  await addDoc(tanamanCollection, {
    namatanaman: namatanaman,
    warna: warna,
    jenis: jenis,
  })
  
    // alihkan ke halaman daftar tanaman
  window.location.href = 'daftar.html'
}

//fungsi untuk menghapus data tanaman
export async function hapustanaman(id){
    if (!confirm("yakin ingin menghapus data ini? "))return
    //menghapus dokumen tanaman berdasarkan id
    await deleteDoc(doc(db,"tanaman",id))
    
    //refresh data
    await daftartanaman()
    
}

//fungsi untuk mengambil data barang bedasarkan id
  //agar data ditampilkan di form. ubah
  export async function ambiltanaman(id) {
    const docRef = doc(db, "tanaman", id)
    const docSnap = await getDoc(docRef)
    
    return await docSnap.data()
  }
 
    //fungsi untuk mengubah data tanaman
  export async function ubahtanaman(id, namatanaman, warna, jenis) {
    // mengubah data di firestore
    await updateDoc(doc(db, "tanaman", id), {
      namatanaman: namatanaman,
      warna: warna,
      jenis: jenis,
    })
    //alihkan kehalaman daftar tanaman
    window.location.href ='daftar.html'
    
    }
    
    