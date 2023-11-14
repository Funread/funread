import React from 'react'
import './CustomSelect.sass'
import { Select } from 'antd'

const CustomSelect = ({
  classNameStyle,
  options,
  name,
  value,
  onChange,
  placeholder,
  mode,
}) => {
  return (
    <Select
      showSearch
      className={`${classNameStyle}`}
      name={name}
      value={value}
      onChange={onChange}
      mode={mode}
      placeholder={placeholder}
    >
      <Select.Option disabled value={''}>
        {placeholder}
      </Select.Option>
      {options.map((option) => (
        <Select.Option key={option.key} value={option.value}>
          {option.label}
        </Select.Option>
      ))}
    </Select>
  )
}

export default CustomSelect
