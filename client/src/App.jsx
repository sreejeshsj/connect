import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";


import Register from "./components/Register";
import Login from "./components/Login";
import MainLayout from "./components/MainLayout";

function App() {
  const { token } = useContext(AppContext);

  return (
    <Routes>
      
      <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={token ? <Navigate to="/" /> : <Register />} />

      
      <Route
        path="/*"
        element={
          token ? (
            <MainLayout />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default App;
