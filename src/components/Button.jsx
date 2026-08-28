/**
 * @file Button.jsx
 * @description Reusable button component with variant support.
 * All visual styling is handled via CSS classes defined in index.css
 * (`.btn`, `.btn-primary`, `.btn-outline`, `.btn-danger-outline`).
 *
 * @example
 *   <Button variant="primary" onClick={handleSave}>Save</Button>
 *   <Button variant="outline">Cancel</Button>
 *   <Button variant="danger" disabled>Delete</Button>
 */
import React from 'react';

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button label/content.
 * @param {Function}        [props.onClick]  - Click handler.
 * @param {'button'|'submit'|'reset'} [props.type='button'] - HTML button type.
 * @param {'primary'|'outline'|'danger'} [props.variant='primary'] - Visual style variant.
 * @param {string}          [props.className] - Additional CSS class names.
 * @param {boolean}         [props.disabled]  - Disabled state.
 * @param {Object}          [props.style]     - Inline styles (use sparingly).
 */
const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', disabled = false, style = {} }) => {
  const variantClass = {
    primary: 'btn-primary',
    outline: 'btn-outline',
    danger: 'btn-danger-outline',
  }[variant] || 'btn-primary';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${variantClass} ${className}`}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
