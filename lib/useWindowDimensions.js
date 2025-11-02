// Fixed version - safe for server!
import { useState, useEffect } from 'react';

function getWindowSize() {
  // On server, fake a safe size (mobile-like)
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 };
  }
  // On phone/browser, get real size
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

    // Only add listener if on browser
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize(); // Initial call
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return size;
}
