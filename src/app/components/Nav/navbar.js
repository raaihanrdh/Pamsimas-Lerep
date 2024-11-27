"use client";
import { useState } from "react";
import Cookies from "js-cookie";
import {
  FiBook,
  FiHome,
  FiList,
  FiMessageCircle,
  FiUsers,
  FiLogOut,
  FiSettings,
  FiMessageSquare,
  FiUser,
  FiBookOpen,
} from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:4000/api/v1/logout", {
        method: "GET",
      });

      if (response.ok) {
        Cookies.remove("user");
        router.push("/"); // Redirect ke halaman login
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <div
        className={`fixed top-0 left-0 h-full bg-sky-600 shadow-2xl text-white transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-64 w-3/4 z-30`}
      >
        <div className="p-5">
          <h2 className="text-2xl font-semibold">Logo</h2>
          <nav className="flex flex-col gap-5 mt-10">
            <Link
              href="/dashboard"
              className="flex py-2 px-4 items-center border border-white shadow-lg rounded hover:bg-gray-600 transition"
            >
              <FiHome className="pr-2" size={28} /> Dashboard
            </Link>
            <Link
              href="/datapelanggan"
              className="flex py-2 px-4 items-center border border-white shadow-lg rounded hover:bg-gray-600 transition"
            >
              <FiBook className="pr-2" size={28} />
              Data Pelanggan
            </Link>
            <Link
              href="/tagihan"
              className="flex py-2 px-4 items-center border border-white shadow-lg rounded hover:bg-gray-600 transition"
            >
              <FiList className="pr-2" size={28} />
              Tagihan
            </Link>
            <Link
              href="/ambang"
              className="flex py-2 px-4 items-center border border-white shadow-lg rounded hover:bg-gray-600 transition"
            >
              <FiSettings className="pr-2" size={28} />
              Settings Harga
            </Link>
            <Link
              href="/akun"
              className="flex py-2 px-4 items-center border border-white shadow-lg rounded hover:bg-gray-600 transition"
            >
              <FiUser className="pr-2" size={28} />
              Settings Akun
            </Link>
            <Link
              href="/pengaduan"
              className="flex py-2 px-4 items-center border border-white shadow-lg rounded hover:bg-gray-600 transition"
            >
              <FiMessageSquare className="pr-2" size={28} />
              Pengaduan
            </Link>
            <Link
              href="/aduanpelanggan"
              className="flex py-2 px-4 items-center border border-white shadow-lg rounded hover:bg-gray-600 transition"
            >
              <FiBookOpen className="pr-2" size={28} />
              Data Pengaduan
            </Link>
            <button
              onClick={handleLogout}
              className="flex py-2 px-4 items-center border border-white shadow-lg rounded hover:bg-gray-600 transition"
            >
              <FiLogOut className="pr-2" size={28} />
              Logout
            </button>
          </nav>
        </div>
      </div>
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } md:ml-0`}
      >
        <main className="bg-gradient-to-b from-blue-50 to-blue-100 md:ml-64">
          {children}
        </main>
      </div>
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-sky-600 text-white flex justify-around py-3 rounded-t-lg shadow-lg">
        <Link href="/Dashboard">
          <div className="flex flex-col items-center justify-center">
            <FiHome
              size={28}
              className="transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-sky-200"
            />
            <span className="text-xs mt-1">Home</span>
          </div>
        </Link>
        <Link href="/DataPelanggan">
          <div className="flex flex-col items-center justify-center">
            <FiBook
              size={28}
              className="transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-sky-200"
            />
            <span className="text-xs mt-1">Pelanggan</span>
          </div>
        </Link>
        <Link href="/Tagihan">
          <div className="flex flex-col items-center justify-center">
            <FiList
              size={28}
              className="transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-sky-200"
            />
            <span className="text-xs mt-1">Tagihan</span>
          </div>
        </Link>
        <Link href="/Pengaduan">
          <div className="flex flex-col items-center justify-center">
            <FiMessageCircle
              size={28}
              className="transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-sky-200"
            />
            <span className="text-xs mt-1">Pengaduan</span>
          </div>
        </Link>
        <Link href="/AduanPelanggan">
          <div className="flex flex-col items-center justify-center">
            <FiUsers
              size={28}
              className="transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-sky-200"
            />
            <span className="text-xs mt-1">Aduan</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
