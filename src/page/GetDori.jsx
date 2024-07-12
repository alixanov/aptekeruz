import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sell from "@mui/icons-material/CheckCircleOutline";

const GetDori = () => {
  const basket = JSON.parse(localStorage.getItem("key")) || [];
  const [dataBasket, setDataBasket] = useState(basket);
  const [inputValues, setInputValues] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [customerCart, setCustomerCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const calculatedTotalPrice = customerCart.reduce(
      (total, item) => total + item.mijozuchunnarx * item.soni,
      0
    );
    setTotalPrice(calculatedTotalPrice);
  }, [customerCart]);

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
      const updatedCustomerCart = [...customerCart, newSoldItem];

      setDataBasket(updatedBasket);
      setCustomerCart(updatedCustomerCart);
      localStorage.setItem("key", JSON.stringify(updatedBasket));
      setInputValues((prev) => ({ ...prev, [id]: "" }));

      alert("Mahsulot savatchaga qo'shildi");
    } else {
      alert("Notog'ri qiymat kiritildi yoki miqdor yetarli emas");
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = dataBasket.filter((item) =>
    item.nomi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCompletePurchase = () => {
    const existingSoldItems =
      JSON.parse(localStorage.getItem("soldItems")) || [];
    const updatedSoldItems = [...existingSoldItems, ...customerCart];
    localStorage.setItem("soldItems", JSON.stringify(updatedSoldItems));
    setCustomerCart([]);
    setTotalPrice(0);
    alert("Sotib olish amalga oshirildi");
    navigate("/omborxona");
  };

  return (
    <div className="sotuv__bolim-oynasi">
      <div className="dorilar__qidiruv-oynasi">
        <div className="dorilar__qidiruv-bolimi">
          <input
            type="text"
            id="search"
            placeholder="Mahsulot nomini kiriting"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button>Search</button>
        </div>
      </div>
      <table className="get__dori-page">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nomi</th>
            <th>Turi</th>
            {/* <th>Asl narx</th> */}
            <th>Mijoz uchun narx</th>
            <th>Soni</th>
            <th>Haridni yakunlash</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.nomi}</td>
              <td>{item.katigoriya}</td>
              {/* <td>{item.aslnarxi}</td> */}
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
          {customerCart.map((item, index) => (
            <p key={index}>
              {item.nomi} - {item.soni} dona
            </p>
          ))}
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
          onClick={handleCompletePurchase}
        >
          Sotib yuborish
        </button>
        <div className="total__price" style={{ marginTop: 10 }}>
          <h3 style={{ color: "gray" }}>
            Mijoz uchun umumiy narx: {totalPrice} sum
          </h3>
        </div>
      </div>
    </div>
  );
};

export default GetDori;
