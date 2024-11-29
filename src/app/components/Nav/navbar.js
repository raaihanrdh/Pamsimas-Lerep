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
} from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_URL } from "@/app/common/api";

export default function Navbar({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
    <div className="flex h-screen">
      <div
        className={`fixed top-0 left-0 h-full bg-sky-600 shadow-2xl text-white transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-64 w-3/4 z-30`}
      >
        <div className="p-5">
          <img src="/logolerep.png" alt="PAMSIMAS Logo" className="w-25 h-10" />
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
              <FiUsers className="pr-2" size={28} />
              Settings Akun
            </Link>
            <Link
              href="/pengaduan"
              className="flex py-2 px-4 items-center border border-white shadow-lg rounded hover:bg-gray-600 transition"
            >
              <FiMessageSquare className="pr-2" size={28} />
              Pengaduan
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
        <Link href="/dashboard">
          <div className="flex flex-col items-center justify-center space-y-1">
            <FiHome
              size={24}
              className="transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-sky-200"
            />
            <span className="text-xs font-semibold">Home</span>
          </div>
        </Link>
        <Link href="/datapelanggan">
          <div className="flex flex-col items-center justify-center space-y-1">
            <FiBook
              size={24}
              className="transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-sky-200"
            />
            <span className="text-xs font-semibold">Data</span>
          </div>
        </Link>
        <Link href="/tagihan">
          <div className="flex flex-col items-center justify-center space-y-1">
            <FiList
              size={24}
              className="transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-sky-200"
            />
            <span className="text-xs font-semibold">Tagihan</span>
          </div>
        </Link>
        <Link href="/pengaduan">
          <div className="flex flex-col items-center justify-center space-y-1">
            <FiMessageCircle
              size={24}
              className="transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-sky-200"
            />
            <span className="text-xs font-semibold">Aduan</span>
          </div>
        </Link>
        <Link href="/ambang">
          <div className="flex flex-col items-center justify-center space-y-1">
            <FiSettings
              size={24}
              className="transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-sky-200"
            />
            <span className="text-xs font-semibold">Set Harga</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
