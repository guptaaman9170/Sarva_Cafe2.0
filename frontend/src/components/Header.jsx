import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/images/logo.png"; // ✅ Make sure this path is correct

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center px-4 py-3 border-b border-gray-800 shadow-md z-20 bg-[#0d0d0d] w-full">
      {/* Back Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="bg-[#1a1a1a] px-4 py-2 rounded-md border border-gray-700 hover:bg-[#2a2a2a] transition cursor-pointer"
        onClick={() => navigate(-1)}
      >
        ⬅ Back
      </motion.button>

      {/* Center Logo */}
      <img
        src={logo}
        alt="Sarva Cafe Logo"
        className="h-10 object-contain"
      />

      {/* Group Ordering Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="bg-gradient-to-r from-orange-500 to-pink-500 px-4 py-2 rounded-md text-white font-semibold hover:opacity-90 transition cursor-pointer"
        onClick={() => alert("Group ordering feature coming soon!")}
      >
        Group Ordering
      </motion.button>
    </header>
  );
}
