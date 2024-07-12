import React, { useState, useEffect } from "react";

const Omborxona = () => {
  const [soldItems, setSoldItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalAslNarx, setTotalAslNarx] = useState(0);
  const [sofFoyda, setSofFoyda] = useState(0);

  useEffect(() => {
    const localStorageSoldItems =
      JSON.parse(localStorage.getItem("soldItems")) || [];
    setSoldItems(localStorageSoldItems);

    const calculatedTotalPrice = localStorageSoldItems.reduce(
      (total, item) => total + item.mijozuchunnarx * item.soni,
      0
    );
    const calculatedAslTotalPric = localStorageSoldItems.reduce(
      (total, item) => total + item.aslnarxi * item.soni,
      0
    );

    setTotalPrice(calculatedTotalPrice);
    setTotalAslNarx(calculatedAslTotalPric);
    setSofFoyda(calculatedTotalPrice - calculatedAslTotalPric);
  }, []);

  return (
    <div>
      <table className="omborxona__page">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nomi</th>
            <th>Turi</th>
            <th>Miqdori</th>

            {/* <th>Soni</th> */}
            <th>Asl narxi</th>
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
              <td>{item.soni}</td> {/* Miqdori */}
              {/* <td>{item.soni}</td> */}
              <td>{item.aslnarxi}</td>
              <td>{item.mijozuchunnarx}</td>
              <td>{item.mijozuchunnarx * item.soni}</td> {/* Umumiy narxi */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total__price" style={{ marginTop: 10 }}>
        <h3 style={{ color: "gray" }}>
          Sotuvdagi umumiy summa: {totalPrice} sum
        </h3>
        <h3 style={{ color: "gray" }}>
          Asl tan narxdagi umumiy summa: {totalAslNarx} sum
        </h3>
        <h3 style={{ color: "crimson" }}>Sof foyda: {sofFoyda} sum</h3>
      </div>
    </div>
  );
};

export default Omborxona;
