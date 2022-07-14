import { Plane } from "react-loader-spinner";
import "../styles/loader.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Loader() {
  return (
    <div className="loader">
      <Plane ariaLabel="loading-indicator" color="#FBC02D" />
    </div>
  );
}
