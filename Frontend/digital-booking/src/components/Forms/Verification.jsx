import { useParams, Link } from "react-router-dom";
import useFetch from "../useFetch/useFetch"
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
const Login = () => {
    //Params from url
    const { code } = useParams();
    const [data, setData] = useState();

    console.log(code);

    // CUSTOM FETCH 
    async function verify() {
        fetch(`http://g9apidigitalbookinganita-env.eba-acy747p9.us-west-2.elasticbeanstalk.com/authenticate/verify/${code}`)
            .then(response => response.text())
            .then(result => setData(result))
            .catch(error => console.log(error))
    }
    verify()

    return (
        <main>

            <section className="verify-container">
                {data &&
                    <div>
                        <span class="material-symbols-outlined">
                            verified
                        </span>
                        <p>Verificación exitosa, ya podes
                            <Link to="/login" className="link-hover">
                                logearte
                                <span class="material-symbols-outlined">
                                    login
                                </span>
                            </Link>
                        </p>
                    </div>
                }
            </section>
        </main>
    )
}
export default Login;