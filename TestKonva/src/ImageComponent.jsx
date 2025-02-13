import { useState, useEffect } from 'react';
import { Image } from 'react-konva';
import PropTypes from 'prop-types';

const useImage = (url) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = url;
    img.onload = () => setImage(img);
  }, [url]);

  return [image];
};

const ImageComponent = ({ shape, handleSelect }) => {
  const [image] = useImage(shape.url);

  return (
    <Image
      key={shape.id}
      id={shape.id}
      image={image}
      {...shape}
      draggable
      onClick={() => handleSelect(shape.id)}
    />
  );
};

// Validación de las props
ImageComponent.propTypes = {
  shape: PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    draggable: PropTypes.bool.isRequired,   
  }).isRequired,
  handleSelect: PropTypes.func.isRequired,
};

export default ImageComponent;
