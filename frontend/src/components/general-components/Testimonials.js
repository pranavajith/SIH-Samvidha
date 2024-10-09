import React, { useState } from "react";
import "../../styles/Testimonials.css";
import "./../../utils/i18n";
import { useTranslation } from "react-i18next";

const Testimonials = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();

  // Move to the next testimonial
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Move to the previous testimonial
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="testimonials-container">
      <h2 className="testimonials-header">{t("testimonial")}</h2>
      <div className="testimonial-card">
        <div className="testimonial-left">
          <img
            src={testimonials[currentIndex].image}
            alt={`${testimonials[currentIndex].name}`}
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
