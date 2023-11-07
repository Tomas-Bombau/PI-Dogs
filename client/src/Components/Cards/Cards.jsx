//assets
import detailImage from '../../assets/detail-image.png'

//Components and Functions
import Temperaments from "../Temperaments/Temperaments";
import { deleteDog } from "../../Redux/Actions/actions";

//Hooks
import {Link} from 'react-router-dom'
import { useDispatch } from "react-redux";

//CSS
import css from "./Cards.module.css";


const Cards = (props) => {
  const { id, reference_image_id, weightMin, weightMax, name, temperaments, createdInDb} =
    props;

  const dispatch = useDispatch()

  const deleteHandler = async (id) =>{
      const newId = {id: id}
      dispatch(await deleteDog(newId))
  } 
  

  return (
    <div className={css.cards}>
      <Link className={css.link} to={`/detail/${id}`}><img className={css.imagen} src={detailImage} alt="access-to-details" /></Link>
      <img src={reference_image_id} alt="" />
      <h2>{name}</h2>
      {createdInDb ? <p className={css.eliminar} alt="" onClick={() => deleteHandler(id)}> X </p> : null}
      <div className={css.weight}>
        <p>Min weight: {weightMin}</p>
        <p>Max weight: {weightMax}</p>
      </div>
      <Temperaments key={id} temperaments={temperaments} />
    </div>
  );
};

export default Cards;
