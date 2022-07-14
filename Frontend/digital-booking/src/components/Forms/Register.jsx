import { Link } from "react-router-dom";
import "../../styles/forms.css";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

const Register = () => {
    // CONTEXT
    const { register } = useContext(UserContext);
    ////////////////////EVENTOS

    // SUBMIT
    const validate = (e) => {
        e.preventDefault();
        //buttons
        const name = e.target.name;
        const lastname = e.target.lastname;
        const email = e.target.email;
        const password = e.target.password;
        const confirmPass = e.target.confirmPass;

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

        //Password confirmation
        function passConfirmation() {
            if (password.value !== confirmPass.value) {
                const msg = document.getElementById("password-dont-match");

                confirmPass.classList.add("invalid-input");
                msg.style.display = "block";

                setTimeout(() => {
                    confirmPass.classList.remove("invalid-input");
                    msg.style.display = "none";
                }, 4000);

                return false;
            } else return true;
        }

        //Register
        if (emailValidation() && passValidation() && passConfirmation()) {
            const user = {
                name: e.target.name.value + " " + e.target.lastname.value,
                username: e.target.email.value,
                email: e.target.email.value,
                password: e.target.password.value,
            };
            //Context method register
            register(user);

            // window.location.href = "http://localhost:3000/";
        }
    };
    // INVALID INPUT
    const invalidInput = (e) => {
        e.preventDefault();
        e.target.classList.add("invalid-input");
        var msg = document.getElementById("msg-" + e.target.id);
        msg.style.display = "block";

        setInterval(() => {
            e.target.classList.remove("invalid-input");
            msg.style.display = "none";
        }, 4000);
    };
    //PASSWORD VISIBILITY
    const showPass = () => {
        var pass = document.getElementById("password");
        var confirm = document.getElementById("confirmPass");
        if (pass.type === "password") {
            pass.type = "text";
            confirm.type = "text";
        } else {
            pass.type = "password";
            confirm.type = "password";
        }
    };
    ////////////////////////////////RENDER
    return (
        <div className="box-container">
            <section className="form-container" id="form-container">
                <h2>Crear cuenta</h2>
                <form action="" onSubmit={validate}>
                    <div className="names-wrapper">
                        <div>
                            <label htmlFor="name">Nombre</label>
                            <div className="relative">
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    onInvalid={invalidInput}
                                    required
                                />
                                <span id="msg-name" className="invalid-msg">
                                    Este campo es obligatorio
                                </span>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="lastname">Apellido</label>
                            <div className="relative">
                                <input
                                    id="lastname"
                                    type="text"
                                    name="lastname"
                                    onInvalid={invalidInput}
                                    required
                                />
                                <span id="msg-lastname" className="invalid-msg">
                                    Este campo es obligatorio
                                </span>
                            </div>
                        </div>
                    </div>

                    <label htmlFor="email">Correo electrónico</label>
                    <div className="relative">
                        <input
                            id="email"
                            type="email"
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

                    <label htmlFor="confirmPass">Confirmar contraseña</label>
                    <div className="relative">
                        <input
                            type="password"
                            name="confirmPass"
                            id="confirmPass"
                            onInvalid={invalidInput}
                            required
                        />
                        <span
                            onClick={showPass}
                            className="pass-visibility material-symbols-outlined"
                        >
                            visibility_off
                        </span>
                        <span id="msg-confirmPass" className="invalid-msg">
                            Este campo es obligatorio
                        </span>
                        <span id="password-dont-match" className="invalid-msg">
                            Las contraseñas no coinciden
                        </span>
                    </div>

                    <div className="button-container">
                        <span id="form-popUp">
                            La contraseña debe ser de al menos 6 caracteres, 1 mayuscula y un
                            caracter especial
                        </span>
                        <button className="btn" type="submit" value="Crear cuenta">Crear cuenta</button>
                    </div>
                </form>
                <p>
                    ¿Ya tienes una cuenta?{" "}
                    <Link to={"/login"} className="yellow">
                        Iniciar sesion
                    </Link>
                </p>
            </section>
            <div id="registred">
                <span className="material-symbols-outlined">pending</span>
                <p>
                    Se le ha enviado un mail a su cuenta de correo. Porfavor verifiquelo
                    antes de continuar
                </p>
            </div>
        </div>
    );
};
export default Register;
