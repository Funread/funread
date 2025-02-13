import PropTypes from 'prop-types';
import { Shape } from 'react-konva';

const MessageBubble = ({ shapeProps, onSelect }) => {
  return (
    <Shape
      {...shapeProps}
      sceneFunc={(context, shape) => {
        const { x, y, width, height, pointerDirection } = shapeProps;
        const pointerSize = 20; // Tamaño del triángulo de la punta
        const cornerRadius = 20; // Radio de las esquinas redondeadas

        // Dibuja el rectángulo del globo con esquinas redondeadas
        context.beginPath();
        context.moveTo(x + cornerRadius, y);
        context.lineTo(x + width - cornerRadius, y);
        context.arcTo(x + width, y, x + width, y + cornerRadius, cornerRadius);
        context.lineTo(x + width, y + height - cornerRadius);
        context.arcTo(x + width, y + height, x + width - cornerRadius, y + height, cornerRadius);
        context.lineTo(x + cornerRadius, y + height);
        context.arcTo(x, y + height, x, y + height - cornerRadius, cornerRadius);
        context.lineTo(x, y + cornerRadius);
        context.arcTo(x, y, x + cornerRadius, y, cornerRadius);
        context.closePath();
        context.fillStrokeShape(shape);

        // Dibuja la punta del globo en la dirección especificada
        context.beginPath();
        if (pointerDirection === "right") {
          context.moveTo(x + width, y + height / 2 - pointerSize / 2);
          context.lineTo(x + width + pointerSize, y + height / 2);
          context.lineTo(x + width, y + height / 2 + pointerSize / 2);
        } else if (pointerDirection === "left") {
          context.moveTo(x, y + height / 2 - pointerSize / 2);
          context.lineTo(x - pointerSize, y + height / 2);
          context.lineTo(x, y + height / 2 + pointerSize / 2);
        }
        context.closePath();
        context.fillStrokeShape(shape);
      }}
      onClick={onSelect}
      draggable
    />
  );
};

// Validación de las props
MessageBubble.propTypes = {
  shapeProps: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    pointerDirection: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default MessageBubble;