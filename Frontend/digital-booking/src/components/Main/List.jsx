import { useState } from "react";
import Card from "./Card";

const List = ({
  data,
  getFavoritesLength,
  filtredByCity,
  datesSelected,
  filtredByDates,
  filtredByCityAndDates,
}) => {
  const [page, setPage] = useState(1);
  const [prodPerPage] = useState(4);

  const maxPages = Math.ceil(data.length / prodPerPage);
  const indexOfLastPost = page * prodPerPage;
  const indexOfFirstPost = indexOfLastPost - prodPerPage;
  const renderData = data.slice(indexOfFirstPost, indexOfLastPost); //apply to variable after refactor in main

  function nextPage() {
    if (page < maxPages) {
      setPage(page + 1);
    }
  }
  function prevPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }
  const titleList = () => {
    if (filtredByDates) {
      return (
        <>
          {datesSelected[0].format("DD/MM/YYYY")} -{" "}
          {datesSelected[1].format("DD/MM/YYYY")}
        </>
      );
    }
    if (filtredByCity) {
      return (
        <>
          {data[0].city.name}: {data.length} alojamientos encontrados
        </>
      );
    }
    if (filtredByCityAndDates) {
      return (
        <>
          {data[0].city.name} {"> "}
          <span className="dates">{datesSelected[0].format("DD/MM/YYYY")} -{" "}
          {datesSelected[1].format("DD/MM/YYYY")}</span>
        </>
      );
    }
  };
  return (
    <div className="list-container">
      {filtredByCity || filtredByCityAndDates || filtredByDates ? (
        <div className="header-container">
          <h2>{titleList()}</h2>
          <button
            onClick={() => {
              window.location.reload();
            }}
          >
            Eliminar busqueda
          </button>
        </div>
      ) : (
        <h2>Recomendaciones</h2>
      )}

      <div className="list" id="product">
        {renderData.map((item, i) => {
          return (
            <Card
              hotel={item}
              images={item.images}
              key={i}
              i={i}
              getFavoritesLength={getFavoritesLength}
            ></Card>
          );
        })}
      </div>
      <div className="pagination">
        <button onClick={prevPage} id="btn-left">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <p>
          {page} / {maxPages}
        </p>
        <button onClick={nextPage}>
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </button>
      </div>
      <div className="fav-alert fav-alert-hidden">
        <p>
          <i className="fa-solid fa-heart-circle-check icon-fav-active"></i>
          Agregado a tu lista de favoritos
        </p>
      </div>
      <div className="fav-alert-delete fav-alert-delete-hidden">
        <p>
          <i className="fa-solid fa-heart-circle-xmark fav-delete"></i>Eliminado
          de tu lista de favoritos
        </p>
      </div>
    </div>
  );
};
export default List;
