import React, { useEffect, useState } from "react";
import "../styles/categories.css";
import "../styles/cardListing.css";
import "../styles/general.css";
import useFetch from "./useFetch/useFetch";
import SearchBlock from "./Main/SearchBlock";
import { Categories } from "./Main/Categories";
import LoaderProducts from "./LoaderProducts";
import List from "./Main/List";
import axios from "axios";
import swal from "sweetalert";
const Main = ({ getFavoritesLength }) => {
  // CUSTOM FETCH (the function has an useEffect listening for any change in the url, so we use setUrl to call the function again with a new url)
  const { data, loading } = useFetch(
    "http://g9apidigitalbookinganita-env.eba-acy747p9.us-west-2.elasticbeanstalk.com/products/findAll"
  );

  const [categories, setCategories] = useState([]);
  const [isLoadedCategories, setIsLoadedCategories] = useState(false);
  const [cities, setCities] = useState([]);
  const [isLoadedCities, setIsLoadedCities] = useState(false);
  const fetchCategories = () => {
    axios
      .get(
        "http://g9apidigitalbookinganita-env.eba-acy747p9.us-west-2.elasticbeanstalk.com/categories/findAll"
      )
      .then((res) => {
        setCategories(res.data);
        setIsLoadedCategories(true);
      });
  };
  const fetchCities = () => {
    axios
      .get(
        "http://g9apidigitalbookinganita-env.eba-acy747p9.us-west-2.elasticbeanstalk.com/cities/findAll"
      )
      .then((res) => {
        setCities(res.data);
        setIsLoadedCities(true);
      });
  };
  const isMainLoaded = () => {
    if ((loading, isLoadedCategories, isLoadedCities)) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    fetchCategories();
    fetchCities();
  }, []);
  //SHUFFLE HOME PRODUCTS
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  //shuffle  call
  useEffect(() => {
    if (data) {
      shuffle(data);
    }
  });
  /////// FILTERS
  //CATEGORIES
  //we render from another variable to leave data with the original fetch
  const [filtredData, setFiltredData] = useState([]);

  //once data is fetched we assign it to the variable to be renderized
  useEffect(() => {
    if (data) {
      setFiltredData(data);
    }
  }, [data]);
  //is the filter being applied?
  const [filtredByCategory, setFiltredByCategory] = useState(false);
  const [datesSelected, setDatesSelected] = React.useState([]);
  useEffect(() => {}, [filtredByCategory]);

  const filterByCategory = (title) => {
    const category = document.getElementById(title);
    const categories = document.getElementsByClassName("selected");
    const filtredData = [];

    if (filtredByCategory) {
      // if it is, then render de original data
      setFiltredData(data);
      setFiltredByCategory(false);
      //de-select categories
      for (var i = 0; i < categories.length; i++) {
        document.getElementById(categories[i].id).classList.toggle("selected");
      }
    } else {
      data.map((product) => {
        // if not, filter by category
        if (product.category.title === title) {
          filtredData.push(product);
        }
        return filtredData;
      });
      //select categories
      category.classList.toggle("selected");
      setFiltredData(filtredData);
      setFiltredByCategory(true);
    }
  };

  // CITIES
  const [filtredByCity, setFiltredByCity] = useState(false);
  const [filtredByDates, setFiltredByDates] = useState(false);
  const [filtredByCityAndDates, setFiltredByCityAndDates] = useState(false);

  const filtersSearchBlock = () => {
    const city = document.querySelector(".city");
    const province = document.querySelector(".province");
    const country = document.querySelector(".country");
    if (city === null && datesSelected.length === 0) {
      document
        .querySelector(".error-container")
        .classList.remove("hidden-error");

      setTimeout(() => {
        document
          .querySelector(".error-container")
          .classList.add("hidden-error");
      }, 3000);
    }
    if (datesSelected.length === 0 && city !== null) {
      fetch(
        `http://g9apidigitalbookinganita-env.eba-acy747p9.us-west-2.elasticbeanstalk.com/products/findByCity/${city.innerText}/${province.innerText}/${country.innerText}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.length === 0) {
            return swal({
              title: "No hay alojamientos disponibles",
              text: "Por favor, intenta con otra fecha o cambia de ciudad",
              icon: "error",
            });
          }
          setFiltredByCity(true);
          setFiltredData(data);
          document.querySelector("#product").scrollIntoView();
        });
    }
    if (datesSelected.length === 2 && city === null) {
      const startDate = datesSelected[0].format("YYYY-MM-DD");
      const endDate = datesSelected[1].format("YYYY-MM-DD");
      fetch(
        `http://g9apidigitalbookinganita-env.eba-acy747p9.us-west-2.elasticbeanstalk.com/products/findByDate/${startDate}/${endDate}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.length === 0) {
            return swal({
              title: "No hay alojamientos disponibles",
              text: "Por favor, intenta con otra fecha o cambia de ciudad",
              icon: "error",
            });
          }
          setFiltredByDates(true);
          setFiltredData(data);
          document.querySelector("#product").scrollIntoView();
        });
    }

    if (datesSelected.length === 2 && city !== null) {
      const startDate = datesSelected[0].format("YYYY-MM-DD");
      const endDate = datesSelected[1].format("YYYY-MM-DD");

      axios
        .get(
          `http://g9apidigitalbookinganita-env.eba-acy747p9.us-west-2.elasticbeanstalk.com/products/findByCityAndDate/${city.innerText}/${startDate}/${endDate}`
        )
        .then((res) => res.data)
        .then((data) => {
          if (data.length === 0) {
            return swal({
              title: "No hay alojamientos disponibles",
              text: "Por favor, intenta con otra fecha o cambia de ciudad",
              icon: "error",
            });
          }
          setFiltredByCityAndDates(true);
          setFiltredData(data);
          document.querySelector("#product").scrollIntoView();
        });
    }
  };
  return (
    <main>
      {isMainLoaded() ? (
        <>
          {filtredData && (
            <SearchBlock
              filtersSearchBlock={filtersSearchBlock}
              datesSelected={datesSelected}
              setDatesSelected={setDatesSelected}
              dataCities={cities}
            />
          )}
          {filtredData && (
            <Categories
              filterProducts={filterByCategory}
              dataProducts={data}
              dataCategories={categories}
            />
          )}
          {filtredData && (
            <List
              data={filtredData}
              loading={loading}
              getFavoritesLength={getFavoritesLength}
              filtredByCity={filtredByCity}
              datesSelected={datesSelected}
              filtredByDates={filtredByDates}
              filtredByCityAndDates={filtredByCityAndDates}
            />
          )}
        </>
      ) : (
        <LoaderProducts />
      )}
    </main>
  );
};

export default Main;
