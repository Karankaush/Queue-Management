import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate()
  const [result, setResult] = useState("");

  const checkToken = async () => {
    try {
      const res = await axios.get("http://localhost:3000", {
        withCredentials: true, // 👈 cookie bhejne ke liye
      });
      setResult(JSON.stringify(res.data, null, 2));
    } catch (err) {
      if (err.response) {
          setResult(err.response.data.message);
          navigate('/login')
    } else {
        setResult("Server error");
        navigate('/login')
      }
    }
  };

  const handleLogout = async() =>{
    try{
        await axios.post('http://localhost:3000/user/logout', {}, 
            { withCredentials : true})
            navigate('/')
    } catch(err){
        console.error(err)
    }

  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Dashboard Test</h1>
      <button
        onClick={checkToken}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Check Token
      </button>

      <button
  onClick={handleLogout}
  className="px-4 py-2 bg-red-500 text-white rounded-lg"
>
  Logout
</button>


      {result && (
        <pre className="mt-4 bg-gray-100 p-3 rounded">{result}</pre>
      )}
    </div>
  );
};

export default Dashboard;
