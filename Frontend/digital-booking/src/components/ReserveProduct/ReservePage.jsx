import LoaderProducts from "../LoaderProducts";
import UserContext from "../../context/UserContext";
import { useContext } from "react";
import { useEffect } from "react";
import { DateObject } from "react-multi-date-picker";
import gregorian_es from "../../assets/data/gregoriano_es";
import "../../styles/reservePage.css";
import useFetch from "../useFetch/useFetch";
import swal from "sweetalert";
import axios from "axios";

const ReservePage = ({ getFavoritesLength }) => {
  const { logged } = useContext(UserContext);
  const { data, loading } = useFetch(
    `http://g9apidigitalbookinganita-env.eba-acy747p9.us-west-2.elasticbeanstalk.com/booking/findByUser/${sessionStorage.getItem(
      "email"
    )}`
  );
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
  const getFavorites = () => {
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
  };
  const postFavorites = (nameId, e) => {
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
      .then(() => {
        e.target.classList.add("icon-fav-active");
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
  };
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
          getFavorites();
          getFavoritesLength();
        });
    }
  };
  useEffect(() => {
    getFavorites();
  });
  const deleteBooking = (itemId) => {
    if (data) {
      fetch(
        `http://g9apidigitalbookinganita-env.eba-acy747p9.us-west-2.elasticbeanstalk.com/booking/delete/${itemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: sessionStorage.getItem("jwt"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      ).then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      });
    }
  };
  return (
    <>
      {loading ? (
        <LoaderProducts />
      ) : (
        <div className="container-fav-trip">
          <h1 className="title-fav-trip">Mis reservas</h1>
          {data === undefined ? (
            <div className="no-booking-container">
              <div className="no-booking">
                <span className="material-symbols-outlined icon-reserve">
                  luggage
                </span>
                <h1>Todavía no tenés ningúna reserva</h1>
                <p>Encontrá todo lo que necesitás para tu nueva aventura.</p>
                <button
                  onClick={() => {
                    window.location.href = "/";
                  }}
                >
                  <i className="fa-solid fa-house"></i> Empezá a buscar
                </button>
              </div>
            </div>
          ) : (
            <div className="box-bookings">
              {data.map((item, i) => {
                return (
                  <div className="booking-card" key={i}>
                    {item.product.images.length !== 0 && (
                      <div className="box-img-reserve">
                        <a
                          href={`/products/${item.product.nameIdentifier}`}
                          className="box-img-reserve-fav"
                        >
                          <img
                            className="reserve-img"
                            src={item.product.images[0].url}
                            alt=""
                          />
                        </a>
                        <div className="fav-container">
                          <i
                            className={`fa-solid fa-heart icon-fav-card ${item.product.nameIdentifier}`}
                            onClick={(e) => {
                              e.preventDefault();
                              if (logged) {
                                if (
                                  !e.target.classList.contains(
                                    "icon-fav-active"
                                  )
                                ) {
                                  return postFavorites(
                                    item.product.nameIdentifier,
                                    e
                                  );
                                } else {
                                  return deleteFavorites(
                                    item.product.nameIdentifier,
                                    e
                                  );
                                }
                              }
                            }}
                          ></i>
                        </div>
                      </div>
                    )}
                    <div className="booking-card-data">
                      <div className="header-card-title">
                        <h1>
                          {item.product.name} {rToStars(item.product.rating)}
                        </h1>
                        <p className="ubication-card">
                          <i className="fa-solid fa-location-dot location-icon-card"></i>{" "}
                          {item.product.city.name}, {item.product.city.country}{" "}
                        </p>
                      </div>
                      <div className="days-booking">
                        <div className="days-start">
                          <h3>ENTRADA</h3>
                          <div className="booking-info">
                            <p>
                              {new DateObject({
                                locale: gregorian_es,
                                date: item.bookingStartDate,
                              }).format("dddd DD MMMM YYYY")}
                              <span className="time">
                                {" "}
                                | <i className="fa-regular fa-clock"></i>{" "}
                                {item.time.split(":")[0] +
                                  ":" +
                                  item.time.split(":")[1]}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="days-end">
                          <h3>SALIDA</h3>
                          <div className="booking-info">
                            <p>
                              {new DateObject({
                                locale: gregorian_es,
                                date: item.bookingEndDate,
                              }).format("dddd DD MMMM YYYY")}
                              <span className="time">
                                {" "}
                                | <i className="fa-regular fa-clock"></i> 11:00
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="button-reserve-delete">
                        <button
                          onClick={() => {
                            swal({
                              title: "¿Estás seguro que quieres cancelarla?",
                              text: "¡No podrás revertir esto!",
                              icon: "warning",
                              buttons: ["Cancelar", "Si!"],
                            }).then((value) => {
                              if (value) {
                                deleteBooking(item.id);
                              }
                            });
                          }}
                          className="btn-cancel-reserve"
                        >
                          Cancelar reserva
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="fav-alert fav-alert-hidden">
                <p>
                  <i className="fa-solid fa-heart-circle-check icon-fav-active"></i>
                  Agregado a tu lista de favoritos
                </p>
              </div>
              <div className="fav-alert-delete fav-alert-delete-hidden">
                <p>
                  <i className="fa-solid fa-heart-circle-xmark fav-delete"></i>
                  Eliminado de tu lista de favoritos
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ReservePage;
