import "../../styles/search-block.css";
import Select, { components } from "react-select";
import { MdOutlineLocationOn } from "react-icons/md";
import React from "react";
import DatePickerRange from "./DatePickerRange/DatePickerRange";
export default function SearchBlock({
  filtersSearchBlock,
  setDatesSelected,
  datesSelected,
  dataCities,
}) {
  const applyFilter = () => {
    return filtersSearchBlock();
  };
  var options;
  if (dataCities) {
    options = [
      dataCities.map((item, i) => {
        return {
          value: item.name,
          label: (
            <div>
              <span className="city">{item.name}</span>
              <span className="coma">, </span>
              <span className="provinceAndCountry">
                <span className="province">{item.province}</span>,{" "}
                <span className="country">{item.country}</span>
              </span>
            </div>
          ),
        };
      }),
    ];
  }
  const { Option } = components;
  const IconOption = (props) => (
    <Option {...props}>
      <div className="option-container">
        <MdOutlineLocationOn
          alt={props.data.label}
          className="icon-select-option"
        />
      </div>
      {props.data.label}
    </Option>
  );

  return (
    <div className="block-content">
      <h1 className="block-title">
        Busca ofertas en hoteles, casas y mucho más.
      </h1>
      <div className="inputs">
        <div className="search-box">
          {dataCities && (
            <Select
              options={options[0]}
              placeholder="¿A dónde vamos?"
              className="react-select-container"
              classNamePrefix="react-select"
              components={{ Option: IconOption }}
            />
          )}
          <i className="fa-solid fa-location-dot input-icon"></i>
        </div>

        <DatePickerRange
          setDatesSelected={setDatesSelected}
          datesSelected={datesSelected}
        />
        <div className="btn-box-search">
          <button className="search-btn" onClick={applyFilter}>
            Buscar
          </button>
        </div>
      </div>
      <div className="error-container hidden-error">
        <p><i className="fa-solid fa-circle-exclamation"></i> Introduce un destino para empezar a buscar.</p>
      </div>
    </div>
  );
}
