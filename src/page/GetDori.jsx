import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sell from "@mui/icons-material/CheckCircleOutline";

const GetDori = () => {
  const basket = JSON.parse(localStorage.getItem("key")) || [];
  const soldItemsFromStorage =
    JSON.parse(localStorage.getItem("soldItems")) || [];
  const [dataBasket, setDataBasket] = useState(basket);
  const [inputValues, setInputValues] = useState({});
  const [selectedItems, setSelectedItems] = useState(soldItemsFromStorage);
  const navigate = useNavigate();

  const handleChange = (event, id) => {
    const newValue = event.target.value;
    if (/^\d*$/.test(newValue)) {
      setInputValues((prev) => ({ ...prev, [id]: newValue }));
    }
  };

  const handleSell = (item) => {
    const id = item.id;
    const valueToSubtract = parseInt(inputValues[id], 10);

    if (
      !isNaN(valueToSubtract) &&
      valueToSubtract > 0 &&
      valueToSubtract <= item.soni
    ) {
      const updatedBasket = dataBasket.map((basketItem) =>
        basketItem.id === id
          ? { ...basketItem, soni: basketItem.soni - valueToSubtract }
          : basketItem
      );

      const newSoldItem = { ...item, soni: valueToSubtract };
      const updatedSoldItems = [...selectedItems, newSoldItem];

      setDataBasket(updatedBasket);
      setSelectedItems(updatedSoldItems);
      localStorage.setItem("key", JSON.stringify(updatedBasket));
      localStorage.setItem("soldItems", JSON.stringify(updatedSoldItems));
      setInputValues((prev) => ({ ...prev, [id]: "" }));

      alert("Harid amalga oshirildi");
    } else {
      alert("Notog'ri qiymat kiritildi ёки miqdор yetarli emas");
    }
  };

  const handlePurchase = () => {
    navigate("/omborxona");
  };

  const totalPrice = selectedItems.reduce(
    (total, item) => total + item.mijozuchunnarx * item.soni,
    0
  );

  return (
    <div className="sotuv__bolim-oynasi">
      <table className="get__dori-page">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nomi</th>
            <th>Turi</th>
            <th>Asl narx</th>
            <th>Mijoz uchun narx</th>
            <th>Soni</th>
            <th>Haridni yakunlash</th>
          </tr>
        </thead>
        <tbody>
          {dataBasket.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.nomi}</td>
              <td>{item.katigoriya}</td>
              <td>{item.aslnarxi}</td>
              <td>{item.mijozuchunnarx}</td>
              <td id="sell">
                <p>{item.soni}</p>
              </td>
              <td className="sell__click">
                <input
                  type="text"
                  value={inputValues[item.id] || ""}
                  onChange={(event) => handleChange(event, item.id)}
                  placeholder="0"
                />
                <Sell
                  sx={{ color: "green", cursor: "pointer" }}
                  onClick={() => handleSell(item)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="sotuv__savatchasi">
        <p>Savat</p>
        <div className="mijoz__harid-cardi">
          {selectedItems.map((item, index) => (
            <div key={index} className="card__item">
              <p>{item.nomi}</p>
              <p>{item.soni} dona</p>
              <p>Jami narx: {item.mijozuchunnarx * item.soni} so'm</p>
            </div>
          ))}
        </div>
        <div className="total__price">
          <p>Umumiy narxi: {totalPrice} so'm</p>
        </div>
        <button
          style={{
            width: 181,
            height: 51,
            border: "none",
            cursor: "pointer",
            backgroundColor: "black",
            color: "white",
            borderRadius: 8,
            fontSize: "20px",
          }}
          onClick={handlePurchase}
        >
          Sotib yuborish
        </button>
      </div>
    </div>
  );
};

export default GetDori;
