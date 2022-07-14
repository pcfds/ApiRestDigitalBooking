import ImageGallery from "react-image-gallery";
import { useContext, useState, useEffect } from "react";
import React from "react";
import Modal from "react-modal";
import CarrouselDesktop from "./CarrouselDesktop.jsx";
import "../../../styles/carrousel.css";
import ModalShare from "../ModalShare.jsx";
import UserContext from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Carrousel = ({ data, getFavoritesLength }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { logged } = useContext(UserContext);
  const { changeFlagFavorites } = useContext(UserContext);

  const navigate = useNavigate();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
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
              document
                .querySelectorAll(".fav-carrousel-mobile")
                .forEach((e) => {
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
  const imagesCarrousel = data.images.map((image) => {
    return {
      original: image.url,
      thumbnail: image.url,
    };
  });
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
        .then(() => {
          e.target.classList.add("icon-fav-active");
          getFavoritesLength();
          document
            .querySelector(".fav-alert-product")
            .classList.remove("fav-alert-product-hidden");

          setTimeout(() => {
            document
              .querySelector(".fav-alert-product")
              .classList.add("fav-alert-product-hidden");
          }, 2000);
        });
    }
  };
  useEffect(() => {
    getFavorites();
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
        .then(() => {
          getFavoritesLength();
          document
            .querySelector(".fav-alert-product-delete")
            .classList.remove("fav-alert-product-delete-hidden");

          setTimeout(() => {
            document
              .querySelector(".fav-alert-product-delete")
              .classList.add("fav-alert-product-delete-hidden");
          }, 2000);
          return e.target.classList.remove("icon-fav-active");
        });
    }
  };
  return (
    <div className="carrousel">
      <div className="carrousel_mobile">
        <ImageGallery
          items={imagesCarrousel}
          className="carrousel_mobile_image"
          showNav={false}
          slideDuration={3000}
          showPlayButton={false}
          showFullscreenButton={false}
          showIndex={true}
          lazyLoad={true}
          showThumbnails={false}
          autoPlay={false}
          useTranslate3D={false}
        />
        <div className="icons">
          <button className="button-icon-carrusel " onClick={openModal}>
            <i className="fa-solid fa-share share-carrousel-icon"></i>
          </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="Modal"
            overlayClassName="Overlay"
            ariaHideApp={false}
          >
            <ModalShare closeModal={closeModal} data={data} />
          </Modal>

          <i
            className={`fa-solid fa-heart fav-carrousel-mobile ${data.nameIdentifier}`}
            onClick={(e) => {
              if (logged) {
                changeFlagFavorites();
                if (e.target.classList.contains("icon-fav-active")) {
                  return deleteFavorites(data.nameIdentifier, e);
                } else {
                  return postFavorites(data.nameIdentifier, e);
                }
              } else {
                changeFlagFavorites();
                return navigate("/login");
              }
            }}
          ></i>
        </div>
      </div>
      <CarrouselDesktop
        imagesGrid={imagesCarrousel}
        data={data}
        getFavoritesLength={getFavoritesLength}
      />
    </div>
  );
};
export default Carrousel;
