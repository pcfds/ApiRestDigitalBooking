import Header from "../Product/Header";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch/useFetch";
import LoaderProducts from "../LoaderProducts";
import ReserveCardCalendar from "./ReserveCardCalendar";
import ReserveCard from "./ReserveCard";
import "../../styles/reserve.css";
import Policies from "../Product/Policies";
import axios from "axios";

const MainReserve = () => {
  const [reservationDates, setReservationDates] = React.useState([]);
  const [selectTime, setSelectTime] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [daysToDisabled, setDaysToDisabled] = useState([]);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  useState(() => {
    setStartDate(
      localStorage.getItem("startDate").split("/")[0] +
        "-" +
        localStorage.getItem("startDate").split("/")[1] +
        "-" +
        localStorage.getItem("startDate").split("/")[2]
    );
    setEndDate(
      localStorage.getItem("endDate").split("/")[0] +
        "-" +
        localStorage.getItem("endDate").split("/")[1] +
        "-" +
        localStorage.getItem("endDate").split("/")[2]
    );
    axios(
      "http://g9apidigitalbookinganita-env.eba-acy747p9.us-west-2.elasticbeanstalk.com/booking/findAll"
    ).then((res) => {
      setDaysToDisabled(res.data);
      return res;
    });
  });
  //Params from url
  const { id } = useParams();

  const nameUser = sessionStorage.getItem("name").split(" ");
  const emailUser = sessionStorage.getItem("email");
  // CUSTOM FETCH (the function has an useEfect listening for any change in the url, so we use setUrl to call the function again with a new url)
  const { data, loading } = useFetch(
    `http://g9apidigitalbookinganita-env.eba-acy747p9.us-west-2.elasticbeanstalk.com/products/find/${id}`
  );
  const asignarSeleccion = () => {
    let select = document.getElementById("select-time").value;
    const displayText = document.querySelector(".room-ready");
    if (select) {
      displayText.classList.remove("room-ready-disabled");
      document
        .querySelector(".select-time")
        .classList.remove("select-time-error");
      document.querySelector(".text-input").classList.remove("error-text");
    } else {
      displayText.classList.add("room-ready-disabled");
    }
    setSelectTime(select);
  };
  const bodyFetch = {
    time: selectTime + ":00",
    bookingStartDate:
      reservationDates.length > 1
        ? reservationDates[0].year +
          "-" +
          (reservationDates[0].month > 10
            ? reservationDates[0].month
            : "0" + reservationDates[0].month) +
          "-" +
          (reservationDates[0].day > 10
            ? reservationDates[0].day
            : "0" + reservationDates[0].day)
        : startDate,
    bookingEndDate:
      reservationDates.length > 1
        ? reservationDates[1].year +
          "-" +
          (reservationDates[1].month > 10
            ? reservationDates[1].month
            : "0" + reservationDates[1].month) +
          "-" +
          (reservationDates[1].day > 10
            ? reservationDates[1].day
            : "0" + reservationDates[1].day)
        : endDate,
    product: { id: parseInt(id) },
    user: { username: emailUser },
  };
  const bookingComplete = () => {
    if (selectTime) {
      fetch(
        "http://g9apidigitalbookinganita-env.eba-acy747p9.us-west-2.elasticbeanstalk.com/booking/create",
        {
          method: "POST",
          headers: {
            Authorization: sessionStorage.getItem("jwt"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(bodyFetch),
        }
      ).then((response) => {
        if (response.status === 200) {
          openModal();
        } else {
          alert("Error al reservar");
        }
      });
    } else {
      document.querySelector(".select-time").classList.add("select-time-error");
      document.querySelector(".text-input").classList.add("error-text");
    }
  };
  return (
    <>
      {loading ? (
        <LoaderProducts />
      ) : (
        <>
          {data && <Header data={data} />}
          <h1 className="title-reserve">Completá tus datos</h1>
          <div className="principal-container">
            <div className="principal-container-left">
              <form className="form">
                <div className="form-group">
                  <label htmlFor="name">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    disabled
                    value={nameUser[0]}
                  />
                  <label htmlFor="email">Correo electronico</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Correo electronico"
                    disabled
                    value={emailUser}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastname">Apellido</label>
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Apellido"
                    disabled
                    value={nameUser[1]}
                  />
                  <label htmlFor="city">Ciudad</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Ciudad"
                    required
                  />
                </div>
              </form>
              <div className="calendar">
                <h2>Selecciona tu fecha de reserva</h2>
                {data && (
                  <ReserveCardCalendar
                    setReservationDates={setReservationDates}
                    daysToDisabled={daysToDisabled}
                    id={id}
                  />
                )}
              </div>
              <div className="general-select-container">
                <h2>Tu horario de llegada</h2>
                <div className="time-select-container">
                  <p className="title-time-select">
                    Indicá tu horario estimado de llegada
                  </p>
                  <div className="display-text-select-time">
                    <p className="room-ready room-ready-disabled">
                      <i className="fa-regular fa-circle-check icon-room-ready"></i>{" "}
                      {`Tu habitación va a estar lista para el check in entre las ${selectTime} y las 00:00.`}
                    </p>
                  </div>
                  <select
                    className="select-time"
                    id="select-time"
                    onChange={asignarSeleccion}
                    required
                  >
                    <option value="">Selecciona una hora</option>
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                    <option value="13:00">13:00 </option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                    <option value="18:00">18:00</option>
                    <option value="19:00">19:00</option>
                    <option value="20:00">20:00</option>
                    <option value="21:00">21:00</option>
                    <option value="22:00">22:00</option>
                    <option value="23:00">23:00</option>
                    <option value="00:00">00:00</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="principal-container-rigth">
              <h2>Detalle de la reserva</h2>
              {
                <ReserveCard
                  hotel={data}
                  images={data.images}
                  reservationDates={reservationDates}
                  bookingComplete={bookingComplete}
                  closeModal={closeModal}
                  modalIsOpen={modalIsOpen}
                  className="reserve-card"
                ></ReserveCard>
              }
            </div>
          </div>

          {data.policy != null ? <Policies data={data} /> : null}
        </>
      )}
    </>
  );
};

export default MainReserve;
