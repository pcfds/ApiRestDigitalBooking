const ProductCreated = ({ closeFailModal }) => {
    return (
        <>
            <div className="modal-reserve-created">
                <span class="material-symbols-outlined verified-icon">error</span>
                <h1>Algo anda mal</h1>
                <p className="text-reserve">Lamentablemente el producto no ha podido crearse. Por favor intente más tarde</p>
                <div  className="product-modal-buttons">
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
                        onClick={closeFailModal}
                    >
                        Cerrar 
                    </button>
                </div>
            </div>
        </>
    )
}
export default ProductCreated;