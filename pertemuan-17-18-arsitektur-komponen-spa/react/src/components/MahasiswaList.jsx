// Mini Project - Pertemuan 17-18: Komponen induk, merender banyak MahasiswaCard
// TODO 3: lengkapi komponen ini.

import MahasiswaCard from "./MahasiswaCard";

function MahasiswaList(/* TODO: destructure { mahasiswa } dari props */) {
  // TODO: jika mahasiswa.length === 0, kembalikan <p className="empty">Tidak ada mahasiswa yang cocok.</p>
  const [mahasiswa] = useState([
    { id: 1, nama: 'Andi', nim: '2024001' },
    { id: 2, nama: 'Budi', nim: '2024002' },
  ]);


  return mahasiswa.map((m) => (
    <MahasiswaCard key={m.id} nama={m.nama} nim={m.nim} />
  ));
}


export default MahasiswaList;
