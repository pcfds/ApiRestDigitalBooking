import Carrousel from "./Product/Carrousel/Carrousel";
import React from "react";
import useFetch from "./useFetch/useFetch";
import ReserveCalendar from "./Product/ReserveCalendar";
import Header from "./Product/Header";
import Description from "./Product/Description";
import Ubication from "./Product/Ubication";
import { useParams } from "react-router-dom";
import "../styles/product.css";
import Features from "./Product/Features";
import Policies from "./Product/Policies";
import NotFoundPage from "./NotFoundPage";
import LoaderProducts from "./LoaderProducts";
import MapView from "./Product/MapView";
const Product = ({getFavoritesLength}) => {
  //Params from url
  const { id } = useParams();
  // CUSTOM FETCH (the function has an useEfect listening for any change in the url, so we use setUrl to call the function again with a new url)
  const { data, loading } = useFetch(
    `http://g9apidigitalbookinganita-env.eba-acy747p9.us-west-2.elasticbeanstalk.com/products/findProductByName/${id}`
  );

  return (
    <main>
      {loading ? (
        <LoaderProducts />
      ) : (
        <>
          {data ? (
            <>
              {data && <Header data={data} />}
              {data && <Ubication data={data} />}
              {data && <Carrousel data={data} getFavoritesLength={getFavoritesLength} />}
              {data && <Description data={data} />}
              {data && <Features data={data} />}
              {data && <ReserveCalendar data={data} loading={loading} />}
              {data && <MapView data={data} />}
              {data.policy != null ? <Policies data={data} /> : null}
              {data && (
                <>
                  <div className="fav-alert-product fav-alert-product-hidden">
                    <p>
                      <i className="fa-solid fa-heart-circle-check icon-fav-active"></i>
                      Agregado a tu lista de favoritos
                    </p>
                  </div>
                  <div className="fav-alert-product-delete fav-alert-product-delete-hidden">
                    <p>
                      <i className="fa-solid fa-heart-circle-xmark fav-delete"></i>
                      Eliminado de tu lista de favoritos
                    </p>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <NotFoundPage />
            </>
          )}
        </>
      )}
    </main>
  );
};
export default Product;
