import { useEffect } from 'react';

function Fallback({ setLoading }) {
  useEffect(() => {
    setLoading(true);
    return () => setLoading(false);
  }, []);

  return null;
}

export default Fallback;
