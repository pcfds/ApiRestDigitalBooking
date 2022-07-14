export const Categories = ({
  filterProducts,
  dataProducts,
  dataCategories,
}) => {
  const departments = [];
  const hotels = [];
  const bedAndBreakfasts = [];
  const hostel = [];
  const filterCategoryLength = () => {
    if (dataProducts) {
      dataProducts.forEach((item) => {
        if (item.category.title === "Departamentos") {
          departments.push(item.category.length);
        }
        if (item.category.title === "Hoteles") {
          hotels.push(item.category.length);
        }
        if (item.category.title === "Hostels") {
          hostel.push(item.category.length);
        }
        if (item.category.title === "Bed & Breakfast") {
          bedAndBreakfasts.push(item.category.length);
        }
      });
    }
  };
  filterCategoryLength();
  return (
    <div className="general-container">
      <h2 className="heading-title">Buscar por tipo de alojamiento</h2>
      <div className="cards-container">
        {dataCategories &&
          dataCategories.map((item, i) => {
            return (
              <div
                className="categories-card"
                key={i + "card"}
                id={item.title}
                onClick={() => {
                  filterProducts(item.title);
                  document.querySelector("#product").scrollIntoView();
                }}
              >
                <img src={item.urlImage} alt="foto hotel" />
                <div className="categories-card-info">
                  <h3>{item.title}</h3>
                  <p>
                    {item.title === "Departamentos"
                      ? `${departments.length} alojamientos`
                      : ""}
                    {item.title === "Hoteles"
                      ? `${hotels.length} alojamientos`
                      : ""}
                    {item.title === "Hostels"
                      ? `${hostel.length} alojamientos`
                      : ""}
                    {item.title === "Bed & Breakfast"
                      ? `${bedAndBreakfasts.length} alojamientos`
                      : ""}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
