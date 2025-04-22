import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Body.scss";

// Helper function to check if element is in viewport
const useIntersectionObserver = (options = {}) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]);

  return [elementRef, isVisible];
};

// Block with image on the left, text on the right
export const BodyBlockLeft = ({ title, text, imageSrc, imageStyle, index }) => {
  const [blockRef, isVisible] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <div
      ref={blockRef}
      className={`body__block body__block--left ${
        isVisible ? "animate-fade-in" : "opacity-0"
      }`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="body__image-container">
        <img
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          className="body__image"
          style={imageStyle}
        />
      </div>
      <div className="body__content">
        <h2 className="body__title">{title}</h2>
        <p className="body__text">{text}</p>
        <button className="body__button">Learn More</button>
      </div>
    </div>
  );
};

// Block with image on the right, text on the left
export const BodyBlockRight = ({
  title,
  text,
  imageSrc,
  imageStyle,
  index,
}) => {
  const [blockRef, isVisible] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <div
      ref={blockRef}
      className={`body__block body__block--right ${
        isVisible ? "animate-fade-in" : "opacity-0"
      }`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="body__image-container">
        <img
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          className="body__image"
          style={imageStyle}
        />
      </div>
      <div className="body__content">
        <h2 className="body__title">{title}</h2>
        <p className="body__text">{text}</p>
        <button className="body__button">Learn More</button>
      </div>
    </div>
  );
};

const Body = ({ blocks }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/game");
  };

  return (
    <div className="body">
      {/* Hero Section */}
      <section className="body__hero">
        <h1 className="body__hero-title animate-fade-in delay-100">
          RISING STARS
        </h1>
        <p className="body__hero-subtitle animate-fade-in delay-200">
          In a world where music is forbidden, three unlikely heroes rise to
          bring back the rhythm and ignite a revolution.
        </p>
        <button
          className="body__hero-cta animate-fade-in delay-300"
          onClick={handleGetStarted}
        >
          Play Now
        </button>
      </section>

      {/* Content Blocks */}
      <div className="body__blocks-container">
        {blocks.map((block, index) =>
          block.imageAlignment.toLowerCase() === "left" ? (
            <BodyBlockLeft
              key={index}
              title={block.title}
              text={block.text}
              imageSrc={block.imageSrc}
              imageStyle={block.imageStyle}
              index={index}
            />
          ) : (
            <BodyBlockRight
              key={index}
              title={block.title}
              text={block.text}
              imageSrc={block.imageSrc}
              imageStyle={block.imageStyle}
              index={index}
            />
          )
        )}
      </div>

      {/* Call to Action Footer */}
      <section className="body__footer">
        <h2 className="body__footer-title">Ready to Join the Rebellion?</h2>
        <p className="body__footer-text">
          Experience the thrill of bringing music back to a world of silence.
          Play now and become part of the rhythmic revolution.
        </p>
        <button className="body__footer-cta" onClick={handleGetStarted}>
          Start Playing
        </button>
      </section>
    </div>
  );
};

export default Body;
