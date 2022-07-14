import { useEffect, useState } from "react";
import axios from "axios";
export default function useFetch(initialUrl) {
  const [url, setUrl] = useState(initialUrl);
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(url);
        setLoading(true);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { data, error, loading, setUrl };
}
