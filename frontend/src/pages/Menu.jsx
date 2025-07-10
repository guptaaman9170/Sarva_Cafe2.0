import Header from "../components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { FiMic, FiMicOff } from "react-icons/fi";

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

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleVoiceOrder = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Your browser does not support voice recognition");
      return;
    }
    if (listening) {
      SpeechRecognition.stopListening();
      processVoiceOrder(transcript);
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  const processVoiceOrder = (text) => {
    const words = text.toLowerCase().split(" ");
    const matchedItems = menuItems.filter((item) =>
      words.some((word) => item.name.toLowerCase().includes(word))
    );

    if (matchedItems.length === 0) {
      alert("No matching menu items found.");
      return;
    }

    const updatedCart = { ...cart };
    matchedItems.forEach((item) => {
      updatedCart[item.name] = (updatedCart[item.name] || 0) + 1;
    });
    setCart(updatedCart);
  };

  const speakOrderSummary = () => {
    if (Object.keys(cart).length === 0) {
      return alert("Cart is empty");
    }

    const synth = window.speechSynthesis;
    let speechText = "You have ordered: ";
    Object.entries(cart).forEach(([item, quantity]) => {
      speechText += `${quantity} ${item}, `;
    });

    const utter = new SpeechSynthesisUtterance(speechText);
    utter.rate = 0.9;
    utter.pitch = 1;
    synth.speak(utter);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-400">Menu</h2>

        {/* Cards Section */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Manual Ordering Card */}
          <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold mb-4 text-pink-400">🖐️ Manual Entry</h3>
            <div className="flex flex-col gap-4">
              {menuItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-[#2a2a2a] px-4 py-3 rounded-lg"
                >
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-400">₹{item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="bg-red-500 px-3 py-1 rounded-full text-white font-bold"
                      onClick={() => handleRemove(item.name)}
                    >
                      -
                    </button>
                    <span>{cart[item.name] || 0}</span>
                    <button
                      className="bg-green-500 px-3 py-1 rounded-full text-white font-bold"
                      onClick={() => handleAdd(item.name)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Smart Serve Card */}
          <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-700 text-center">
            <h3 className="text-xl font-bold mb-4 text-blue-400">🎙️ Smart Serve</h3>

            <button
              onClick={handleVoiceOrder}
              className={`mx-auto mb-4 p-4 rounded-full ${
                listening ? "bg-red-600 animate-pulse" : "bg-blue-600"
              } text-white text-3xl`}
            >
              {listening ? <FiMicOff /> : <FiMic />}
            </button>

            {transcript && (
              <p className="text-sm text-gray-300">
                You said: <span className="italic text-white">{transcript}</span>
              </p>
            )}

            {/* Summary */}
            {Object.keys(cart).length > 0 && (
              <div className="mt-6 text-left">
                <h4 className="text-lg font-semibold text-green-400 mb-2">🧾 Order Summary:</h4>
                <ul className="mb-4 list-disc list-inside text-sm text-gray-200">
                  {Object.entries(cart).map(([item, qty], idx) => (
                    <li key={idx}>
                      {qty} x {item}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={handleContinue}
                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white"
                  >
                    ✅ Confirm
                  </button>
                  <button
                    onClick={() => alert("You can edit order above 👆")}
                    className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg text-white"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={speakOrderSummary}
                    className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white"
                  >
                    🔊 Speak Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
