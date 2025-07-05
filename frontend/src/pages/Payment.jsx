export default function Payment() {
  return (
    <div className="min-h-screen bg-[#1f1f1f] text-white flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-xl font-bold mb-4">Choose Payment Method</h1>
      <button className="bg-green-600 w-full py-2 rounded">UPI QR</button>
      <button className="bg-blue-600 w-full py-2 rounded">Cash / Card (POS)</button>
      <button className="bg-purple-600 w-full py-2 rounded">Razorpay</button>
    </div>
  );
}
