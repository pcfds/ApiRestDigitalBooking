import { Calendar, DateObject } from "react-multi-date-picker";
import React from "react";
import gregorian_es from "../../assets/data/gregoriano_es";
import "../../styles/reserveCardCalendar.css";
import { useEffect } from "react";

const ReserveCardCalendar = ({ setReservationDates, daysToDisabled, id }) => {
  const [dayStart, setDayStart] = React.useState("");
  const [dayEnd, setDayEnd] = React.useState("");
  const bookingStartDates = [];
  const bookingEndDates = [];

  useEffect(() => {
    setDayStart(localStorage.getItem("startDate"));
    setDayEnd(localStorage.getItem("endDate"));
  }, []);
  const valueInitial = (dates) => {
    if (dates) {
      setDayStart(dates[0]);
      setDayEnd(dates[1]);
    }
  };
  const disabilingDates = () => {
    daysToDisabled.map((booking) => {
      if (booking.product.id === parseInt(id)) {
        bookingStartDates.push(new DateObject(booking.bookingStartDate));
        bookingEndDates.push(new DateObject(booking.bookingEndDate));
      }
      return booking;
    });
  };
  return (
    <div className="container-data1">
      <div className="calendar-box">
        <div className="calendarContainer">
          <Calendar
            range
            numberOfMonths={2}
            onChange={(dates) => {
              setReservationDates(dates);
              valueInitial(dates);
            }}
            value={[dayStart, dayEnd]}
            disableMonthPicker
            disableYearPicker
            className="custom-calendar"
            locale={gregorian_es}
            mapDays={({ date, today, selectedDate }) => {
              disabilingDates();
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
      </div>
    </div>
  );
};

export default ReserveCardCalendar;
