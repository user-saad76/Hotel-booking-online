import { useState } from "react";

export function usePost(url) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const postData = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ ADD THIS LINE
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Something went wrong");
      }

      const result = await res.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || "something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { postData, data, error, loading };
}
