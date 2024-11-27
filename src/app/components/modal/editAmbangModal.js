import React, { useState } from "react";
import Toast from "../Toast/successToast";

export default function EditAmbangModal({
  editData,
  setEditData,
  setModalOpen,
  setData,
}) {
  const [formData, setFormData] = useState({
    ambangMinimumUsaha: editData.ambangMinimum.meteranUsaha,
    ambangMinimumPribadi: editData.ambangMinimum.meteranPribadi,
    nominalMinimumUsaha: editData.nominalMinimum.meteranUsaha,
    nominalMinimumPribadi: editData.nominalMinimum.meteranPribadi,
    hargaPerKubikUsaha: editData.hargaPerKubik.meteranUsaha,
    hargaPerKubikPribadi: editData.hargaPerKubik.meteranPribadi,
    biayaAdminUsaha: editData.biayaAdmin.meteranUsaha,
    biayaAdminPribadi: editData.biayaAdmin.meteranPribadi,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSave = async () => {
    const updatedData = {
      ...editData,
      ambangMinimum: {
        meteranUsaha: formData.ambangMinimumUsaha,
        meteranPribadi: formData.ambangMinimumPribadi,
      },
      nominalMinimum: {
        meteranUsaha: formData.nominalMinimumUsaha,
        meteranPribadi: formData.nominalMinimumPribadi,
      },
      hargaPerKubik: {
        meteranUsaha: formData.hargaPerKubikUsaha,
        meteranPribadi: formData.hargaPerKubikPribadi,
      },
      biayaAdmin: {
        meteranUsaha: formData.biayaAdminUsaha,
        meteranPribadi: formData.biayaAdminPribadi,
      },
    };

    try {
      const response = await fetch(
        `http://127.0.0.1:4000/api/v1/ambang/${editData.dusunRTRW}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      const result = await response.json();

      if (response.status === 200) {
        setModalOpen(false);
        setToastType("success");
        setResponseMessage("Update Data Berhasil.");
        setData((prevData) =>
          prevData.map((item) =>
            item.dusunRTRW === editData.dusunRTRW ? updatedData : item
          )
        );
      } else {
        setToastType("error");
        setResponseMessage("Update Gagal.");
      }
    } catch (error) {
      console.error("Error updating ambang data:", error);
      setToastType("error");
      setResponseMessage("Terjadi kesalahan saat memperbarui data.");
    }
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // Hide toast after 3 seconds
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-xl font-semibold mb-4">Edit Data Ambang</h3>

        {/* Form input untuk Ambang Minimum */}
        <div className="mb-4">
          <label className="block mb-1">Ambang Minimum Usaha</label>
          <input
            type="number"
            name="ambangMinimumUsaha"
            value={formData.ambangMinimumUsaha}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Ambang Minimum Pribadi</label>
          <input
            type="number"
            name="ambangMinimumPribadi"
            value={formData.ambangMinimumPribadi}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Form input untuk Nominal Minimum */}
        <div className="mb-4">
          <label className="block mb-1">Nominal Minimum Usaha</label>
          <input
            type="number"
            name="nominalMinimumUsaha"
            value={formData.nominalMinimumUsaha}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Nominal Minimum Pribadi</label>
          <input
            type="number"
            name="nominalMinimumPribadi"
            value={formData.nominalMinimumPribadi}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Form input untuk Harga Per Kubik */}
        <div className="mb-4">
          <label className="block mb-1">Harga Per Kubik Usaha</label>
          <input
            type="number"
            name="hargaPerKubikUsaha"
            value={formData.hargaPerKubikUsaha}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Harga Per Kubik Pribadi</label>
          <input
            type="number"
            name="hargaPerKubikPribadi"
            value={formData.hargaPerKubikPribadi}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Form input untuk Biaya Admin */}
        <div className="mb-4">
          <label className="block mb-1">Biaya Admin Usaha</label>
          <input
            type="number"
            name="biayaAdminUsaha"
            value={formData.biayaAdminUsaha}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Biaya Admin Pribadi</label>
          <input
            type="number"
            name="biayaAdminPribadi"
            value={formData.biayaAdminPribadi}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setModalOpen(false)}
            className="py-2 px-4 bg-gray-300 text-white rounded hover:bg-gray-400"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Simpan
          </button>
        </div>
      </div>
      {showToast && (
        <Toast
          type={toastType}
          message={responseMessage}
          isOpen={showToast}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
