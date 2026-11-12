// Mini Project - Pertemuan 17-18: Komponen induk, merender banyak MahasiswaCard
// TODO 3: lengkapi komponen ini.

import MahasiswaCard from "./MahasiswaCard";

function MahasiswaList({mahasiswa}) {
  // TODO: jika mahasiswa.length === 0, kembalikan <p className="empty">Tidak ada mahasiswa yang cocok.</p>
  if(mahasiswa.length === 0){
    return (<p>Tidak ada mahasiswa yang cocok.</p>)
  }
  return mahasiswa.map((m) => (
    <MahasiswaCard key={m.id} nama={m.nama} nim={m.nim} />
  ));
}


export default MahasiswaList;
