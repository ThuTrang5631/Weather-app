import React, { useState } from "react";
import iconWind from "./assets/icon-wind.svg";
import iconHum from "./assets/icon-hum.svg";

function App() {
  const listCity = [
    "Bà Rịa",
    "Bạc Liêu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bắc Ninh",
    "Bến Tre",
    "Biên Hòa",
    "Buôn Ma Thuột",
    "Cà Mau",
    "Cam Ranh",
    "Cao Bằng",
    "Cao Lãnh",
    "Đà Lạt",
    "Điện Biên Phủ",
    "Đông Hà",
    "Đồng Hới",
    "Đồng Xoài",
    "Hà Giang",
    "Hạ Long",
    "Hà Tiên",
    "Hà Tĩnh",
    "Thành phố Hải Dương",
    "Hòa Bình",
    "Hội An",
    "Huế",
    "Hưng Yên",
    "Kom Tum",
    "Lai Châu",
    "Lạng Sơn",
    "Lào Cai",
    "Long Xuyên",
    "Mỹ Tho",
    "Nam Định",
    "Nha Trang",
    "Ninh Bình",
    "Phan Thiết",
    "Pleiku",
    "Quảng Ngãi",
    "Quy Nhơn",
    "Rạch Giá",
    "Sa Đéc",
    "Sóc Trăng",
    "Sơn La",
    "Tam Kỳ",
    "Tân An",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thủ Dầu Một",
    "Trà Vinh",
    "Tuy Hòa",
    "Tuyên Quang",
    "Uông Bí",
    "Vinh",
    "Vĩnh Long",
    "Vĩnh Yen",
    "Vũng Tàu",
    "Yên Bái",
    "Dĩ An",
    "Phú Quốc",
    "Long Khánh",
    "Thành phố Hồ Chí Minh",
  ];

  const [city, setCity] = useState("");
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const date = new Date().toLocaleString().split(", ").splice(0, 1);
  const [openModal, setOpenModal] = useState(false);

  const handleChangeCity = (e) => {
    setCity(e.target.value);
  };

  const ItemList = (() => {
    if (!show) return [];
    return listCity
      .filter((item) => item.toLowerCase().includes(city.toLowerCase()))
      .map((item) => (
        <button
          className="city-suggest"
          onClick={() => {
            setCity(item);
            setShow(false);
          }}
          key={item}
        >
          {item}
        </button>
      ));
  })();

  const requestDataByCityName = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=648a959b8ea7e0c395c8f575a8e5abac&units=metric&lang=vi`
      );
      if (res.ok) {
        const dataJson = await res.json();
        console.log("data", dataJson);
        setData(dataJson);
      } else {
        setOpenModal(true);
      }
    } catch (error) {
      setOpenModal(true);
      console.log(error);
    }
  };

  const handleonClickButton = (e) => {
    requestDataByCityName(e);
  };

  const handleonKeyByEnter = (e) => {
    if (e.key === "Enter") {
      console.log("a");
      requestDataByCityName(e);
    }
  };

  return (
    <div className="container-weatherapp">
      <div className="wrap-weather">
        <h3 className="weather-title">THỜI TIẾT TRONG THÀNH PHỐ CỦA BẠN</h3>
        <div className="weather-content">
          <div className="wrap-form-suggest">
            <form className="weather-form">
              <input
                onFocus={() => setShow(true)}
                onBlur={() =>
                  setTimeout(() => {
                    setShow(false);
                  }, 130)
                }
                onChange={handleChangeCity}
                value={city}
                className="weather-input"
                type="text"
                placeholder="Nhập tên thành phố..."
              />
              <button
                type="submit"
                onClick={handleonClickButton}
                onKeyDown={handleonKeyByEnter}
                className="weather-btn"
                disabled={!city}
              >
                <i className="fa fa-search"></i>
              </button>
            </form>
            <div className="search-suggest">{ItemList}</div>
          </div>
          {Object.keys(data).length !== 0 ? (
            <div className="weather-desc">
              <h2 className="weather-country">
                {data?.name}
                <span>{`, ${data?.sys?.country}`}</span>
              </h2>
              <div className="weather-temp-desc">
                <div className="weather-wrap-img">
                  <img
                    className="weather-image"
                    src={`http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`}
                    alt="image weather"
                  />
                </div>
                <div className="weather-temp">
                  <p className="temp">{`${data?.main?.temp}°C`}</p>
                  <span className="weather-date">{date}</span>
                </div>
              </div>
              <div className="wrap-weather-mobile">
                <h5 className="weather-transcript">
                  {data?.weather?.[0]?.description}
                </h5>
                <div className="weather-wind-hum">
                  <div className="wrap-weather-wind">
                    <img
                      className="icon-wind-hum"
                      src={iconWind}
                      alt="icon-wind"
                    ></img>
                    <p className="weather-wind">Tốc độ gió</p>
                    <p className="weather-wind-speed">{`${data?.wind?.speed} km/s`}</p>
                  </div>
                  <div className="wrap-weather-wind">
                    <img
                      className="icon-wind-hum"
                      src={iconHum}
                      alt="icon-wind"
                    ></img>
                    <p className="weather-wind">Độ ẩm</p>
                    <p className="weather-wind-speed">{`${data?.main?.humidity} %`}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="weather-notinput">
              Thời tiết hôm nay thế nào? <br></br>Hãy nhập tên thành phố mà bạn
              muốn
            </div>
          )}
        </div>
      </div>
      {openModal && (
        <div className="weather-backdrop">
          <div className="weather-wrap-modal">
            <button
              onClick={() => setOpenModal(false)}
              className="weather-modal-close"
            >
              <span className="icon-close">X</span>
            </button>
            <p className="weather-modal-content">
              Thành phố bạn tìm không có. <br></br>Hãy nhập lại tên thành phố
              khác!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
