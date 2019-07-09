import React from 'react';
import './input.css';

function Input({ className, ...props }) {
  return <input className={`input ${className}`} {...props} />;
}

export default Input;
