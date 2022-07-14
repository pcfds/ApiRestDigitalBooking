import "../../styles/wishList.css";
import useFetch from "../useFetch/useFetch";
import LoaderProducts from "../LoaderProducts";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const WishList = ({ getFavoritesLength }) => {
  const { logged } = useContext(UserContext);
  const { changeFlagFavorites } = useContext(UserContext);
  const { data, loading } = useFetch(
    `http://g9apidigitalbookinganita-env.eba-acy747p9.us-west-2.elasticbeanstalk.com/users/favorites/${sessionStorage.getItem(
      "email"
    )}`
  );
  const navigate = useNavigate();
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
  function rToText(n) {
    if (n > 8) return <p>Muy bueno</p>;
    else if (n > 6) return <p>Bueno</p>;
    else if (n > 4) return <p>Normal</p>;
    else return <p>Malo</p>;
  }
  const getFavorites = () => {
    axios
      .get(
        `http://g9apidigitalbookinganita-env.eba-acy747p9.us-west-2.elasticbeanstalk.com/users/favorites/${sessionStorage.getItem(
          "email"
        )}`
      )
      .then((res) => {
        res.data.map((fav) => {
          document.querySelectorAll(".icon-fav-card").forEach((e) => {
            if (e.classList.contains(fav.nameIdentifier)) {
              e.classList.add("icon-fav-active");
            }
          });
          return fav;
        });
      });
  };
  useEffect(() => {
    getFavorites();
  });
  const deleteFavorites = (nameId, e) => {
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
      .then((res) => {
        if (res.status === 200) {
          e.target.classList.remove("icon-fav-active");
          getFavoritesLength();
        }
        window.location.reload();
      });
  };
  const [toggleText, setToggleText] = useState("más");
  const toggleDescription = () => {
    for (let i = 0; i < data.length; i++) {
      const description = document.getElementById("description" + i);
      description.classList.toggle("truncate");
      toggleText === "más" ? setToggleText("menos") : setToggleText("más");
    }
  };
  return (
    <>
      {loading ? (
        <LoaderProducts />
      ) : (
        <div className="container-fav-trip">
          <h1 className="title-fav-trip">Mis favoritos</h1>
          {data.length === 0 ? (
            <div className="no-booking-container">
              <div className="no-booking">
                <i className="fa-regular fa-heart icon-whishList"></i>
                <h1>Todavía no tenés ningún favorito</h1>
                <p>
                  Durante la búsqueda, tocá el ícono del corazón para guardar
                  tus alojamientos favoritos!
                </p>
              </div>
            </div>
          ) : (
            <div className="box-bookings">
              {data.map((item, i) => {
                return (
                  <div className="booking-card" key={i}>
                    {item.images.length !== 0 && (
                      <div className="box-img-reserve">
                        <a
                          href={`/products/${item.nameIdentifier}`}
                          className="box-img-reserve-fav"
                        >
                          <img
                            className="reserve-img"
                            src={item.images[0].url}
                            alt=""
                          />
                        </a>
                        <div className="fav-container">
                          <i
                            className={`fa-solid fa-heart icon-fav-card ${item.nameIdentifier}`}
                            onClick={(e) => {
                              if (logged) {
                                if (
                                  e.target.classList.contains("icon-fav-active")
                                ) {
                                  return deleteFavorites(
                                    item.nameIdentifier,
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
                        <h1 className="title-product-wishlist">
                          {item.name} {rToStars(item.rating)}
                        </h1>
                        <div className="floating-rating">
                          <div>
                            <span className="rating-num">{item.rating}</span>
                          </div>
                          {rToText(item.rating)}
                        </div>
                        <p className="ubication-card">
                          <i className="fa-solid fa-location-dot location-icon-card"></i>{" "}
                          {item.city.name}, {item.city.country}{" "}
                        </p>
                      </div>
                      <p className="descrition-fav-page">
                        <span id={"description" + i} className="truncate">
                          {item.description}{" "}
                        </span>
                        <button
                          className="more-description"
                          onClick={toggleDescription}
                        >
                          {toggleText}...
                        </button>
                      </p>
                      <div className="button-reserve-delete">
                        <button
                          onClick={(e) => {
                            deleteFavorites(item.nameIdentifier, e);
                          }}
                          className="btn-cancel-reserve"
                        >
                          Eliminar favorito
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="fav-alert-product fav-alert-product-hidden">
                <p>
                  <i className="fa-solid fa-heart-circle-check icon-fav-active"></i>
                  Agregado a tu lista de favoritos
                </p>
              </div>
              <div className="fav-alert-product-delete fav-alert-product-delete-hidden">
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
export default WishList;
