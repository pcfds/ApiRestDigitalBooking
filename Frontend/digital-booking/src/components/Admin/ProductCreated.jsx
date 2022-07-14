const ProductCreated = ({ nameIdentifier }) => {
  return (
    <>
      <div className="modal-reserve-created">
        <span className="material-symbols-outlined verified-icon">verified</span>
        <h1>Producto creado!</h1>
        <p className="text-reserve">El producto ya puede ser visualizado.</p>
        <div className="product-modal-buttons">
          <button
            className="button-reserve"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Volver al inicio
          </button>
          <button
            className="button-reserve"
            onClick={() => {
              window.location.href = `/products/${nameIdentifier}`;
            }}
          >
            Ver el producto
          </button>
        </div>
      </div>
    </>
  )
}
export default ProductCreated;