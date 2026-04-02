// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Register from "./pages/Register.jsx";
// import Login from "./pages/Login.jsx";
// import Navbar from "./components/Navbar.jsx";
// import Home from "./pages/Home.jsx";
// import { useEffect } from "react";

// function App() {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchUser = async () =>{
//       const token = localStorage.getItem('token');
//       if(token) {
//         try{
//           const res = await axios.get("/api/users/me", {
//             headers: { Authorization: `Bearer ${token}` }
//           })
//           setUser(res.data);
//         }catch(error){
//           setError("failed to fetch user");
//           localStorage.removeItem("token");
//         }
//       }
//     }
//   }, [])
//   return(
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </Router>
//   )
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users/me", {
          withCredentials: true, 
        });

        setUser(res.data);
      } catch (error) {
        setUser(null);
        setError("Not authenticated");
      }
    };

    fetchUser();
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
