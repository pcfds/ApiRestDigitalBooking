import { Calendar, DateObject } from "react-multi-date-picker";
import gregorian_es from "../../assets/data/gregoriano_es";
import React, { useContext, useEffect, useState } from "react";
import "../../styles/reserveCalendar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

const ReserveCalendar = (data) => {
  const { logged } = useContext(UserContext);
  const { changeFlag } = useContext(UserContext);
  const [reservationDates, setReservationDates] = useState([]);
  const [daysToDisabled, setDaysToDisabled] = useState([]);
  const navigate = useNavigate();
  const id = data.data.id;

  const applyBtn = () => {
    if (reservationDates.length === 0) {
      return;
    }
    if (reservationDates.length === 2 && logged) {
      changeFlag();
      return navigate(`/products/${id}/reserve`);
    } else {
      changeFlag();
      localStorage.setItem("idProduct", id);
      return navigate("/login");
    }
  };
  const disabledButton = (dates) => {
    const button = document.querySelector(".btn-reservation");
    if (dates.length === 2) {
      button.classList.remove("disabled-apply-btn");
      button.disabled = false;
    }
  };
  useEffect(() => {
    axios(
      "http://g9apidigitalbookinganita-env.eba-acy747p9.us-west-2.elasticbeanstalk.com/booking/findAll"
    ).then((res) => {
      setDaysToDisabled(res.data);
      return res;
    });
  }, []);
  const bookingStartDates = [];
  const bookingEndDates = [];
  const disabilingDates = () => {
    daysToDisabled.map((booking) => {
      if (booking.product.id === id) {
        bookingStartDates.push(new DateObject(booking.bookingStartDate));
        bookingEndDates.push(new DateObject(booking.bookingEndDate));
      }
      return booking;
    });
  };

  return (
    <div className="container-data">
      <div className="title">
        <h1>Fechas disponibles</h1>
      </div>
      <div className="calendar-box">
        <div className="calendarContainer">
          <Calendar
            range
            numberOfMonths={2}
            onChange={(dates) => {
              setReservationDates(dates);
              disabledButton(dates);
            }}
            disableMonthPicker
            disableYearPicker
            className="custom-calendar"
            locale={gregorian_es}
            mapDays={({ date, today, selectedDate }) => {
              disabilingDates();
              if (selectedDate.length === 2) {
                localStorage.setItem("startDate", selectedDate[0]);
                localStorage.setItem("endDate", selectedDate[1]);
              }
              for (let i = 0; i < bookingStartDates.length; i++) {
                if (bookingStartDates[i] < bookingEndDates[i]) {
                  if (
                    [
                      bookingStartDates[i].format("YYYY-MM-DD"),
                      bookingStartDates[i].add(1, "day").format("YYYY-MM-DD"),
                      bookingEndDates[i].format("YYYY-MM-DD"),
                    ].includes(date.format("YYYY-MM-DD"))
                  ) {
                    return {
                      disabled: true,
                      style: {
                        color: "#ccc",
                        textDecoration: "line-through",
                      },
                    };
                  } else if (
                    selectedDate.length === 1 &&
                    selectedDate[0].format("YYYY-MM-DD") <
                      bookingStartDates[i].format("YYYY-MM-DD")
                  ) {
                    if (
                      [
                        bookingEndDates[i].add(1, "days").format("YYYY-MM-DD"),
                      ].includes(date.format("YYYY-MM-DD"))
                    ) {
                      return {
                        disabled: true,
                        style: {
                          color: "#ccc",
                          textDecoration: "line-through",
                        },
                      };
                    }
                  }
                }
              }

              if (selectedDate.length === 1) {
                let result = selectedDate[0].toDays() - date.toDays();
                if (result > 0) {
                  return {
                    disabled: true,
                    style: {
                      color: "#ccc",
                      textDecoration: "line-through",
                    },
                  };
                }
              }

              let result = date.toDays() - today.toDays();
              if (result < 0)
                return {
                  disabled: true,
                  style: {
                    color: "#ccc",
                    textDecoration: "line-through",
                  },
                };
            }}
          >
            <div className="apply-btn-box"></div>
          </Calendar>
        </div>

        <div className="reservation-container">
          <h2>Agregá tus fechas de viaje para obtener precios exactos.</h2>
          <div className="btn-box">
            <button
              className="btn-reservation disabled-apply-btn"
              onClick={() => {
                applyBtn();
              }}
            >
              Iniciar reserva
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReserveCalendar;
