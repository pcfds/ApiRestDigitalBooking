import DatePicker from "react-multi-date-picker";
import gregorian_es from "../../../assets/data/gregoriano_es";
import React, { useRef } from "react";

export default function DatePickerRange({ setDatesSelected }) {
  function applyFilter() {
    datePickerRef.current.closeCalendar();
  }

  const staysNight = (dates) => {
    if (dates.length === 2) {
      let nigths = dates[1].daysLeft - dates[0].daysLeft;
      if (Math.abs(nigths) > 0) {
        if (Math.abs(nigths) === 1) {
          return (document.querySelector(
            ".apply-btn-box"
          ).innerHTML = `<p className="stays"> Estadía de ${Math.abs(
            nigths
          )} noche</p>`);
        } else
          return (document.querySelector(
            ".apply-btn-box"
          ).innerHTML = `<p className="stays"> Estadía de ${Math.abs(
            nigths
          )} noches</p>`);
      }
    }
    document.querySelector(".apply-btn-box").innerHTML = " ";
  };

  const disabledButton = (dates) => {
    const button = document.querySelector(".apply-btn");
    switch (dates.length) {
      case 1 || 2:
        button.classList.add("disabled-apply-btn");
        button.disabled = true;
        break;
      case 2:
        button.classList.remove("disabled-apply-btn");
        button.disabled = false;
        break;
      default:
        break;
    }
  };
  const datePickerRef = useRef();
  return (
    <>
      <div className="date-picker-box">
        <DatePicker
          range
          locale={gregorian_es}
          format="DD de MMM."
          onChange={(dates) => {
            setDatesSelected(dates);
            disabledButton(dates);
            staysNight(dates);
          }}
          formattingIgnoreList={["de"]}
          className="custom-calendar-picker"
          inputClass="custom-input"
          disableMonthPicker
          disableYearPicker
          mapDays={({ date, today, selectedDate }) => {
            let result = date.toDays() - today.toDays();
            if (result < 0)
              return {
                disabled: true,
                style: {
                  color: "#ccc",
                  textDecoration: "line-through",
                  border: "1px solid transparent",
                },
              };

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

          }}
          numberOfMonths={2}
          containerClassName="custom-container"
          arrow={<div style={{ marginTop: "10px" }}></div>}
          placeholder="Check in - Check out"
          ref={datePickerRef}
        >
          <div className="apply-btn-box"></div>
          <button className="apply-btn" onClick={applyFilter}>
            Aplicar
          </button>
        </DatePicker>
        <i className="fa-solid fa-calendar-day input-icon"></i>
      </div>
    </>
  );
}
