"use client";
import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { FiDollarSign, FiAlertCircle, FiUser, FiLogOut } from "react-icons/fi";
import Cookies from "js-cookie";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { API_URL } from "../common/api";
import { withAuth } from "../utils/routerAuth";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const [totalPelanggan, setTotalPelanggan] = useState(0);
  const [totalTagihan, setTotalTagihan] = useState(0);
  const [jumlahPengaduan, setJumlahPengaduan] = useState(0);
  const [dashboardData, setDashboardData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [totalTagihanBulanan, setTotalTagihanBulanan] = useState(null);
  const [pengaduanChartData, setPengaduanChartData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`${API_URL}/dashboard`);
        const data = await response.json();
        if (response.ok) {
          setDashboardData(data);
          // Total pelanggan
          const totalPelanggan = data.pelangganPerRTRW.reduce(
            (acc, curr) => acc + curr.jumlahPelanggan,
            0
          );
          setTotalPelanggan(totalPelanggan);
          setTotalTagihan(data.pemasukanBulanIni.totalTagihan);
          setJumlahPengaduan(
            data.pengaduanPerBulan.reduce(
              (acc, curr) => acc + curr.jumlahAduan,
              0
            )
          );
        } else {
          console.error("Error fetching data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    if (dashboardData) {
      const totalPelanggan = dashboardData.pelangganPerRTRW.reduce(
        (acc, curr) => acc + curr.jumlahPelanggan,
        0
      );
      setTotalPelanggan(totalPelanggan);

      // Set total tagihan bulan ini dari pemasukanBulanIni
      setTotalTagihan(dashboardData.pemasukanBulanIni.totalTagihan);

      // Set jumlah pengaduan
      setJumlahPengaduan(
        dashboardData.pengaduanPerBulan.reduce(
          (acc, curr) => acc + curr.jumlahAduan,
          0
        )
      );

      // Set chart data pelanggan per RTRW
      const pelangganChartData = {
        labels: dashboardData.pelangganPerRTRW.map((item) => item._id),
        datasets: [
          {
            label: "Jumlah Pelanggan",
            data: dashboardData.pelangganPerRTRW.map(
              (item) => item.jumlahPelanggan
            ),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };
      setChartData(pelangganChartData);

      // Set chart data pemasukan per bulan
      const totalTagihanBulanan = {
        labels: dashboardData.pemasukanPerBulan.map((item) => item._id),
        datasets: [
          {
            label: "Total Pemasukan",
            data: dashboardData.pemasukanPerBulan.map(
              (item) => item.totalTagihan
            ),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      };
      setTotalTagihanBulanan(totalTagihanBulanan);

      // Set chart data pengaduan per bulan
      const pengaduanChartData = {
        labels: dashboardData.pengaduanPerBulan.map((item) => item._id),
        datasets: [
          {
            label: "Jumlah Pengaduan",
            data: dashboardData.pengaduanPerBulan.map(
              (item) => item.jumlahAduan
            ),
            fill: false,
            borderColor: "rgba(255, 99, 132, 1)",
            tension: 0.1,
          },
        ],
      };
      setPengaduanChartData(pengaduanChartData);
    }
  }, [dashboardData]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };
  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/logout`, {
        method: "GET",
      });

      if (response.ok) {
        Cookies.remove("user");
        router.push("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-blue-50 to-blue-100 px-4 py-6">
      {/* Header dengan Tombol Logout */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-white flex items-center text-sky-600 px-4 py-2 rounded-full hover:bg-400-600 transition border border-sky-800 duration-300"
        >
          <FiLogOut className="mr-2" />
          Logout
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-sky-500 shadow-lg rounded-lg p-6 text-center flex items-center justify-between relative group hover:scale-105 transition-transform duration-200">
          <div>
            <h3 className="text-lg text-white font-semibold">
              Total Pelanggan
            </h3>
            <p className="text-3xl text-white font-bold">{totalPelanggan}</p>
          </div>
          <FiUser className="text-7xl p-5 bg-white shadow-sm rounded-full text-teal-500 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Pendapatan Bulanan */}
        <div className="bg-green-300 shadow-lg rounded-lg p-6 text-center flex items-center justify-between relative group hover:scale-105 transition-transform duration-200">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Pendapatan Bulan Ini
            </h3>
            <p className="text-4xl font-bold text-white">
              Rp {totalTagihan.toLocaleString("id-ID")}
            </p>
          </div>
          <FiDollarSign className="text-7xl p-5 bg-white shadow-sm rounded-full text-green-500 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Jumlah Pengaduan */}
        <div className="bg-red-400 shadow-lg rounded-lg p-6 text-center flex items-center justify-between relative group hover:scale-105 transition-transform duration-200">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Jumlah Pengaduan
            </h3>
            <p className="text-4xl font-bold text-white">{jumlahPengaduan}</p>
          </div>
          <FiAlertCircle className="text-7xl text-red-500 bg-white p-5 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {chartData && (
          <div className="bg-white shadow-lg rounded-lg p-6 group hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 group-hover:text-teal-600">
              Pelanggan per RTRW
            </h3>
            <div className="h-64">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        )}

        {/* Chart Tagihan Bulanan */}
        {totalTagihanBulanan && (
          <div className="bg-white shadow-lg rounded-lg p-6 group hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 group-hover:text-teal-600">
              Tagihan Bulanan
            </h3>
            <div className="h-64">
              <Bar data={totalTagihanBulanan} options={chartOptions} />
            </div>
          </div>
        )}
      </div>

      {/* Pengaduan Chart */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-8 group hover:shadow-2xl hover:scale-105 transition-all duration-300">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 group-hover:text-teal-600">
          Pengaduan per Bulan
        </h3>
        {pengaduanChartData && (
          <div className="h-64">
            <Line data={pengaduanChartData} options={chartOptions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(DashboardPage);
