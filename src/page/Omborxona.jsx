import React, { useState, useEffect } from "react";

const Omborxona = () => {
  const [soldItems, setSoldItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const localStorageSoldItems =
      JSON.parse(localStorage.getItem("soldItems")) || [];
    setSoldItems(localStorageSoldItems);
    const calculatedTotalPrice = localStorageSoldItems.reduce(
      (total, item) => total + item.mijozuchunnarx * item.soni,
      0
    );
    setTotalPrice(calculatedTotalPrice);
  }, []);

  return (
    <div>
      <table className="omborxona__page">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nomi</th>
            <th>Turi</th>
            <th>Soni</th>
            <th>Mijoz uchun narx</th>
            <th>Umumiy narx</th>
          </tr>
        </thead>
        <tbody>
          {soldItems.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.nomi}</td>
              <td>{item.katigoriya}</td>
              <td>{item.soni}</td>
              <td>{item.mijozuchunnarx}</td>
              <td>{item.mijozuchunnarx * item.soni}</td> {/* Umumiy narxi */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total__price">
        <h3 style={{ color: "gray", marginTop: 10 }}>
          Umumiy narx: {totalPrice} сум
        </h3>
      </div>
    </div>
  );
};

export default Omborxona;
