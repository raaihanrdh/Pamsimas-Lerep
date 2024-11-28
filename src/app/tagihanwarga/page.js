"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../common/api";
import { FiFileText, FiHome, FiSearch } from "react-icons/fi";

const TagihanPelanggan = () => {
  const [dataRT, setDataRT] = useState([]);
  const [selectedRT, setSelectedRT] = useState("");
  const [idMeteran, setIdMeteran] = useState("");
  const [dataTagihan, setDataTagihan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch RT/RW data on component mount
  useEffect(() => {
    const fetchRT = async () => {
      try {
        const response = await fetch(`${API_URL}/pelangganRTRW`);
        const data = await response.json();
        setDataRT(data.data);
      } catch (err) {
        setError("Gagal mengambil data RT/RW");
      }
    };

    fetchRT();
  }, []);

  // Fetch tagihan when RT and ID Meteran are selected
  const fetchTagihan = async () => {
    if (!selectedRT || !idMeteran) {
      setError("Silakan pilih RT/RW dan masukkan ID Meteran");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${API_URL}/tagihan?idMeteran=${idMeteran}`
      );
      const data = response.data.data;

      if (Array.isArray(data)) {
        setDataTagihan(data);
      } else {
        setError("Tidak ada data tagihan ditemukan");
        setDataTagihan([]);
      }
    } catch (error) {
      setError("Gagal mengambil data tagihan");
      setDataTagihan([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-sky-400 justify-center text-white p-6 flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Cek Tagihan Air</h1>
        </div>

        <div className="p-6 space-y-6">
          {/* RT/RW Selection */}
          <div className="space-y-2">
            <label className="flex items-center text-gray-700 font-semibold">
              <FiHome className="mr-2 w-5 h-5 text-sky-400" />
              Pilih RT/RW
            </label>
            <div className="relative">
              <select
                value={selectedRT}
                onChange={(e) => setSelectedRT(e.target.value)}
                className="w-full px-4 py-3 border-2 border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
              >
                <option value="">Pilih RT/RW</option>
                {dataRT.map((rw) => {
                  const match = rw._id.match(/RT (\d+) RW (\d+)/);
                  const rtRwText = match
                    ? `RT ${match[1]} / RW ${match[2]}`
                    : rw._id;

                  return (
                    <option key={rw._id} value={rw._id}>
                      {rtRwText}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* ID Meteran Input */}
          <div className="space-y-2">
            <label className="flex items-center text-gray-700 font-semibold">
              <FiFileText className="mr-2 w-5 h-5 text-sky-400" />
              ID Meteran
            </label>
            <input
              type="text"
              value={idMeteran}
              onChange={(e) => setIdMeteran(e.target.value)}
              placeholder="Masukkan ID Meteran"
              className="w-full px-4 py-3 border-2 border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
            />
          </div>

          {/* Search Button */}
          <button
            onClick={fetchTagihan}
            disabled={!selectedRT || !idMeteran}
            className="w-full bg-sky-400 text-white flex items-center justify-center px-4 py-3 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiSearch className="mr-2 w-5 h-5" />
            Cek Tagihan
          </button>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg">
              <p className="font-bold">Terjadi Kesalahan</p>
              <p>{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center space-x-2 text-sky-400">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-400"></div>
              <span>Sedang mengambil data...</span>
            </div>
          )}

          {/* Tagihan List */}
          {dataTagihan.length > 0 && (
            <div className="mt-6 space-y-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <FiCreditCard className="mr-2 w-6 h-6 text-sky-400" />
                Detail Tagihan
              </h2>
              {dataTagihan.map((tagihan) => (
                <div
                  key={tagihan.idTagihan}
                  className="bg-white border-2 border-sky-100 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { label: "ID Meteran", value: tagihan.idMeteran },
                      {
                        label: "Meteran Sebelumnya",
                        value: tagihan.meteranSebelumnya,
                      },
                      {
                        label: "Meteran Sekarang",
                        value: tagihan.meteranSekarang,
                      },
                      {
                        label: "Total Tagihan",
                        value: `Rp ${tagihan.totalTagihan.toLocaleString()}`,
                        className: "font-bold text-sky-400",
                      },
                      {
                        label: "Status Pembayaran",
                        value: tagihan.statusPembayaran,
                        className:
                          tagihan.statusPembayaran === "Lunas"
                            ? "text-green-600 font-bold"
                            : "text-red-600 font-bold",
                      },
                    ].map((item) => (
                      <div key={item.label} className="space-y-1">
                        <p className="text-gray-600 font-medium">
                          {item.label}:
                        </p>
                        <p className={item.className || ""}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TagihanPelanggan;
