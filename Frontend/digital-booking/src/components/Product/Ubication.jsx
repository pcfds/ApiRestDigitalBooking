const Ubication = ({ data }) => {
  const name = data.city.name;
  const province = data.city.province;
  const country = data.city.country;

  return (
    <div className="ubication">
      <p className="p1">
      <i className="fa-solid fa-location-dot"></i>
        {name}, {province}, {country}
      </p>
    </div>
  );
};
export default Ubication;
