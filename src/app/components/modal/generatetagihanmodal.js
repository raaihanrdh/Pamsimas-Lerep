import { useState } from "react";

export default function GenerateTagihanModal({ closeModal, alamatRumah }) {
  const [bulanTagihan, setBulanTagihan] = useState("Januari");
  const [tahunTagihan, setTahunTagihan] = useState("2024");

  const [excelData, setExcelData] = useState(null);
  const ROOT_API = process.env.NEXT_PUBLIC_API;
  const API_V = process.env.NEXT_PUBLIC_API_V;

  const handleGenerate = async () => {
    if(bulanTagihan && tahunTagihan && alamatRumah) {
        const response = await fetch(`${ROOT_API}/${API_V}/generatetagihan?alamatRumah=${alamatRumah}&bulanTagihan=${bulanTagihan}&tahunTagihan=${tahunTagihan}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
          });
      
          if(response.status === 200) {
              const blob = await response.blob();
      
              const url = URL.createObjectURL(blob);
          
              setExcelData(url);
          } else {
              console.log('Data Kosong!')
          }
    } else {
        console.log('Isi seluruh isian')
    }
    
    // closeModal();
  };

  const handleBulanTagihan = async (value) => {
    setBulanTagihan(value)
    console.log(`BULAN : ${value}`)
  }

  const handleTahunTagihan = async (value) => {
    setTahunTagihan(value)
    console.log(`TAHUN : ${value}`)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="relative w-full max-w-lg p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Tambah Data Pelanggan
        </h2>
        <div className="space-y-5">
          {/* Bulan */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Pilih Bulan
            </label>
            <select id="mySelect"
            onChange={(e) => handleBulanTagihan(e.target.value)}>
                <option value="01">Januari</option>
                <option value="02">Februari</option>
                <option value="03">Maret</option>
                <option value="04">April</option>
                <option value="05">Mei</option>
                <option value="06">Juni</option>
                <option value="07">Juli</option>
                <option value="08">Agustus</option>
                <option value="09">September</option>
                <option value="10">Oktober</option>
                <option value="11">November</option>
                <option value="12">Desember</option>
            </select>
          </div>
          {/* Tahun */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Pilih Tahun
            </label>
            <select id="mySelect"
            onChange={(e) => handleTahunTagihan(e.target.value)}>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
            </select>
          </div>
        </div>
        {/* Tombol */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={closeModal}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            Batal
          </button>
          <button
            onClick={handleGenerate}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Generate Excel
          </button>
          {excelData && (
              <a href={excelData} onClick={closeModal} download={`tagihan_${bulanTagihan}_${tahunTagihan}_${alamatRumah}.xlsx`}>
                Download Excel
              </a>
          )}
        </div>
      </div>
    </div>
  );
}
