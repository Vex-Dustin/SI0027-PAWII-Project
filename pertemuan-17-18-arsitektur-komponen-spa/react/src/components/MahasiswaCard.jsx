// Mini Project - Pertemuan 17-18: Komponen anak, menerima data lewat props
// TODO 1: lengkapi komponen agar menerima props { nama, nim } dan menampilkannya.

function MahasiswaCard({nama, nim}) {
  console.log(nama);
  return (
    <div className="card">
      <h3>{nama}</h3>
      <p>NIM: {nim}</p>
    </div>
  );
}

export default MahasiswaCard;
