import React, { useEffect, useState } from 'react';
import './BottomLeft.scss';

function BottomLeft() {
  const [state, setState] = useState({
    no: '',
    contract: '',
    offer: '',
    data: '',
  });
  const [values, setValues] = useState([]);

  const [openNew, setOpenNew] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.values(state).every((v) => v !== '')) {
      setValues([...values, state]);
    }
  };

  return (
    <div className="BottomLeft">
      {values &&
        values.map((item, index) => {
          return (
            <div key={index} className="BottomLeft__values">
              <span className="BottomLeft__values--item">{item.no}</span>
              <span className="BottomLeft__values--item">{item.contract}</span>
              <span className="BottomLeft__values--item">{item.offer}</span>
              <span className="BottomLeft__values--item">{item.data}</span>
            </div>
          );
        })}
      <div className="BottomLeft__newValue">
        <button
          type="submit"
          className="BottomLeft__newValue--button"
          onClick={() => setOpenNew(!openNew)}
        >
          {openNew ? 'Kapat' : 'Yeni Ekle'}
        </button>
        {openNew && (
          <>
            <input
              type="text"
              name="no"
              className="BottomLeft__newValue--input"
              placeholder="No Giriniz"
              value={state.no}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="contract"
              className="BottomLeft__newValue--input"
              placeholder="Kontrakt Giriniz"
              value={state.Kontrat}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="offer"
              className="BottomLeft__newValue--input"
              placeholder="Teklif Giriniz"
              value={state.offer}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="data"
              className="BottomLeft__newValue--input"
              placeholder="Data Giriniz"
              value={state.data}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="BottomLeft__newValue--button"
              onClick={handleSubmit}
            >
              Kaydet
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default BottomLeft;
