import { useState, useEffect } from "react";
import { LabelService } from "services/label-service";
import { Label } from "types/Project";

const useLabels = () => {
  const [labels, setLabels] = useState<Label[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLabels = async () => {
      try {
        setLoading(true);
        const results = await LabelService.getLabels();
        setLabels(results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLabels();
  }, []);

  return {
    error,
    loading,
    labels,
  };
};

export default useLabels;
