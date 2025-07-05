import { useNavigate } from "react-router-dom";
import Header from "../components/Header"; // adjust path as needed

export default function OrderSummary() {
  const navigate = useNavigate();

  // Sample order items
  const orderItems = [
    { name: "Paneer Tikka", price: 180, quantity: 2 },
    { name: "Butter Naan", price: 40, quantity: 1 },
  ];

  const totalItems = orderItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#1f1f1f] text-white">
      <Header />

      <div className="flex justify-center items-center py-8 px-4">
        <div className="bg-[#2b2b2b] w-full max-w-md p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">
            Order Summary
          </h2>

          {/* Order Items */}
          <div className="space-y-3 mb-4 text-sm">
            {orderItems.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          {/* Total Info */}
          <div className="text-sm text-gray-300 mb-4">
            <div className="flex justify-between">
              <span>Total Items:</span>
              <span>{totalItems}</span>
            </div>
            <div className="flex justify-between font-semibold text-white">
              <span>Subtotal:</span>
              <span>₹{subtotal}</span>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-600 mb-4" />

          {/* Cooking Instructions */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Cooking Instructions
            </label>
            <textarea
              rows={3}
              placeholder="Any special requests..."
              className="w-full p-2 rounded-md bg-gray-800 text-white placeholder-gray-400 resize-none text-sm"
            />
          </div>

          {/* Confirm Button */}
          <button
            onClick={() => navigate("/order-confirmed")}
            className="w-full bg-orange-500 py-2 rounded-md text-sm font-semibold cursor-pointer hover:bg-orange-600 transition"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}
