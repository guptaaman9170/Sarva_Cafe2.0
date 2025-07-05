import { useNavigate } from "react-router-dom";
import Header from "../components/Header"; 

export default function Billing() {
  const navigate = useNavigate();

  // Order items with quantity
  const orderItems = [
    { name: "Paneer Tikka", price: 180, quantity: 2 },
    { name: "Butter Naan", price: 40, quantity: 3 },
  ];

  const subtotal = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = +(subtotal * 0.1).toFixed(2);
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-[#1f1f1f] text-white">
      {/* Header */}
      <Header />

      {/* Centered Billing Card */}
      <div className="flex items-center justify-center px-4 py-10">
        <div className="bg-[#2b2b2b] w-full max-w-md p-6 rounded-2xl shadow-xl">
          
          {/* Cafe Title */}
          <h1 className="text-center text-xl font-bold text-white-400 mb-4">
            Sarva Cafe
          </h1>

          {/* Table Info */}
          <h2 className="text-md font-semibold mb-4 text-white">
            Table - 02
          </h2>

          {/* Order Items */}
          <div className="space-y-2 text-sm mb-4">
            {orderItems.map((item, idx) => (
              <div key={idx} className="flex justify-between">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mt-4 border-t border-gray-600 pt-4 text-sm">
            <div className="flex justify-between mb-1">
              <span>Sub-Total</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax (10%)</span>
              <span>₹{tax}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          {/* Proceed Button */}
          <button
            onClick={() => navigate("/payment")}
            className="mt-6 w-full bg-orange-500 py-2 rounded-md text-sm font-semibold cursor-pointer hover:bg-orange-600 transition"
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
}
