import React, { useEffect, useState } from "react";
import "../../styles/Testimonials.css";
import "./../../utils/i18n";
import { useTranslation } from "react-i18next";

const Testimonials = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // New state to handle pause functionality
  const { t } = useTranslation();

  // Move to the next testimonial
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    setIsPaused(true); // Pause auto-play on manual button press
  };

  // Move to the previous testimonial
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setIsPaused(true); // Pause auto-play on manual button press
  };

  // // Automatically move to the next testimonial every 3 seconds if not paused
  // useEffect(() => {
  //   const autoPlay = setInterval(() => {
  //     if (!isPaused) {
  //       nextTestimonial();
  //     }
  //   }, 2000); // 3000ms = 3 seconds

  //   return () => clearInterval(autoPlay); // Cleanup interval on component unmount
  // }, [currentIndex, isPaused]); // Re-run effect when currentIndex or isPaused changes

  // // Reset pause state after a certain period of inactivity (5 seconds in this case)
  // useEffect(() => {
  //   if (isPaused) {
  //     const resetPause = setTimeout(() => {
  //       setIsPaused(false);
  //     }, 2000); // Reset pause after 5 seconds of inactivity

  //     return () => clearTimeout(resetPause); // Cleanup timeout on state change
  //   }
  // }, [isPaused]);

  return (
    <div className="testimonials-container">
      <h2 className="testimonials-header">{t("testimonial")}</h2>
      <div className="testimonial-card">
        <div className="testimonial-left">
          <img
            src={testimonials[currentIndex].image}
            alt={`${testimonials[currentIndex].name}'s image`}
            className="testimonial-image"
          />
          <div className="testimonial-info">
            <h3 className="testimonial-name">
              {testimonials[currentIndex].name}
            </h3>
            <p className="testimonial-occupation">
              {testimonials[currentIndex].occupation}
            </p>
          </div>
        </div>
        <div className="testimonial-right">
          <p className="testimonial-text">
            "{testimonials[currentIndex].Testimonial}"
          </p>
          <p className="testimonial-date">{testimonials[currentIndex].Date}</p>
        </div>
      </div>

      <div className="nav-buttons">
        <button className="button" onClick={prevTestimonial}>
          &#9664;
        </button>
        <button className="button" onClick={nextTestimonial}>
          &#9654;
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
