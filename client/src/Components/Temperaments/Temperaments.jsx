import React from "react";

const Temperaments = (props) => {
  const { temperaments } = props;
  return (
    <div>
      {temperaments.map((temperament) => (
        <p>{temperament}</p>
      ))}
    </div>
  );
};

export default Temperaments;
