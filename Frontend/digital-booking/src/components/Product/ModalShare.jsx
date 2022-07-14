const ModalShare = ({ closeModal, data }) => {
  const copyUrl = () => {
    document.querySelector(".url-copy").classList.remove("url-copy-disable");
    var inputc = document.body.appendChild(document.createElement("input"));
    inputc.value = window.location.href;
    inputc.select();
    document.execCommand("copy");
    inputc.parentNode.removeChild(inputc);
    setTimeout(() => {
      document.querySelector(".url-copy").classList.add("url-copy-disable");
    }, 1500);
  };
  return (
    <div className="gallery-modal-share">
      <div className="container-box-share">
        <div className="container-share-icons">
          <span className="material-symbols-outlined" onClick={closeModal}>
            cancel
          </span>
        </div>
        <div className="header">
          <h1>Compartí este alojamiento con tus amigos y familiares</h1>
          <div className="nameAndImages-share">
            <img
              alt="Imagen Principal"
              className="img-share-box"
              src={data.images[0].url}
            />
            <h2>
              {data.name}, {data.city.name}, {data.city.country} | Digital
              Booking
            </h2>
          </div>
          <div className="buttons-share">
            <button onClick={copyUrl}>
              Copiar enlace
              <i className="fa-solid fa-copy"></i>
            </button>
            <div className="url-copy url-copy-disable ">
              <p>
                <i className="fa-solid fa-check"></i> Enlace copiado
              </p>
            </div>
            <button
              onClick={() => {
                window.location.href = `https://api.whatsapp.com/send?text=¡No te pierdas este alojamiento en Digital Booking! ${window.location.href}`;
              }}
            >
              WhatsApp
              <i className="fa-brands fa-whatsapp"></i>
            </button>
            <button
              onClick={() => {
                window.location.href = `https://twitter.com/intent/tweet?text=¡No te pierdas este alojamiento en Digital Booking! ${window.location.href}`;
              }}
            >
              Twitter
              <i className="fa-brands fa-twitter"></i>
            </button>
            <button
              onClick={() => {
                window.location.href = `https://www.facebook.com/sharer.php?u=${window.location.href}`;
              }}
            >
              Facebook
              <i className="fa-brands fa-facebook-f"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalShare;
