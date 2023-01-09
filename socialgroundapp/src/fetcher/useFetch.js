import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(url)
      .then((res) => {
        setLoading(false);
        if (res.data) {
          setData(res.data);
        }
        setError(null);
      })

      .catch((err) => {
        if (err.response) {
          // Server responded with a status other than 200 range
          // console.log(err.response.data);
          // console.log(err.response.status);
          // console.log(err.response.headers);
          setLoading(false);
          setError(err.message);

          if (err.response.status === 404) {
            // console.log('Error: Page Not Found');
          }
        } else if (err.request) {
          // Request was made but no response
          // console.error(err.request);
        } else {
          // console.error(err.message);
        }
      });
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
