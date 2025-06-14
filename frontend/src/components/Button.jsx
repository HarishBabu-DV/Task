import React from 'react'

const Button = ({children,btnType,className,...props}) => {
  return (
    <button type={btnType || 'button'} className={`${className}`}  {...props}>
        {children}
    </button>
  )
}

export default Button