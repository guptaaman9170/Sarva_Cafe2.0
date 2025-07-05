import Header from "../components/Header"; // Adjust the path if needed
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MenuPage() {
  const [cart, setCart] = useState({});
  const navigate = useNavigate();

  const menuItems = [
    { name: "Paneer Tikka", price: 180 },
    { name: "Veg Biryani", price: 160 },
    { name: "Butter Naan", price: 40 },
    { name: "Dal Makhani", price: 120 },
    { name: "Masala Dosa", price: 90 },
    { name: "Cold Coffee", price: 70 },
    { name: "Brownie with Ice Cream", price: 130 },
  ];

  const handleAdd = (name) => {
    setCart((prev) => ({
      ...prev,
      [name]: (prev[name] || 0) + 1,
    }));
  };

  const handleRemove = (name) => {
    setCart((prev) => {
      const newCount = (prev[name] || 0) - 1;
      if (newCount <= 0) {
        const { [name]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [name]: newCount };
    });
  };

  const handleContinue = () => {
    localStorage.setItem("sarva_cart", JSON.stringify(cart));
    navigate("/order-summary");
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      {/* Header */}
      <Header />

      {/* Menu Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-400">
          Menu
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center bg-[#1a1a1a] px-6 py-4 rounded-xl border border-gray-700 hover:bg-[#2a2a2a] transition"
            >
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-400">₹{item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="bg-red-500 px-3 py-1 rounded-full text-white font-bold hover:opacity-80 cursor-pointer"
                  onClick={() => handleRemove(item.name)}
                >
                  -
                </button>
                <span className="min-w-[20px] text-center">
                  {cart[item.name] || 0}
                </span>
                <button
                  className="bg-green-500 px-3 py-1 rounded-full text-white font-bold hover:opacity-80 cursor-pointer"
                  onClick={() => handleAdd(item.name)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="mt-10 text-center">
          <button
            onClick={handleContinue}
            className="bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition cursor-pointer"
          >
            Continue ➡️
          </button>
        </div>
      </div>
    </div>
  );
}
