import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', style = {}, disabled = false }) => {
  const baseStyle = {
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    transition: 'all 0.3s ease',
    opacity: disabled ? 0.7 : 1,
    ...style
  };

  const variants = {
    primary: {
      backgroundColor: 'var(--accent-color)',
      color: '#fff',
      boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)',
    },
    secondary: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-color)',
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ ...baseStyle, ...variants[variant] }}
      onMouseOver={(e) => { if(!disabled) e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseOut={(e) => { if(!disabled) e.currentTarget.style.transform = 'translateY(0)' }}
    >
      {children}
    </button>
  );
};

export default Button;
