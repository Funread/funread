import React from 'react'
import './CustomSelect.sass'
import { Select } from 'antd'

const CustomSelect = ({
  options,
  name,
  value,
  onChange,
  placeholder,
  mode,
}) => {
  return (
    <Select
      className={`custom-book-builder-select`}
      name={name}
      value={value}
      onChange={onChange}
      mode={mode}
    >
      <Select.Option value=''>{placeholder}</Select.Option>
      {options.map((option) => (
        <Select.Option key={option.key} value={option.value}>
          {option.label}
        </Select.Option>
      ))}
    </Select>
  )
}

export default CustomSelect
