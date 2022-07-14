const Features = ({ data }) => {
  function selectiveRender(feature) {
    return (
      <>
        {feature === "Cocina" ? (
          <span className="material-symbols-outlined icon-features">oven_gen</span>
        ) : null}
        {feature === "Televisor" ? (
          <i className="fa-solid fa-tv icon-features"></i>
        ) : null}
        {feature === "Aire acondicionado" ? (
          <span className="material-symbols-outlined icon-features">ac_unit</span>
        ) : null}
        {feature === "Apto mascotas" ? (
          <i className="fa-solid fa-paw icon-features"></i>
        ) : null}
        {feature === "Estacionamiento gratuito" ? (
          <i className="fa-solid fa-car icon-features"></i>
        ) : null}
        {feature === "Pileta" ? (
          <span className="material-symbols-outlined icon-features">pool</span>
        ) : null}
        {feature === "Wifi" ? (
          <i className  ="fa-solid fa-wifi icon-features"></i>
        ) : null}
      </>
    );
  }

  return (
    <section className="prod-text-conteiner-features">
      <h2>¿Qué ofrece este lugar?</h2>
      <div className="features-containter">
        {data.features.map((f, i) => {
          return (
            <div className="featureList" key={"feature" + i}>
              <p>
                {selectiveRender(f.feature)} {f.feature}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default Features;
