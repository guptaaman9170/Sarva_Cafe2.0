import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header"; // ✅ adjust path if needed

export default function GroupOrdering() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      {/* ✅ Header Component */}
      <Header />

      {/* Center Buttons */}
      <div className="flex flex-col gap-6 items-center justify-center flex-1 z-10 mt-6">
        <button
          onClick={() => navigate("/menu")}
          className="bg-[#1a1a1a] px-10 py-4 rounded-xl text-lg font-medium border border-gray-700 text-white cursor-pointer hover:bg-[#2a2a2a] transition"
        >
          🍽️ View Menu
        </button>

        <button
          onClick={() => navigate("/smartserve")}
          className="bg-[#1a1a1a] px-10 py-4 rounded-xl text-lg font-medium border border-gray-700 text-white cursor-pointer hover:bg-[#2a2a2a] transition"
        >
          🎙️ Smart Serve
        </button>
      </div>

      <div className="h-8"></div>
    </div>
  );
}
