import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import VendorDashboard from "./components/vendor/VendorDashboard";
import CreateQueueForm from "./components/vendor/CreateQueueForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/vendorDashboard" element={<VendorDashboard/>} />
        <Route path="/createqueue" element={<CreateQueueForm/>} />
      </Routes>
    </Router>
  );
}

export default App;
