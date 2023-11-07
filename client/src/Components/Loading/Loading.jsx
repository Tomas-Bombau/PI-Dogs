//assets
import loadingImage from "../../assets/loadingImage.jpg";

//CSS
import css from "./Loading.module.css";


const Loading = () => {
  return (
    <div className={css.loadingContainer}>
      <div>
        <h2>LOADING</h2>
      </div>
      <img src={loadingImage} alt="" />
    </div>
  );
};

export default Loading;
