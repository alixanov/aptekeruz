import React from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate()
  return (
    <div className="sidebar">
      <button onClick={() => navigate(".")}>Sotuv bo'limi</button>
      <button onClick={() => navigate("kirim")}>Kirim</button>
      <button onClick={() => navigate("/omborxona")}>Omborxona</button>
      <button>Qo'shimcha hizmat</button>
      <button>Qo'shimcha hizmat</button>
    </div>
  );
}

export default Sidebar