import "./styles/general.css";
import Footer from "./components/Footer";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Forms/Login";
import Register from "./components/Forms/Register";
import Header from "./components/Header";
import { UserProvider } from "./context/UserContext";
import Product from "./components/Product";
import NotFoundPage from "./components/NotFoundPage";
import MainReserve from "./components/ReserveProduct/MainReserve";
import Verification from "./components/Forms/Verification";
import ReservePage from "./components/ReserveProduct/ReservePage";
import WishList from "./components/Product/WishList";
import ProductForm from "./components/Admin/ProuctForm";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [favorites, setFavorites] = useState([]);
  const getFavoritesLength = () => {
    axios
      .get(
        `http://g9apidigitalbookinganita-env.eba-acy747p9.us-west-2.elasticbeanstalk.com/users/favorites/${sessionStorage.getItem(
          "email"
        )}`
      )
      .then((res) => {
        setFavorites(res.data);
      });
  };
  useEffect(() => {
    getFavoritesLength();
  }, []);
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Header favorites={favorites} />
          <Routes>
            <Route
              path="/"
              element={<Main getFavoritesLength={getFavoritesLength} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/login/:code" element={<Verification />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products/:id" element={<Product getFavoritesLength={getFavoritesLength}/>} />
            <Route path="products/:id/reserve" element={<MainReserve />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/reservas" element={<ReservePage getFavoritesLength={getFavoritesLength} />} />
            <Route path="/favoritos" element={<WishList getFavoritesLength={getFavoritesLength}/>} />
            <Route path="/add-product" element={<ProductForm />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
