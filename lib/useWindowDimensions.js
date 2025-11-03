import React, { useState, useEffect } from 'react';

function getWindowSize() {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 };
  }
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export default function useWindowDimensions() {
  const [size, setSize] = useState(getWindowSize());

  useEffect(() => {
    function handleResize() {
      setSize(getWindowSize());
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return size;
}
