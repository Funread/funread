const ContentImage = ({ image, width, height, imageAlt }) => {
  return (

    <img
      className="img-fluid"
      width={width}
      height={height}
      src={image}
      alt={imageAlt}
    />
  );
};

export default ContentImage;
