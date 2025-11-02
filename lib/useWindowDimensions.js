import { useState, useEffect } from 'react';

// Safe way to get window size (works on phone AND server)
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

    // Only run in browser
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return size;
}
