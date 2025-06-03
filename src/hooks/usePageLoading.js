import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function usePageLoading() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return loading;
}
