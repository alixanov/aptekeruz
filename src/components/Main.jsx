import React from "react";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import Kirim from "../page/Kirim";
import GetDori from "../page/GetDori";
import Omborxona from "../page/Omborxona";

const Main = () => {
  return (
    <div className="main">
      <div className="left">
        <Sidebar />
      </div>
      <div className="right">
        {/* <p>Right</p> */}
        <Routes>
          {/* <Route path="/" element={<App/>}/> */}
          <Route path="/" element={<GetDori />} />
          <Route path="/kirim" element={<Kirim />} />
          <Route path="/omborxona" element={<Omborxona/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default Main;
