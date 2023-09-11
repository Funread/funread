const ContentImage = ({ image, imageWidth, imageAlt }) => {
  return (

    <img
      className="img-fluid px-3 px-sm-4 mt-3 mb-4"
      style={{ width: { imageWidth } }}
      src={image}
      alt={imageAlt}
    />
  );
};

export default ContentImage;
