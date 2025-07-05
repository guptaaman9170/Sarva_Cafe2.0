import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import GroupOrdering from "./pages/GroupOrdering";
import Menu from "./pages/Menu";
import OrderSummary from "./pages/OrderSummary";
import OrderConfirmed from "./pages/OrderConfirmed";
import Billing from "./pages/Billing";
import Payment from "./pages/Payment";
import SmartServe from "./pages/SmartServe";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/group-ordering" element={<GroupOrdering />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/order-summary" element={<OrderSummary />} />
      <Route path="/order-confirmed" element={<OrderConfirmed />} />
      <Route path="/billing" element={<Billing />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/smartserve" element={<SmartServe />} />
    </Routes>
  );
}
