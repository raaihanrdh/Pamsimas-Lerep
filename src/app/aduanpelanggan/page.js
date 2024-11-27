import React, { useState } from "react";

const EditableTable = () => {
  const [data, setData] = useState([
    {
      dusunRTRW: "Dusun 1 RT 1 RW 1",
      ambangMinimum: {
        meteranUsaha: 10,
        meteranPribadi: 5,
      },
      nominalMinimum: {
        meteranUsaha: 100000,
        meteranPribadi: 50000,
      },
      hargaPerKubik: {
        meteranUsaha: 5000,
        meteranPribadi: 2500,
      },
      biayaAdmin: {
        meteranUsaha: 20000,
        meteranPribadi: 10000,
      },
    },
    {
      dusunRTRW: "Dusun 2 RT 2 RW 2",
      ambangMinimum: {
        meteranUsaha: 15,
        meteranPribadi: 7,
      },
      nominalMinimum: {
        meteranUsaha: 120000,
        meteranPribadi: 60000,
      },
      hargaPerKubik: {
        meteranUsaha: 6000,
        meteranPribadi: 3000,
      },
      biayaAdmin: {
        meteranUsaha: 25000,
        meteranPribadi: 15000,
      },
    },
  ]);

  const handleChange = (e, index, field, subField) => {
    const value = e.target.value;
    setData((prevData) => {
      const updatedData = [...prevData];
      if (subField) {
        updatedData[index][field][subField] = value;
      } else {
        updatedData[index][field] = value;
      }
      return updatedData;
    });
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="min-w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Dusun RT/RW
            </th>
            <th scope="col" className="px-6 py-3">
              Ambang Minimum (Meteran Usaha)
            </th>
            <th scope="col" className="px-6 py-3">
              Ambang Minimum (Meteran Pribadi)
            </th>
            <th scope="col" className="px-6 py-3">
              Nominal Minimum (Meteran Usaha)
            </th>
            <th scope="col" className="px-6 py-3">
              Nominal Minimum (Meteran Pribadi)
            </th>
            <th scope="col" className="px-6 py-3">
              Harga Per Kubik (Meteran Usaha)
            </th>
            <th scope="col" className="px-6 py-3">
              Harga Per Kubik (Meteran Pribadi)
            </th>
            <th scope="col" className="px-6 py-3">
              Biaya Admin (Meteran Usaha)
            </th>
            <th scope="col" className="px-6 py-3">
              Biaya Admin (Meteran Pribadi)
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="bg-white border-b">
              <td className="px-6 py-4">{row.dusunRTRW}</td>
              <td className="px-6 py-4">
                <input
                  type="number"
                  value={row.ambangMinimum.meteranUsaha}
                  onChange={(e) =>
                    handleChange(e, index, "ambangMinimum", "meteranUsaha")
                  }
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="px-6 py-4">
                <input
                  type="number"
                  value={row.ambangMinimum.meteranPribadi}
                  onChange={(e) =>
                    handleChange(e, index, "ambangMinimum", "meteranPribadi")
                  }
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="px-6 py-4">
                <input
                  type="number"
                  value={row.nominalMinimum.meteranUsaha}
                  onChange={(e) =>
                    handleChange(e, index, "nominalMinimum", "meteranUsaha")
                  }
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="px-6 py-4">
                <input
                  type="number"
                  value={row.nominalMinimum.meteranPribadi}
                  onChange={(e) =>
                    handleChange(e, index, "nominalMinimum", "meteranPribadi")
                  }
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="px-6 py-4">
                <input
                  type="number"
                  value={row.hargaPerKubik.meteranUsaha}
                  onChange={(e) =>
                    handleChange(e, index, "hargaPerKubik", "meteranUsaha")
                  }
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="px-6 py-4">
                <input
                  type="number"
                  value={row.hargaPerKubik.meteranPribadi}
                  onChange={(e) =>
                    handleChange(e, index, "hargaPerKubik", "meteranPribadi")
                  }
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="px-6 py-4">
                <input
                  type="number"
                  value={row.biayaAdmin.meteranUsaha}
                  onChange={(e) =>
                    handleChange(e, index, "biayaAdmin", "meteranUsaha")
                  }
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="px-6 py-4">
                <input
                  type="number"
                  value={row.biayaAdmin.meteranPribadi}
                  onChange={(e) =>
                    handleChange(e, index, "biayaAdmin", "meteranPribadi")
                  }
                  className="w-full p-2 border rounded"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;
