/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import cloudImage from "./assets/cloud.png";
import iconWind from "./assets/icon-wind.svg";
import iconHum from "./assets/icon-hum.svg";

function App() {
  const listCity = [
    "Ba Ria",
    "Bac Lieu",
    "Bac Giang",
    "Bac Kan",
    "Bac Ninh",
    "Ben Tre",
    "Bien Hoa",
    "Buon Ma Thuot",
    "Ca Mau",
    "Cam Ranh",
    "Cao Bang",
    "Cao Lanh",
    "Da Lat",
    "Dien Bien Phu",
    "Dong Ha",
    "Dong Hoi",
    "Dong Xoai",
    "Ha Giang",
    "Ha Long",
    "Ha Tien",
    "Ha Tinh",
    "Hai Duong",
    "Hoa Binh",
    "Hoi An",
    "Hue",
    "Hung Yen",
    "Kom Tum",
    "Lai Chau",
    "Lang Son",
    "Lao Cai",
    "Long Xuyen",
    "My Tho",
    "Nam Dinh",
    "Nha Trang",
    "Ninh Binh",
    "Phan Thiet",
    "Pleiku",
    "Quang Ngai",
    "Quy Nhon",
    "Rach Gia",
    "Sa Dec",
    "Soc Trang",
    "Son La",
    "Tam Ky",
    "Tan An",
    "Tay Ninh",
    "Thai Binh",
    "Thai Nguyen",
    "Thanh Hoa",
    "Thu Dau Mot",
    "Tra Vinh",
    "Tuy Hoa",
    "Tuyen Quang",
    "Uong Bi",
    "Viet Tri",
    "Vinh",
    "Vinh Long",
    "Vinh Yen",
    "Vung Tau",
    "Yen Bai",
    "Di An",
    "Phu Quoc",
    "Long Khanh",
    "Ho Chi Minh",
  ];

  const [city, setCity] = useState("");
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  // const date = new Date().toString().slice(0, 25);

  const date = new Date().toString().split(" ").splice(1, 3).join(" ");
  // let day = date2.getDate();

  console.log("date", date);

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
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=648a959b8ea7e0c395c8f575a8e5abac&units=metric&lang=en`
      );
      // console.log("res", res);
      const dataJson = await res.json();
      console.log("data", dataJson);
      setData(dataJson);
    } catch (error) {
      console.log(error);
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
        <h3 className="weather-title">WEATHER IN YOUR CITY</h3>
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
                placeholder="Enter your city name.."
              />
              <button
                type="submit"
                onClick={requestDataByCityName}
                className="weather-btn"
              >
                <i className="fa fa-search"></i>
              </button>
            </form>
            <div className="search-suggest">{ItemList}</div>
          </div>
          <div className="weather-desc">
            <h2 className="weather-country">
              {data?.name} <span>{`, ${data?.sys?.country}`}</span>
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
                  <p className="weather-wind">Wind</p>
                  <p className="weather-wind-speed">{`${data?.wind?.speed} km/s`}</p>
                </div>
                <div className="wrap-weather-wind">
                  <img
                    className="icon-wind-hum"
                    src={iconHum}
                    alt="icon-wind"
                  ></img>
                  <p className="weather-wind">Hum</p>
                  <p className="weather-wind-speed">{`${data?.main?.humidity} %`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
