import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Map from "../Product/MapView";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Card = ({ hotel, i, images, getFavoritesLength }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const nameId = hotel.nameIdentifier;
  const category = hotel.category.title;
  const rating = hotel.rating;
  const name = hotel.name;
  const description = hotel.description;
  const url = images;
  const { logged } = useContext(UserContext);
  const { changeFlagFavorites } = useContext(UserContext);
  const navigate = useNavigate();
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
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  //CALIFICATION NUMBER BY RATING
  function rToText(n) {
    if (n > 8) return <p>Muy bueno</p>;
    else if (n > 6) return <p>Bueno</p>;
    else if (n > 4) return <p>Normal</p>;
    else return <p>Malo</p>;
  }
  //DESCRIPTION TOGGLE
  const [toggleText, setToggleText] = useState("más");
  const toggleDescription = () => {
    const description = document.getElementById("description" + i);
    description.classList.toggle("truncate");
    toggleText === "más" ? setToggleText("menos") : setToggleText("más");
  };
  // SELECTIVE ICON RENDER
  function selectiveRender(feature, i) {
    return (
      <>
        {feature === "Cocina" ? (
          <i className="fa-solid fa-kitchen-set icon-features-card"></i>
        ) : null}
        {feature === "Televisor" ? (
          <i className="fa-solid fa-tv icon-features-card"></i>
        ) : null}
        {feature === "Aire acondicionado" ? (
          <span className="material-symbols-outlined icon-features-card">
            ac_unit
          </span>
        ) : null}
        {feature === "Apto mascotas" ? (
          <i className="fa-solid fa-paw icon-features-card"></i>
        ) : null}
        {feature === "Estacionamiento gratuito" ? (
          <i className="fa-solid fa-car icon-features-card"></i>
        ) : null}
        {feature === "Pileta" ? (
          <span className="material-symbols-outlined icon-features-card">
            pool
          </span>
        ) : null}
        {feature === "Wifi" ? (
          <i className="fa-solid fa-wifi icon-features-card"></i>
        ) : null}
      </>
    );
  }
  const postFavorites = (nameId, e) => {
    if (!e.target.classList.contains("icon-fav-active")) {
      fetch(
        `http://g9apidigitalbookinganita-env.eba-acy747p9.us-west-2.elasticbeanstalk.com/users/favorites/${sessionStorage.getItem(
          "email"
        )}/${nameId}`,
        {
          method: "POST",
          headers: {
            Authorization: sessionStorage.getItem("jwt"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
        .then((res) => res.text())
        .then((data) => {
          if (data) {
            e.target.classList.add("icon-fav-active");
          }
          getFavoritesLength();
          document
            .querySelector(".fav-alert")
            .classList.remove("fav-alert-hidden");

          setTimeout(() => {
            document
              .querySelector(".fav-alert")
              .classList.add("fav-alert-hidden");
          }, 2000);
        });
    }
  };
  useEffect(() => {
    if (logged) {
      axios
        .get(
          `http://g9apidigitalbookinganita-env.eba-acy747p9.us-west-2.elasticbeanstalk.com/users/favorites/${sessionStorage.getItem(
            "email"
          )}`
        )
        .then((res) => {
          res.data.map((fav) => {
            if (logged) {
              document.querySelectorAll(".icon-fav-card").forEach((e) => {
                if (e.classList.contains(fav.nameIdentifier)) {
                  e.classList.add("icon-fav-active");
                }
              });
            }
            return fav;
          });
        });
    }
  });
  const deleteFavorites = (nameId, e) => {
    if (e.target.classList.contains("icon-fav-active")) {
      axios
        .delete(
          `http://g9apidigitalbookinganita-env.eba-acy747p9.us-west-2.elasticbeanstalk.com/users/favorites/${sessionStorage.getItem(
            "email"
          )}/${nameId}`,
          {
            headers: {
              Authorization: sessionStorage.getItem("jwt"),
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((data) => {
          if (data.status === 200) {
            e.target.classList.remove("icon-fav-active");
          }

          document
            .querySelector(".fav-alert-delete")
            .classList.remove("fav-alert-delete-hidden");

          setTimeout(() => {
            document
              .querySelector(".fav-alert-delete")
              .classList.add("fav-alert-delete-hidden");
          }, 2000);
          getFavoritesLength();
        });
    }
  };
  /////////////////////////////// RENDER
  return (
    <div className="card">
      <div className="img-section">
        <Link
          to={`/products/${nameId}`}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          {url.length !== 0 && (
            <img className="card-img" src={url[0].url} alt="" />
          )}
        </Link>
        <div className="fav-container">
          <i
            className={`fa-solid fa-heart icon-fav-card ${nameId}`}
            onClick={(e) => {
              if (logged) {
                changeFlagFavorites();
                if (!e.target.classList.contains("icon-fav-active")) {
                  return postFavorites(nameId, e);
                } else {
                  return deleteFavorites(nameId, e);
                }
              } else {
                changeFlagFavorites();
                return navigate("/login");
              }
            }}
          ></i>
        </div>
      </div>

      <div className="info-section">
        <div className="info-title-card">
          <p className="grey">
            {category.toUpperCase()} {rToStars(rating)}
          </p>
          <h3>{name}</h3>
          <div className="floating-rating">
            <div>
              <span className="rating-num">{rating}</span>
            </div>
            {rToText(rating)}
          </div>
        </div>
        <p className="ubication-card">
          <i className="fa-solid fa-location-dot location-icon-card"></i>{" "}
          {hotel.city.name}, {hotel.city.country} -{" "}
          <button className="show-map" onClick={openModal}>
            Ver en mapa
          </button>
        </p>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="modalMap"
          overlayClassName="overlayMap"
          ariaHideApp={false}
        >
          <div className="map-modal">
            <Map data={hotel} />
            <div className="btn-box-cancel-map">
              <span className="material-symbols-outlined" onClick={closeModal}>
                cancel
              </span>
            </div>
          </div>
        </Modal>
        <div className="services">
          {hotel.features.map((f, i) => {
            return <div key={i}>{selectiveRender(f.feature, i)} </div>;
          })}
        </div>
        <p>
          <span id={"description" + i} className="truncate">
            {description}{" "}
          </span>
          <button className="more-description" onClick={toggleDescription}>
            {toggleText}...
          </button>
        </p>
        <Link
          to={`/products/${nameId}`}
          className="btn"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          Ver detalle
        </Link>
      </div>
    </div>
  );
};
export default Card;
