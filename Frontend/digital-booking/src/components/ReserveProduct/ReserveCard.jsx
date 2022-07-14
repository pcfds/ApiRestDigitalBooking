import ReserveCreated from "./ReserveCreated";
import Modal from "react-modal";
import { DateObject } from "react-multi-date-picker";
import gregorian_es from "../../assets/data/gregoriano_es";

const ReserveCard = ({
  hotel,
  images,
  reservationDates,
  bookingComplete,
  closeModal,
  modalIsOpen,
}) => {
  //json values for comodity
  const category = hotel.category.title;
  const rating = hotel.rating;
  const name = hotel.name;
  const ubicacion =
    hotel.city.name + ", " + hotel.city.province + ", " + hotel.city.country;
  const url = images;
  //STARS BY RATING
  function rToStars(n) {
    const star = <span className="star material-symbols-outlined">star</span>;

    if (n > 9)
      return (
        <>
          {star}
          {star}
          {star}
          {star}
          {star}
        </>
      );
    else if (n > 7)
      return (
        <>
          {star}
          {star}
          {star}
          {star}
        </>
      );
    else if (n > 5)
      return (
        <>
          {star}
          {star}
          {star}
        </>
      );
    else if (n > 3)
      return (
        <>
          {star}
          {star}
        </>
      );
    else return <>{star}</>;
  }
  //CALIFICATION NUMBER BY RATING

  //DESCRIPTION TOGGLE

  return (
    <div className="general-card-container">
      <div className="img-reserve-container">
        {url.length !== 0 && (
          <img src={url[0].url} alt="" className="img-card-reserve" />
        )}
      </div>

      <div className="card-titles-container">
        <div className="info-title">
          <p className="grey">
            {category.toUpperCase()} {rToStars(rating)}
          </p>
          <h3>{name}</h3>

          <div className="floating-rating"></div>
        </div>

        <p className="ubication-reserve">
          <i className="fa-solid fa-location-dot location-icon-card"></i>
          {ubicacion}
        </p>
      </div>
      <div className="line"></div>
      <div className="check-container">
        <p className="checkin-out"> Check In</p>
        <p className="days">
          {reservationDates.length > 0 ? (
            <>
              {new DateObject({
                locale: gregorian_es,
                date: reservationDates[0],
              }).format("dddd DD MMMM YYYY")}
            </>
          ) : (
            <>
              {new DateObject({
                locale: gregorian_es,
                date: localStorage.getItem("startDate"),
              }).format("dddd DD MMMM YYYY")}
            </>
          )}
        </p>
      </div>
      <div className="line"></div>
      <div className="check-container">
        <p className="checkin-out">Check Out</p>
        <p className="days">
          {reservationDates.length > 1 ? (
            <>
              {new DateObject({
                locale: gregorian_es,
                date: reservationDates[1],
              }).format("dddd DD MMMM YYYY")}
            </>
          ) : (
            <>
              {new DateObject({
                locale: gregorian_es,
                date: localStorage.getItem("endDate"),
              }).format("dddd DD MMMM YYYY")}
            </>
          )}
        </p>
      </div>
      <div className="line"></div>

      <div className="btn-container">
      <p className="text-input ">
          Debes seleccionar una fecha estimada de llegada.
        </p>
        <button
          className="btn-reservation btn"
          onClick={() => {
            bookingComplete();
          }}
        >
          Confirmar Reserva
        </button>
   
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="modal-reserve"
          overlayClassName="overlay-reserve"
          ariaHideApp={false}
        >
          <ReserveCreated />
        </Modal>
      </div>
    </div>
  );
};
export default ReserveCard;
