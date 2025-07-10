import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import logo from "../assets/images/logo.png"; // Adjust the path if needed

export default function Landing() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) {
      return alert("Please fill in both name and phone number.");
    }

    if (!/^\d{10}$/.test(phone)) {
      return alert("Please enter a valid 10-digit phone number.");
    }

    try {
      await axios.post("http://localhost:5000/api/users", {
        name,
        phone,
      });

      localStorage.setItem("user", JSON.stringify({ name, phone }));
      navigate("/group-ordering");
    } catch (error) {
      console.error("Error saving user:", error);
      alert(error?.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen text-white flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 brightness-75"
        style={{
          backgroundImage: "url('/src/assets/images/restaurant-img.png')",
        }}
      ></div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-10 w-[90%] max-w-xl shadow-2xl"
      >
        <h1 className="justify-center text-4xl font-bold text-center mb-8 flex items-center gap-2">
          Welcome to{" "}
          <img
            src={logo}
            alt="Sarva Cafe"
            className="h-12 sm:h-16 object-contain"
          />
        </h1>

        <div className="space-y-6">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none text-lg"
          />
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none text-lg"
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={handleSubmit}
          className="mt-8 w-full bg-gradient-to-r from-orange-500 to-red-500 py-4 rounded-xl text-white font-semibold text-lg cursor-pointer"
        >
          Start Ordering 🍽️
        </motion.button>
      </motion.div>
    </div>
  );
}
