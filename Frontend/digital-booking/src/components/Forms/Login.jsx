import { useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/forms.css";
import UserContext from "../../context/UserContext";

const Login = () => {
  // CONTEXT
  const { login } = useContext(UserContext);
  const { flag } = useContext(UserContext);
  const { flagFavorites } = useContext(UserContext);
  // SUBMIT
  const validate = (e) => {
    e.preventDefault();

    const email = e.target.email;
    const password = e.target.password;

    //Email validation
    function emailValidation() {
      if (
        !email.value
          .toLowerCase()
          .match(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        const msg = document.getElementById("invalid-email");

        email.classList.add("invalid-input");
        msg.style.display = "block";

        setTimeout(() => {
          email.classList.remove("invalid-input");
          msg.style.display = "none";
        }, 4000);

        return false;
      } else return true;
    }
    //Pass validation
    function passValidation() {
      if (
        !password.value.match(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/
        )
      ) {
        const msg = document.getElementById("form-popUp");
        password.classList.add("invalid-input");
        msg.style.display = "block";

        setTimeout(() => {
          password.classList.remove("invalid-input");
          msg.style.display = "none";
        }, 4000);
        return false;
      } else return true;
    }

    if (emailValidation() && passValidation()) {
      const inputUser = {
        username: e.target.email.value,
        password: e.target.password.value,
      };
      login(inputUser);
    }
  };

  // INVALID INPUT
  const invalidInput = (e) => {
    e.preventDefault();
    e.target.classList.add("invalid-input");
    var msg = document.getElementById("msg-" + e.target.id);
    msg.style.display = "block";

    setTimeout(() => {
      e.target.classList.remove("invalid-input");
      msg.style.display = "none";
    }, 4000);
  };
  //PASSWORD VISIBILITY
  const showPass = () => {
    var pass = document.getElementById("password");
    if (pass.type === "password") {
      pass.type = "text";
    } else {
      pass.type = "password";
    }
  };
  return (
      <div className="form-container">
        {flag || flagFavorites ? (
          <div className="red-container">
            <i className="fa-solid fa-circle-exclamation red"></i>
            <p>Necesitas iniciar sesión para realizar esta acción.</p>
          </div>
        ) : null}
        <h2>Iniciar sesión</h2>
        <form action="" onSubmit={validate} className="login-form">
          <label html-for="email">Correo Electronico</label>
          <div className="relative">
            <input
              id="email"
              type="text"
              name="email"
              onInvalid={invalidInput}
              required
            />
            <span id="msg-email" className="invalid-msg">
              Este campo es obligatorio
            </span>
            <span id="invalid-email" className="invalid-msg">
              Este campo debe ser un email valido
            </span>
          </div>

          <label htmlFor="password">Contraseña</label>
          <div className="relative">
            <input
              type="password"
              name="password"
              id="password"
              onInvalid={invalidInput}
              required
            />
            <span
              onClick={showPass}
              className="pass-visibility material-symbols-outlined"
            >
              visibility_off
            </span>
            <span id="msg-password" className="invalid-msg">
              Este campo es obligatorio
            </span>
          </div>

          <div className="button-container">
            <span id="form-popUp">Credenciales invalidas</span>
            <input type="submit" className="btn" value="Ingresar" />
          </div>
        </form>
        <p>
          ¿Aún no tenes cuenta?{" "}
          <Link to={"/register"} className="yellow">
            Registrate
          </Link>
        </p>
      </div>
  );
};
export default Login;
