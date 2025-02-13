import React from "react";
import "../styles/Body.scss";

// Block with image on the left, text on the right
export const BodyBlockLeft = ({ title, text, imageSrc }) => (
  <div className="body__block body__block--left">
    <div className="body__image-container">
      <img src={imageSrc} alt={title} className="body__image" />
    </div>
    <div className="body__content">
      <h2 className="body__title">{title}</h2>
      <p className="body__text">{text}</p>
    </div>
  </div>
);

// Block with image on the right, text on the left
// Note: Using the same source order (image then text)
export const BodyBlockRight = ({ title, text, imageSrc }) => (
  <div className="body__block body__block--right">
    <div className="body__image-container">
      <img src={imageSrc} alt={title} className="body__image" />
    </div>
    <div className="body__content">
      <h2 className="body__title">{title}</h2>
      <p className="body__text">{text}</p>
    </div>
  </div>
);

const Body = ({ blocks }) => {
  return (
    <div className="body">
      {blocks.map((block, index) =>
        block.imageAlignment.toLowerCase() === "left" ? (
          <BodyBlockLeft
            key={index}
            title={block.title}
            text={block.text}
            imageSrc={block.imageSrc}
          />
        ) : (
          <BodyBlockRight
            key={index}
            title={block.title}
            text={block.text}
            imageSrc={block.imageSrc}
          />
        )
      )}
    </div>
  );
};

export default Body;
