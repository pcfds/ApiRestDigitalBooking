import { createContext, useEffect, useState } from "react";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);
  const [flag, setFlag] = useState(false);
  const [flagFavorites, setFlagFavorites] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  async function register(inputUser) {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(inputUser),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(
      "http://g9apidigitalbookinganita-env.eba-acy747p9.us-west-2.elasticbeanstalk.com/authenticate/newUser",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        if (JSON.parse(result).message === "Usuario creado") {
          var registred = document.getElementById("registred");
          registred.style.display = "flex";
          var form = document.getElementById("form-container");
          form.style.display = "none";
        } else {
          var popUp = document.getElementById("form-popUp");
          popUp.style.display = "block";
          setTimeout(() => {
            popUp.style.display = "none";
          }, 4000);
        }
      });
  }

  async function login(inputUser) {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(inputUser),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(
      "http://g9apidigitalbookinganita-env.eba-acy747p9.us-west-2.elasticbeanstalk.com/authenticate/login",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        if (JSON.parse(result).token) {
          sessionStorage.setItem("jwt", "Bearer " + JSON.parse(result).token);
          sessionStorage.setItem("name", JSON.parse(result).name);
          sessionStorage.setItem("email", JSON.parse(result).username);
          setLogged(true);
          if (flag) {
            window.location.href = `/products/${localStorage.getItem(
              "idProduct"
            )}/reserve`;
            return localStorage.removeItem("idProduct");
          } else if (flagFavorites) {
            return (window.location.href = "/");
          }
          window.location.href = "/";
        } else {
          var popUp = document.getElementById("form-popUp");
          popUp.style.display = "block";
          setTimeout(() => {
            popUp.style.display = "none";
          }, 4000);
        }
      });
      fetch(`http://g9apidigitalbookinganita-env.eba-acy747p9.us-west-2.elasticbeanstalk.com/users/isAdmin/${inputUser.username}`)
      .then(response => response.text())
      .then(result => {
        if (JSON.parse(result) === "ACCEPTED") {
          sessionStorage.setItem("admin", JSON.parse(result))
          setIsAdmin(true)
        }
      })
      .catch((error) => console.log(error));
  }

  const closeSession = () => {
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("admin");
    localStorage.removeItem("endDate");
    localStorage.removeItem("startDate");

    setLogged(false);
  };

  useEffect(() => {
    const inStorage = sessionStorage.getItem("jwt");

    if (inStorage != null) {
      setLogged(true);
    }

    const admin = sessionStorage.getItem("admin")
    if (admin) {
      setIsAdmin(true);
    }
  }, []);

  const changeFlag = () => {
    if (flag) {
      setFlag(false);
    } else {
      setFlag(true);
    }
  };
  const changeFlagFavorites = () => {
    if (flagFavorites) {
      setFlagFavorites(false);
    } else {
      setFlagFavorites(true);
    }
  };

  const data = {
    register,
    login,
    logged,
    closeSession,
    flag,
    flagFavorites,
    changeFlag,
    changeFlagFavorites,
    isAdmin,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};
export { UserProvider };
export default UserContext;
