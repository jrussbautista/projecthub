import { Label } from "types/Project";
import { db } from "../lib/firebase";

const LABELS_COLLECTION = "labels";

const getLabels = async (): Promise<Label[]> => {
  const labelsRef = db.collection(LABELS_COLLECTION);
  const getLabelsRef = await labelsRef.get();

  const labels = getLabelsRef.docs.map((label) => {
    return {
      title: label.data().title,
    };
  });

  return labels;
};

export const LabelService = {
  getLabels,
};
