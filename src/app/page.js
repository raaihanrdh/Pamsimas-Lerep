import React from "react";
import { FiAlertCircle, FiCopy, FiFileText, FiSearch } from "react-icons/fi";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-sky-400 flex items-center justify-center p-4">
      <div className="text-center p-8 rounded-lg shadow-2xl bg-white max-w-md w-full">
        <div className="flex justify-center mb-6">
          <img
            src="/api/placeholder/100/100"
            alt="PAMSIMAS Logo"
            className="w-24 h-24 rounded-full border-4 border-sky-400"
          />
        </div>
        <h1 className="text-3xl font-bold text-sky-700 mb-4">PAMSIMAS</h1>
        <p className="text-gray-600 mb-8">
          Pilih salah satu layanan berikut untuk mengelola kebutuhan Anda:
        </p>

        <div className="space-y-4">
          {/* Tombol Tagihan */}
          <a
            href="/tagihanwarga"
            className="flex items-center justify-center py-3 px-6 rounded-full border-2 border-sky-400 text-sky-600 hover:bg-sky-500 hover:text-white transition duration-300 ease-in-out group"
          >
            <FiFileText className="mr-3 group-hover:text-white" />
            Lihat Tagihan
          </a>

          {/* Tombol Pembuatan Aduan */}
          <a
            href="/aduanpelanggan"
            className="flex items-center justify-center py-3 px-6 rounded-full border-2 border-sky-400 text-sky-600 hover:bg-sky-500 hover:text-white transition duration-300 ease-in-out group"
          >
            <FiAlertCircle className="mr-3 group-hover:text-white" />
            Buat Aduan
          </a>

          {/* Tombol Monitoring Aduan */}
          <a
            href="/searchpengaduan"
            className="flex items-center justify-center py-3 px-6 rounded-full border-2 border-sky-400 text-sky-600 hover:bg-sky-500 hover:text-white transition duration-300 ease-in-out group"
          >
            <FiSearch className="mr-3 group-hover:text-white" />
            Monitoring Aduan
          </a>
        </div>

        {/* Footer Copyright */}
        <div className="mt-8 text-sm text-gray-500 flex items-center justify-center">
          <span>© 2024 KKNT Desa Lerep. All Rights Reserved.</span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
