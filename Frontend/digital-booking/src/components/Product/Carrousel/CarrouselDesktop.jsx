import React, { useContext, useEffect } from "react";
import Modal from "react-modal";
import ImageGallery from "react-image-gallery";
import ModalShare from "../ModalShare.jsx";
import UserContext from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const CarrouselDesktop = ({ imagesGrid, data, getFavoritesLength }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpenShare, setIsOpenShare] = React.useState(false);
  const { logged } = useContext(UserContext);
  const { changeFlagFavorites } = useContext(UserContext);
  const navigate = useNavigate();

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
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  function openModalShare() {
    setIsOpenShare(true);
  }
  function closeModalShare() {
    setIsOpenShare(false);
  }
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
  }, [logged]);
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
          e.target.classList.remove("icon-fav-active");
          getFavoritesLength();
          document
            .querySelector(".fav-alert-product-delete")
            .classList.remove("fav-alert-product-delete-hidden");

          setTimeout(() => {
            document
              .querySelector(".fav-alert-product-delete")
              .classList.add("fav-alert-product-delete-hidden");
          }, 2000);
        });
    }
  };
  return (
    <div className="carrousel_desktop">
      <div className="icons">
        <button className="button-icon-carrusel" onClick={openModalShare}>
          <i className="fa-solid fa-share share-carrousel-icon"></i>
        </button>
        <Modal
          isOpen={modalIsOpenShare}
          onRequestClose={closeModal}
          className="Modal"
          overlayClassName="Overlay"
          ariaHideApp={false}
        >
          <ModalShare closeModal={closeModalShare} data={data} />
        </Modal>

        <i
          className={`fa-solid fa-heart fav-carrousel-mobile ${data.nameIdentifier}`}
          onClick={(e) => {
            if (logged) {
              changeFlagFavorites();
              if (!e.target.classList.contains("icon-fav-active")) {
                return postFavorites(data.nameIdentifier, e);
              } else {
                return deleteFavorites(data.nameIdentifier, e);
              }
            } else {
              changeFlagFavorites();
              return navigate("/login");
            }
          }}
        ></i>
      </div>
      <div className="grid-photos">
        <div className="box1">
          <img
            src={imagesGrid[0].original}
            alt="Foto Principal"
            className="img-main-desktop"
          />
        </div>
        <div className="box2">
          <img
            src={imagesGrid[1].original}
            alt="Foto Secundaria"
            className="img-desktop"
          />
          <img
            src={imagesGrid[2].original}
            alt="Foto Secundaria"
            className="img-desktop"
          />
        </div>
        <div className="box3">
          <div className="lastbox-image">
            <img
              src={imagesGrid[3].original}
              alt="Foto Secundaria"
              className="img-desktop"
            />
          </div>

          <div className="last-image">
            <img
              src={imagesGrid[4].original}
              alt="Foto Secundaria"
              className="img-desktop"
            />
            <button className="more-btn" onClick={openModal}>
              {data.images.length - 4 === 1
                ? `${data.images.length - 4} foto más`
                : `${data.images.length - 4} fotos más`}
            </button>
          </div>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="Modal"
          overlayClassName="Overlay"
          ariaHideApp={false}
        >
          <div className="gallery-modal">
            <ImageGallery
              showIndex={true}
              items={imagesGrid}
              showPlayButton={false}
              lazyLoad={true}
              showFullscreenButton={false}
              disableThumbnailSwipe={true}
              disableSwipe={true}
            />
            <div className="btn-box-cancel">
              <span className="material-symbols-outlined" onClick={closeModal}>
                cancel
              </span>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CarrouselDesktop;
