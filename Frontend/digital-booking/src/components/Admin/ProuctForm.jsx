import '../../styles/productCreation.css'
import { useState } from "react";
import { useEffect } from 'react';
import { Oval } from "react-loader-spinner";
import Modal from "react-modal";
import ProductCreated from './ProductCreated';
import ProductFail from './ProductFail';

const ProductForm = () => {
    ///Modal
    const [successModal, setSuccessModal] = useState(false);
    const [failModal, setFailModal] = useState(false);
    function openFailModal() {
        setSuccessModal(true)
    }
    function closeFailModal() {
        setFailModal(false)
    }
    const [nameIdentifier, setNameIdentifier] = useState("");
    ///Loder
    const [loading, setLoading] = useState(false);
    ///////////CATEGORIES FETCH
    const [categories, setCategories] = useState();

    async function getCategories() {
        fetch(
            "http://g9apidigitalbookinganita-env.eba-acy747p9.us-west-2.elasticbeanstalk.com/categories/findAll"
        )
            .then(response => response.text())
            .then(result => setCategories(JSON.parse(result)))
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getCategories();
    }, [])
    ///////////CITIES FETCH
    const [cities, setCities] = useState()

    async function getCities() {
        fetch(
            "http://g9apidigitalbookinganita-env.eba-acy747p9.us-west-2.elasticbeanstalk.com/cities/findAll"
        )
            .then(response => response.text())
            .then(result => setCities(JSON.parse(result)))
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getCities();
    }, [])

    ///////////FEATURES FETCH
    const [features, setFeatures] = useState();

    async function getFeatures() {
        fetch(
            "http://g9apidigitalbookinganita-env.eba-acy747p9.us-west-2.elasticbeanstalk.com/api/features/findAll"
        )
            .then(response => response.text())
            .then(result => setFeatures(JSON.parse(result)))
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getFeatures();
    }, [])

    ///////////FORM SUBMIT
    async function createProduct(e) {
        // if (validate(e)) {
        //     console.log("validated");
        // }
        // else console.log("invalidated");
        e.preventDefault();
        ////inputs to variables & format
        const name = e.target.name.value;
        const nameId = e.target.nameId.value;
        //save the name id in global variable to give it to the modal
        setNameIdentifier(nameId)
        const categoryId = { id: getCategoryId(e.target.category.value) };
        const cityId = { id: getCityId(e.target.city.value) };
        const description = e.target.description.value;
        const checkOut = e.target.checkOut.value + ":00";
        const address = e.target.address.value;
        const latitude = parseFloat(e.target.latitude.value);
        const longitude = parseFloat(e.target.longitude.value);

        const featureCheckBoxes = [
            { value: e.target.kitchen.value, checked: document.querySelector('#kitchen').checked },
            { value: e.target.tv.value, checked: document.querySelector('#tv').checked },
            { value: e.target.air.value, checked: document.querySelector('#air').checked },
            { value: e.target.pets.value, checked: document.querySelector('#pets').checked },
            { value: e.target.parking.value, checked: document.querySelector('#parking').checked },
            { value: e.target.pool.value, checked: document.querySelector('#pool').checked },
            { value: e.target.wifi.value, checked: document.querySelector('#wifi').checked }]
        //these are the features that go in the body
        const features = []
        //add and id to the array for each selected feature
        featureCheckBoxes.forEach((f) => {
            if (f.checked) {
                features.push({ id: getFeatureId(f.value) })
            }
        })
        const policies =
        {
            norms:
                [e.target.norm1.value],
            cancellationPolicy:
                [e.target.healthAndSecurity1.value],
            healthAndSecurity:
                [e.target.cancelPolicy1.value]
        }

        //add optional policies if not empty
        if (e.target.norm2.value) policies.norms.push(e.target.norm2.value);
        if (e.target.norm3.value) policies.norms.push(e.target.norm3.value);

        if (e.target.healthAndSecurity2.value) policies.cancellationPolicy.push(e.target.healthAndSecurity2.value);
        if (e.target.healthAndSecurity3.value) policies.cancellationPolicy.push(e.target.healthAndSecurity3.value);

        if (e.target.cancelPolicy2.value) policies.healthAndSecurity.push(e.target.cancelPolicy2.value);
        if (e.target.cancelPolicy3.value) policies.healthAndSecurity.push(e.target.cancelPolicy3.value);

        //set format of images 
        const images = []
        imgURLs.forEach((url) => {
            images.push({ url: url, alt: "" })
        })
        const newProduct = {
            name: name,
            nameIdentifier: nameId,
            description: description,
            checkOut: checkOut,
            category: categoryId,
            city: cityId,
            features: features,
            latitude: latitude,
            longitude: longitude,
            policy: policies,
            images: images

        }
        // console.log(newProduct);
        ////POST -to-API
        setLoading(true)
        fetch("http://g9apidigitalbookinganita-env.eba-acy747p9.us-west-2.elasticbeanstalk.com/products/create",
            {
                method: 'POST',
                headers: {
                    Authorization: sessionStorage.getItem("jwt"),
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(newProduct)
            })
            .then(response => response.text())
            .then(result => {
                console.log(result);
                var res = result
                if (res === "CREATED") {
                    setSuccessModal(true)
                }
                else openFailModal()

                setLoading(false)
            })
            .catch(error => console.log(error))

    }

    ///City name to id
    function getCityId(cityName) {
        const c = cities.filter(city => city.name === cityName)
        return c[0].id;
    }
    ///Category name to id
    function getCategoryId(categoryName) {
        const c = categories.filter(category => category.title === categoryName)
        return c[0].id;
    }
    ///Feature name to id
    function getFeatureId(featureName) {
        const f = features.filter(feature => feature.feature === featureName)
        if (f[0])
            return f[0].id;
        return false;
    }
    ///Replace ' ' x '-' in name identifier & everything to lowercase
    function replaceSpace(e) {
        var repalced = e.target.value.replace(/ /g, "-")
        e.target.value = repalced.toLowerCase()
    }
    //IMAGES: Add image URL to variable and clean input for images
    const [imgURLs, setImgURLs] = useState([])

    function addImageURL() {
        var input = document.querySelector("#imageURL")
        var urls = [...imgURLs]
        if (input.value.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/))
            urls.push(input.value)
        setImgURLs(urls)
        input.value = ""
        console.log(imgURLs);
    }

    //delete url
    function deleteUrl(url) {
        var originalUrls = [...imgURLs]
        var filtredUrls = originalUrls.filter(u => u !== url)
        setImgURLs(filtredUrls)
    }
    //////VALIDATIONS 
    function validate(e) {
        var ok = false
        if (imgURLs.length > 5) {
            ok = false
            const input = e.target.imageURL

            input.classList.add("invalid-input")
        }
        return ok;
    }
    return (
        <section className="product-creation-container">
            <header>
                <h2>Administración de productos</h2>
            </header>
            <h3>Crear producto</h3>
            <form action="" className='product-form' onSubmit={createProduct}>

                <div className="product-name">
                    <label htmlFor="name">Nombre de la propiedad</label>
                    <input type="text" name="name" id="name" maxLength={255} required />
                </div>

                <div className='product-name-id'>
                    <label htmlFor="nameId">Identificador del producto (para la URL)</label>
                    <input type="text" name="nameId" id="nameId" onKeyUp={replaceSpace} />
                </div>

                <div className="product-category">
                    <label htmlFor="category">Categoría</label>
                    <select name="categoty" id="category" required>
                        {categories && categories.map((category, i) => {
                            return <option value={category.title} key={i + "option"}>{category.title}</option>
                        })}
                    </select>
                </div>

                <div className="product-city">
                    <label htmlFor="city">Ciudad</label>
                    <select name="city" id="city" required>
                        {cities && cities.map((city, i) => {
                            return <option value={city.name} key={i + "option"}>{city.name}</option>
                        })
                        }
                    </select>
                </div>

                <div className="product-description">
                    <label htmlFor="description">Descripción</label>
                    <textarea name="description" id="description" cols="10" rows="9" maxLength={1000} required></textarea>
                </div>

                <div className='product-check-out'>
                    <label htmlFor="checkOut">Check Out</label>
                    <input type="time" name="checkOut" id="checkOut" />
                </div>

                <div className="product-address">
                    <label htmlFor="address">Dirección</label>
                    <input type="text" name="address" id="address" required />
                </div>

                <div className="product-ubication">
                    <h4>Geolocalización</h4>
                    <label htmlFor="latitude">Latitud</label>
                    <input type="number" name="latitude" id="latitude" required />
                    <label htmlFor="longitude">Longitud</label>
                    <input type="number" name="longitude" id="longitude" required />
                </div>

                <div className="product-features">
                    <h4>Atributos</h4>
                    <label htmlFor="features"><input type="checkbox" name="kitchen" id="kitchen" value={"Cocina"} /> Cocina <i className="fa-solid fa-kitchen-set icon-features-card"></i></label>
                    <label htmlFor="features"><input type="checkbox" name="tv" id="tv" value={"Televisor"} /> Televisor  <i className="fa-solid fa-tv icon-features-card"></i></label>
                    <label htmlFor="features"><input type="checkbox" name="air" id="air" value={"Aire acondicionado"} /> Aire acondicionado <span className="material-symbols-outlined icon-features-card">ac_unit</span></label>
                    <label htmlFor="features"><input type="checkbox" name="pets" id="pets" value={"Apto mascotas"} /> Apto mascotas <i className="fa-solid fa-paw icon-features-card"></i></label>
                    <label htmlFor="features"><input type="checkbox" name="parking" id="parking" value={"Estacionamiento gratuito"} /> Estacionamiento gratiuto <i className="fa-solid fa-car icon-features-card"></i></label>
                    <label htmlFor="features"><input type="checkbox" name="pool" id="pool" value={"Pileta"} /> Pileta <span className="material-symbols-outlined icon-features-card">pool</span></label>
                    <label htmlFor="features"><input type="checkbox" name="wifi" id="wifi" value={"Wifi"} /> Wifi <i className="fa-solid fa-wifi icon-features-card"></i></label>
                </div>

                <div className="product-policies">
                    <h4>Políticas del producto</h4>
                    <label htmlFor="norms">Normas de la casa</label>
                    <div className='flex-row'>
                        <i className="fa-solid fa-circle-exclamation"></i>
                        <input type="text" name="norm1" id="norm1" maxLength={255} required />
                    </div>
                    <div className='flex-row'>
                        <i className="fa-solid fa-circle-exclamation"></i>
                        <input type="text" name="norm2" id="norm2" maxLength={255} />
                    </div>
                    <div className='flex-row'>
                        <i className="fa-solid fa-circle-exclamation"></i>
                        <input type="text" name="norm3" id="norm3" maxLength={255} />
                    </div>

                    <label htmlFor="healthAndSecurity">Salud y seguridad</label>
                    <div className='flex-row'>
                        <i className="fa-solid fa-circle-exclamation"></i>
                        <input type="text" name="healthAndSecurity1" id="healthAndSecurity1" maxLength={255} required />
                    </div>
                    <div className='flex-row'>
                        <i className="fa-solid fa-circle-exclamation"></i>
                        <input type="text" name="healthAndSecurity2" id="healthAndSecurity2" maxLength={255} />
                    </div>
                    <div className='flex-row'>
                        <i className="fa-solid fa-circle-exclamation"></i>
                        <input type="text" name="healthAndSecurity3" id="healthAndSecurity3" maxLength={255} />
                    </div>

                    <label htmlFor="cancelPolicy">Politicas de cancelación</label>
                    <div className='flex-row'>
                        <i className="fa-solid fa-circle-exclamation"></i>
                        <input type="text" name="cancelPolicy1" id="cancelPolicy1" maxLength={255} required />
                    </div>
                    <div className='flex-row'>
                        <i className="fa-solid fa-circle-exclamation"></i>
                        <input type="text" name="cancelPolicy2" id="cancelPolicy2" maxLength={255} />
                    </div>
                    <div className='flex-row'>
                        <i className="fa-solid fa-circle-exclamation"></i>
                        <input type="text" name="cancelPolicy3" id="cancelPolicy3" maxLength={255} />
                    </div>
                </div>

                <div className='product-images'>
                    <label htmlFor="imageURL">URL de las imagenes (minimo de 5)</label>
                    <div id='current-urls'>
                        {imgURLs && imgURLs.map((url, i) => {
                            return (
                                <div className='overflow'>
                                    <p key={url + i} ><span onClick={() => deleteUrl(url)}>×</span> {url}  </p>
                                </div>)
                        })}
                    </div>
                    <div id="img-input-and-submit">
                        <input type="text" name="imageURL" id="imageURL" />
                        <span className='btn-add-url' onClick={addImageURL}>+</span>
                    </div>
                </div>


                {loading ?
                    <div className="product-submit-loader">
                        <Oval
                            ariaLabel="loading-indicator"
                            height={42}
                            width={42}
                            strokeWidth={5}
                            color=" #FBC02D"
                            secondaryColor="#263238"
                        />
                    </div>
                    :
                    <div className='submit-container'>
                        <button type="submit" className='btn-product-submit'>Crear Producto</button>
                    </div>
                }
            </form>
            <Modal
                isOpen={successModal}
                className="modal-reserve"
                overlayClassName="overlay-reserve"
                ariaHideApp={false}
            >
                <ProductCreated nameIdentifier={nameIdentifier} />
            </Modal>
            <Modal
                isOpen={failModal}
                className="modal-reserve"
                overlayClassName="overlay-reserve"
                ariaHideApp={false}
            >
                <ProductFail closeFailModal={closeFailModal} />
            </Modal>
        </section>
    )
}
export default ProductForm;