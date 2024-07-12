import React, { useState } from "react";
import Rodal from "rodal";
import { useForm } from "react-hook-form";
import "rodal/lib/rodal.css";
import generateUniqueId from "generate-unique-id";

const Kirim = () => {
  const [visible, setVisible] = useState(false);
  const id = generateUniqueId({
    length: 6,
    useLetters: false,
  });

  const showModal = () => {
    setVisible(true);
  };
  const closeModal = () => {
    setVisible(false);
  };

  // Hook form
  const { register, handleSubmit, reset } = useForm();

  // Function form
  function setData(data) {
    data.id = id;
    const basket = JSON.parse(localStorage.getItem("key")) || [];
    basket.push(data);
    localStorage.setItem("key", JSON.stringify(basket));
    console.log(basket);
    setVisible(false); // Forma jo'natilgandan keyin modal oynani yopish
    reset(); // Forma tozalash
  }

  return (
    <div className="kirim">
      <nav>
        <button>Chiqim</button>
        <button onClick={showModal}>Kirim</button>
      </nav>
      <Rodal
        visible={visible}
        onClose={closeModal}
        className="rodal rodal-custom .rodal-content "
        customStyles={{
          width: "400px",
          height: "500px",
        }}
      >
        <div className="form__page">
          <form className="form__page" onSubmit={handleSubmit(setData)}>
            <input
              {...register("nomi", { required: true })}
              type="text"
              placeholder="nomi"
            />
            <input
              {...register("soni", { required: true })}
              type="text"
              placeholder="soni"
            />
            <input
              {...register("aslnarxi", { required: true })}
              type="text"
              placeholder="asl narxi"
            />
            <input
              {...register("mijozuchunnarx", { required: true })}
              type="text"
              placeholder="mijoz uchun narx"
            />
            <select
              {...register("katigoriya", { required: true })}
              defaultValue=""
            >
              <option value="" disabled>
                Turi
              </option>
              <option value="Tabletka">Tabletka</option>
              <option value="Sirop">Sirop</option>
              <option value="Parashok">Parashok</option>
              <option value="Maz">Maz</option>
              <option value="Sprey">Sprey</option>
            </select>
            <button type="submit">Kirim</button>
          </form>
        </div>
      </Rodal>
    </div>
  );
};

export default Kirim;
