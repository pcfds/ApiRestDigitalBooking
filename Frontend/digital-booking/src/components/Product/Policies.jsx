const Policies = ({ data }) => {
  return (
    <section className="prod-text-conteiner-policies">
      <h2>Qué tenés que saber</h2>
      <div className="policies-containter">
        <div className="policy-container-small">
          <h3>Normas de la casa</h3>
          {data.policy.norms.map((f, i) => {
            return (
              <div className="feature" key={"feature" + i}>
                <i className="fa-solid fa-circle-exclamation"></i>
                <p>{f}</p>
              </div>
            );
          })}
        </div>
        <div className="policy-container-small">
          <h3>Salud y seguridad</h3>
          {data.policy.healthAndSecurity.map((f, i) => {
            return (
              <div className="feature" key={"feature" + i}>
                <i className="fa-solid fa-circle-exclamation"></i> <p>{f}</p>
              </div>
            );
          })}
        </div>
        <div className="policy-container-small">
          <h3>Politicas de cancelación</h3>
          {data.policy.cancellationPolicy.map((f, i) => {
            return (
              <div className="feature" key={"feature" + i}>
                <i className="fa-solid fa-circle-exclamation"></i> <p>{f}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Policies;
