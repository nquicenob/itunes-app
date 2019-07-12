import { useEffect } from 'react';

function Fallback({ setLoading }) {
  useEffect(() => {
    setLoading(true);
    return () => setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default Fallback;
