import { useState } from "react";
import ActiveQueues from "./ActiveQueues";
import CreateQueueForm from "./CreateQueueForm";

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState("create");



  const handleCreateQueue = async() =>{
    setActiveTab('create')
    // nevigate('/createqueue')
  }



  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Vendor Dashboard</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
        onClick={handleCreateQueue}
        //   onClick={() => setActiveTab("create")}
          className={`px-4 py-2 rounded ${activeTab === "create" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Create Queue
        </button>
        <button
          onClick={() => setActiveTab("active")}
          className={`px-4 py-2 rounded ${activeTab === "active" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          My Active Queues
        </button>
      </div>

      {/* Sections */}
      {activeTab === "create" && <CreateQueueForm />}
      {activeTab === "active" && <ActiveQueues />}
    </div>
  );
};

export default VendorDashboard;
