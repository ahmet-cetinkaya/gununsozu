import './CategoryInput.scss';

import React from 'react';

export default function CategoryInput({label, value, isChecked, onChange}) {
  return (
    <span className="categoryOption">
      <input
        type="checkbox"
        id={value}
        name={value}
        value={value}
        checked={isChecked}
        onChange={onChange}
      />
      <label htmlFor={value}>{label}</label>
    </span>
  );
}
