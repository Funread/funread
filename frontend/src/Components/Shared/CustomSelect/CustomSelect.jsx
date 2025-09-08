import React from 'react';
import './CustomSelect.sass';
import { Select, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const CustomSelect = ({
  classNameStyle,
  options,
  name,
  value,
  onChange,
  placeholder,
  mode,
  useTagRender = false,
  showOptionIcon = true,
}) => {

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const option = options.find(opt => opt.value === value);
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <Tooltip title={option?.tooltip}>
        <span
          className="ant-select-selection-item"
          onMouseDown={onPreventMouseDown}
        >
          <span className="ant-select-selection-item-content">{label}</span>
          {closable && (
            <span className="ant-select-selection-item-remove" onClick={onClose}>
              x
            </span>
          )}
        </span>
      </Tooltip>
    );
  };

  return (
    <Select
      showSearch
      className={`${classNameStyle}`}
      name={name}
      value={value}
      onChange={onChange}
      mode={mode}
      placeholder={placeholder}
      tagRender={useTagRender ? tagRender : undefined}
    >
      <Select.Option disabled value={''}>
        {placeholder}
      </Select.Option>
      {options.map((option) => (
        <Select.Option key={option.key} value={option.value}>
          <div className="option-label-container">
            <span>{option.label}</span>
            {showOptionIcon && option.tooltip && (
              <Tooltip title={option.tooltip}>
                <FontAwesomeIcon icon={faInfoCircle} className="info-icon-option" />
              </Tooltip>
            )}
          </div>
        </Select.Option>
      ))}
    </Select>
  );
};

export default CustomSelect;
