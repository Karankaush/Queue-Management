import { useState } from "react";
import axios from "axios";

const CreateQueueForm = () => {
    const[message, setMessage] = useState('');
  const [queueData, setQueueData] = useState({
    queueName: "",
    description: "",
    maxCapacity: "",
  });

  const handleChange = (e) => {
    setQueueData({ ...queueData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to backend
       await axios.post("http://localhost:3000/queue/create", queueData,{
        withCredentials : true
      });
      setMessage("");
      alert("Queue created successfully!");
      setQueueData({
        queueName :"",
        description : "",
        maxCapacity : ""
      })
     
    } catch (err) {
      console.error(err);
      setMessage(err.message)
      alert("Error creating queue");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input
        type="text"
        name="queueName"
        placeholder="Queue Name"
        value={queueData.queueName}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={queueData.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="number"
        name="maxCapacity"
        placeholder="Max Capacity"
        value={queueData.maxCapacity}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Create Queue
      </button>

      {message && (
        <p className="text-red-500">{message}</p>
      )}


    </form>
  );
};

export default CreateQueueForm;
