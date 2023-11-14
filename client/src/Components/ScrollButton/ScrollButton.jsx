//assets
import arrow from "../../assets/up.png";

import { useState, useEffect } from "react";

import css from "./ScrollButton.module.css";

const ScrollButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if(scrollPosition > 100){
        setShowButton(true)
      }
      else {
        setShowButton(false)
      }
    };

    window.addEventListener("scroll", handleScroll);

  }, []); 

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      {showButton > 0 ? (
        <img onClick={scrollToTop} className={css.goUp} src={arrow} alt="arrow-up" />
      ) : null}
    </div>
  );
};

export default ScrollButton;
