import React, { useContext, useEffect, useState } from "react";
import Logo from "../assets/logodb.png";
import "../styles/header.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";
import Badge from "@uiw/react-badge";
import swal from "sweetalert";

const Header = ({ favorites }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  //ARROW HOME
  const [headerArrow, setHeaderArrow] = useState(false);
  useEffect(() => {
    location.pathname === "/" ? setHeaderArrow(false) : setHeaderArrow(true);
  }, [location]);

  //NAV LINKS
  const [login, setLogin] = useState(true);
  const [register, setRegister] = useState(true);
  useEffect(() => {
    location.pathname === "/login" ? setLogin(false) : setLogin(true);
    location.pathname === "/register" ? setRegister(false) : setRegister(true);
  }, [location]);

  //TOGGLE MENU
  const [toggleMenu, setToggleMenu] = useState(false);

  // CONTEXT MENU
  const { user, logged, closeSession, isAdmin } = useContext(UserContext);
  const [initials, setInitials] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (logged) {
      const name = mayusInitials(sessionStorage.getItem("name"));
      setUsername(name);
      var splitName = name.split(" ");
      var initials =
        splitName[0].charAt(0) + splitName[splitName.length - 1].charAt(0);
      setInitials(initials);

      fetch(
        `http://g9apidigitalbookinganita-env.eba-acy747p9.us-west-2.elasticbeanstalk.com/booking/findByUser/${sessionStorage.getItem(
          "email"
        )}`
      )
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((data) => {
          setLoading(false);
          setData(data);
        });
    }
  }, [user, logged]);

  const clearSession = () => {
    swal({
      title: "¿Estás seguro de que quieres cerrar sesión?",
      icon: "warning",
      buttons: ["Cancelar", "Si!"],
    }).then((value) => {
      if (value) {
        closeSession();
        window.location.href = "/";
      }
    });
  };
  function mayusInitials(str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  }
  return (
    <>
      <div className="nav-spacing"></div>
      <nav className="nav">
        <section className="flex-aligned">
          {/* ARROW */}
          {headerArrow ? (
            <section>
              <a href="/">
                <i className="fa-solid fa-arrow-left arrow-back"></i>
              </a>
            </section>
          ) : null}
          {/* LOGO */}
          <section className="nav-logo-container">
            <a href={"/"}>
              <img src={Logo} alt="logo digital booking" />
            </a>
            <a href={"/"}>
              <p className="nav-logo-container-p">Sentite como en tu hogar</p>
            </a>
          </section>
        </section>
        {/* LOGGED MENU  */}
        {logged ? (
          <div className="logged-menu">
            {isAdmin ? (
              <div className="link-to-admin">
                <Link to={"/add-product"} className="link">
                  <span className="material-symbols-outlined">
                    admin_panel_settings
                  </span>
                  <p>Admin</p>
                </Link>
              </div>
            ) : (
              <>
                <div className="link-menus-desktop ">
                  <Link to={`/reservas`} className="link">
                    <div>
                      {loading ? (
                        <i className="fa-solid fa-suitcase-rolling"></i>
                      ) : (
                        <>
                          {data === undefined ? (
                            <Badge count={0}>
                              <i className="fa-solid fa-suitcase-rolling"></i>
                            </Badge>
                          ) : (
                            <Badge count={data.length}>
                              <i className="fa-solid fa-suitcase-rolling"></i>
                            </Badge>
                          )}
                        </>
                      )}
                      <p>Reservas</p>
                    </div>
                  </Link>
                </div>

                <div className="link-menus-desktop">
                  <Link to={"/favoritos"} className="link">
                    <div>
                      {loading ? (
                        <div className="withOutBadge">
                          <i className="fa-solid fa-heart"></i>
                          <p>Favoritos</p>
                        </div>
                      ) : (
                        <Badge count={favorites.length}>
                          <i className="fa-solid fa-heart"></i>
                          <p>Favoritos</p>
                        </Badge>
                      )}
                    </div>
                  </Link>
                </div>
              </>
            )}

            <span className="initials">{initials}</span>
            <div>
              <p>¡Hola!</p>
              <p className="username">{username}</p>
              <i
                className="fa-solid fa-arrow-right-from-bracket close-session-btn"
                onClick={clearSession}
              ></i>
            </div>
          </div>
        ) : (
          <section className="nav-buttons">
            {register ? (
              <Link to={"/register"}>
                <button className="buttons-navBar"> Crear Cuenta</button>
              </Link>
            ) : null}
            {login ? (
              <Link to={"/login"}>
                <button className="buttons-navBar"> Iniciar sesión</button>
              </Link>
            ) : null}
          </section>
        )}
        {/* SMALLSCREEN BUTTONS */}
        <div className="app-navbar-smallscreen">
          <GiHamburgerMenu
            colors="#fff"
            fontSize={27}
            onClick={() => setToggleMenu(true)}
          />
          {toggleMenu && (
            <div className="app__navbar-smallscreen_overlay">
              {logged ? (
                <>
                  <span
                    className="material-symbols-outlined overlay__close"
                    onClick={() => setToggleMenu(false)}
                  >
                    cancel
                  </span>
                  <section className="nav-smallscreen-mobile">
                    <span className="initials-mobile">{initials}</span>
                    <div>
                      <p>¡Hola!</p>
                      <p className="username-mobile">{username}</p>
                    </div>
                  </section>

                  <section className="nav-smallscreen-links">
                    {isAdmin ? (
                      <div className="link-to-admin">
                        <Link to={"/add-product"} className="link">
                          <span class="material-symbols-outlined">
                            admin_panel_settings
                          </span>
                          <p>Admin</p>
                        </Link>
                      </div>
                    ) : (
                      <>
                        <Link
                          to={"/favoritos"}
                          onClick={() => setToggleMenu(false)}
                        >
                          <>
                            {loading ? (
                              <div className="withOutBadge">
                                <i className="fa-solid fa-heart"></i>
                                <p>Favoritos</p>
                              </div>
                            ) : (
                              <Badge count={favorites.length}>
                                <i className="fa-solid fa-heart"></i>
                                <p>Favoritos</p>
                              </Badge>
                            )}
                          </>
                        </Link>
                        <div className="line"></div>
                        <Link
                          to={"/reservas"}
                          onClick={() => setToggleMenu(false)}
                        >
                          <>
                            {loading ? (
                              <div className="withOutBadge">
                                <i className="fa-solid fa-suitcase-rolling"></i>
                                <p>Reservas</p>
                              </div>
                            ) : (
                              <>
                                <div className="withBadge">
                                  {data === undefined ? (
                                    <Badge count={0}>
                                      <i className="fa-solid fa-suitcase-rolling"></i>
                                    </Badge>
                                  ) : (
                                    <Badge count={data.length}>
                                      <i className="fa-solid fa-suitcase-rolling"></i>
                                    </Badge>
                                  )}
                                  <p>Reservas</p>
                                </div>
                              </>
                            )}
                          </>
                        </Link>
                      </>
                    )}
                  </section>
                  <div className="log-out-mobile">
                    <p>
                      ¿Deseas{" "}
                      <span
                        className="yellow"
                        onClick={(e) => {
                          if (e) {
                            clearSession();
                            window.location.href = "/";
                          }
                        }}
                      >
                        cerrar sesión
                      </span>
                      ?
                    </p>
                  </div>
                  <div className="footer-social-mobile">
                    <i className="fa-brands fa-facebook icons-nav"></i>
                    <i className="fa-brands fa-linkedin icons-nav"></i>
                    <i className="fa-brands fa-twitter icons-nav"></i>
                    <i className="fa-brands fa-instagram icons-nav"></i>
                  </div>
                </>
              ) : (
                <>
                  <span
                    className="material-symbols-outlined overlay__close"
                    onClick={() => setToggleMenu(false)}
                  >
                    cancel
                  </span>
                  <section className="nav-smallscreen">
                    <h2>Menú</h2>
                  </section>
                  <section className="nav-smallscreen-links">
                    <Link
                      to={"/register"}
                      onClick={() => {
                        setToggleMenu(false);
                      }}
                    >
                      Crear Cuenta
                    </Link>
                    <div className="line"></div>
                    <Link
                      to={"/login"}
                      onClick={() => {
                        setToggleMenu(false);
                      }}
                    >
                      Iniciar sesión
                    </Link>
                    <div className="footer-social-mobile">
                      <i className="fa-brands fa-facebook icons-nav"></i>
                      <i className="fa-brands fa-linkedin icons-nav"></i>
                      <i className="fa-brands fa-twitter icons-nav"></i>
                      <i className="fa-brands fa-instagram icons-nav"></i>
                    </div>
                  </section>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
