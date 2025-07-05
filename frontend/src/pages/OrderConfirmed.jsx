import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function OrderConfirmed() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      {/* Header with buttons hidden */}
      <Header hideBackButton={true} hideGroupOrdering={true} />

      <div className="min-h-screen bg-[#1f1f1f] text-white flex items-center justify-center px-4">
        {/* Card */}
        <div className="bg-[#2b2b2b] w-full max-w-md p-6 rounded-2xl shadow-xl text-center">
          <h1 className="text-2xl font-bold mb-3">Order Confirmed ✅</h1>
          <p className="mb-6 text-gray-300">Your order is being prepared.</p>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigate("/menu")}
              className="w-full bg-gray-700 py-2 rounded-md text-sm font-semibold cursor-pointer hover:bg-gray-600 transition"
            >
              Order More !!
            </button>

            <button
              onClick={() => navigate("/billing")}
              className="w-full bg-orange-500 py-2 rounded-md text-sm font-semibold cursor-pointer hover:bg-orange-600 transition"
            >
              Billing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
