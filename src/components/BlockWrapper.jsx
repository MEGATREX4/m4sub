import React from 'react';

// This wrapper ensures the component is always rendered as a block element
export default function BlockWrapper({ children, className = '' }) {
  return (
    <div 
      className={`block ${className}`} 
      style={{ 
        display: 'block', 
        clear: 'both',
        minHeight: '1px' // Ensures the element takes up space
      }}
    >
      {children}
    </div>
  );
}