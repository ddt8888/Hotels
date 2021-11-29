import React from "react";

import './Input.css'

const Input = ({ name, type, placeholder, value, onChange, width, min, max }) => {
    return (
        <input className={`Input-container ${width}`} type={type} name={name}
            min={min} max={max} placeholder={placeholder} value={value}
            onChange={onChange} />
    )
}

export default Input

Input.defaultProps = {
    width: 'middle',
    min: 0,
    max: 0
}