import React from "react";
const ReserveCreated = () => {
  return (
    <div className="modal-reserve-created">
      <span className="material-symbols-outlined verified-icon">verified</span>
      <h1>¡Muchas gracias!</h1>
      <p className="text-reserve">Su reserva ha sido realizada con éxito.</p>
      <button
        className="button-reserve"
        onClick={() => {
          window.location.href = "/reservas";
        }}
      >
        Volver
      </button>
    </div>
  );
};
export default ReserveCreated;
