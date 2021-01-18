import { useState, useEffect } from "react";
import { LabelService } from "services/label-service";
import { Label } from "types/Project";
import { Status } from "types/Status";

const useLabels = () => {
  const [labels, setLabels] = useState<Label[]>([]);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const fetchLabels = async () => {
      try {
        setStatus("idle");
        const results = await LabelService.getLabels();
        setLabels(results);
        setStatus("success");
      } catch (error) {
        setStatus("error");
      }
    };
    fetchLabels();
  }, []);

  return {
    status,
    labels,
  };
};

export default useLabels;
