import React, { useEffect, useState } from "react";
import "./../../styles/Banner.css"; // Add this line to import banner-specific CSS

const Banner = ({ message }) => {
  const [visible, setVisible] = useState(true);

  // Automatically hide the banner after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  return (
    <div className={`banner ${visible ? "visible" : "hidden"}`}>{message}</div>
  );
};

export default Banner;
