import React from "react";
import { Typography, makeStyles, Chip } from "@material-ui/core";
import { Label } from "types/Project";

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 20,
    marginBottom: 20,
  },
  labelContainer: {
    display: "flex",
    padding: 0,
  },
  labelItem: {
    marginRight: 10,
    cursor: "pointer",
  },
}));

interface Props {
  labels: Label[];
  onSelectLabel(value: string): void;
  selectedLabels?: string[];
}

const ProjectsLabel: React.FC<Props> = ({
  onSelectLabel,
  labels,
  selectedLabels = [],
}) => {
  const classes = useStyles();

  const isSelected = (selected: string) => {
    return selectedLabels.some((label) => label === selected);
  };

  return (
    <div className={classes.container}>
      <Typography variant="h6"> Labels </Typography>
      <ul className={classes.labelContainer}>
        {labels.map((label, index) => (
          <li
            key={index}
            className={classes.labelItem}
            onClick={() => onSelectLabel(label.title)}
          >
            <Chip
              label={label.title}
              clickable
              color={isSelected(label.title) ? "primary" : "default"}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsLabel;
