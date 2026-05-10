import { useEffect, useState } from "react";
import API from "./api";
import PayPalPayment from "./pages/PayPalPayment";
import MpesaPayment from "./pages/MpesaPayment";

function App() {
  const [status, setStatus] = useState("");

  useEffect(() => {
    API.get("/api/status")
      .then((res) => setStatus(res.data.status))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>WF Freelancers</h1>
      <p>{status}</p>
    </div>
  );

    return (
    <div>
      <PayPalPayment />
      <MpesaPayment />
    </div>
  );
}

export default App;