/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import cloudImage from "./assets/cloud.png";
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

  const [temp, setTemp] = useState("");
  const [desc, setDesc] = useState("");
  const [hum, setHum] = useState("");
  const [country, setCountry] = useState("");
  const [speed, setSpeed] = useState("");
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [isDataFetched, setIsDataFetched] = useState(false);

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

  // const fetchData = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.get(
  //       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=648a959b8ea7e0c395c8f575a8e5abac&units=metric`
  //     );
  //     const data = res.data;
  //     setTemp(data.main.temp);
  //     setDesc(data.weather[0].description);
  //     setHum(data.main.humidity);
  //     setCountry(data.sys.country);
  //     setSpeed(data.wind.speed);
  //     setName(data.name);
  //     setIcon(data.weather[0].icon);

  //     setIsDataFetched(true);

  //     console.log(data);
  //   } catch (err) {
  //     console.log(err);
  //     alert("Please enter a valid location");
  //   }
  // };

  // const defaultData = async () => {
  //   if (isDataFetched === false || city === "") {
  //     try {
  //       const res = await axios.get(
  //         `https://api.openweathermap.org/data/2.5/weather?q=lagos&appid=648a959b8ea7e0c395c8f575a8e5abac&units=metric`
  //       );
  //       const data = res.data;
  //       setTemp(data.main.temp);
  //       setDesc(data.weather[0].description);
  //       setHum(data.main.humidity);
  //       setCountry(data.sys.country);
  //       setSpeed(data.wind.speed);
  //       setName(data.name);
  //       setIcon(data.weather[0].icon);

  //       console.log(data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   requestDataByCityName();
  // }, []);

  console.log("length", Object.keys(data).length);
  console.log("boolean", Boolean(data));
  console.log("city", city);

  return (
    <div className="container-weatherapp">
      {/* <div className="app__container">
        <form onSubmit={fetchData} className="app__search">
          <input
            className="app__input"
            type="text"
            placeholder="Insert City Name"
            onChange={(e) => setCity(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="app__searchIcon"
            onClick={fetchData}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </form>
        <h1 className="app__title">Weather in {name}</h1>
        <h1 className="app__temp">{temp}°C</h1>
        <div className="app__desc">
          <img
            className="app__image"
            src={`http://openweathermap.org/img/w/${icon}.png`}
            alt="desc"
          />
          <h3>{desc}</h3>
        </div>
        <div className="app__humidity">
          <h4 className="app__hum">Humidity: {hum}%</h4>
          <h4 className="app__count">Country: {country}</h4>
        </div>
        <div className="app__windspeed">
          <h4 className="app__wind">Wind Speed: {speed}m/s</h4>
          <h4 className="app__date">{date}</h4>
        </div>
      </div> */}
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
                {data ? data?.name : city}{" "}
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
