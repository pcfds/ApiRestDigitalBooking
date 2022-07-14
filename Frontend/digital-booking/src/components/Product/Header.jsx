import { useEffect } from "react";
const Header = ({ data }) => {
  useEffect(() => {
    document.tile = "Digital Booking - Sentite como en tu hogar";
    if (data) {
      document.title = ` ${data.name}, ${data.city.name} | Digital Booking`;
    }
  }, [data]);
  return (
    <section className="headerProduct">
      <div>
        <p>{data.category.title.toUpperCase()}</p>
        <h1>{data.name}</h1>
      </div>
    </section>
  );
};
export default Header;
