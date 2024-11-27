import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-sky-600 flex items-center justify-center">
      <div className="text-center p-8 rounded-lg shadow-lg bg-white max-w-md w-full">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Selamat Datang di PAMSIMAS
        </h1>
        <p className="text-gray-600 mb-8">
          Pilih salah satu layanan berikut untuk mengelola kebutuhan Anda:
        </p>

        <div className="space-y-4">
          {/* Tombol Tagihan */}
          <a
            href="/tagihan"
            className="block py-3 px-6 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Lihat Tagihan
          </a>

          {/* Tombol Pembuatan Aduan */}
          <a
            href="/aduan"
            className="block py-3 px-6 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-300 ease-in-out"
          >
            Buat Aduan
          </a>

          {/* Tombol Monitoring Aduan */}
          <a
            href="/monitoring-aduan"
            className="block py-3 px-6 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition duration-300 ease-in-out"
          >
            Monitoring Aduan
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
